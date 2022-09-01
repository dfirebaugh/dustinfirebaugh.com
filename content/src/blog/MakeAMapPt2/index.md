---
path: '/mapeditordevlog2'
date: '2021-03-06'
title: "Let's Make a Map Editor Pt. 2"
tags: ['Golang', 'Go', 'game dev', 'map editor', 'programming']
excerpt: 'A dev log of a simple 2d tile based map editor?'
---

# Recap
Checkout [the previous post](../LetsMakeAMapEditor/)

Previous commit: [0b0527d](https://github.com/dfirebaugh/bananamap/tree/0b0527dfd5b32e2a7158574ca676aa4e66a4d548)

# Performance issue
In the previous code session, I was creating grid lines on every render.  This is causing the app to run unnecessarily slow.

We can fix this by splitting the creation of the lines from the drawing of the lines.
e.g.

```golang

func initGrid() []Line {
	var lines []Line
	for n := 0.0; n <= ngridLine; n++ {
		horizontal := NewLine(canvasWidth, 1, 0, n*tileSize)
		vertical := NewLine(1, canvasHeight, n*tileSize, 0)

		lines = append(lines, *horizontal)
		lines = append(lines, *vertical)
	}
	return lines
}

func drawGrid(lines []Line) {
	for _, g := range lines {
		g.Draw(canvas)
	}
}

```

We then call the `initGrid` function up front and the `drawGrid` function on every render (i.e. in the main Draw function).

There's now a slight issue that it takes a while to load and it doesn't tell the user that it's loading/initializing.  I could process these grid lines more concurrently to mitigate this or just add a "loading..." message to communicate to the user that the app isn't broken.  I will deal this later.

# Panning issue
The function that managed user input for panning the tile map was having an issue that would make the tile map reset to origin on first mouse button press.

The fix for this was to relatively adjust the offset and to update the start position always (even if the mouse button isn't pressed).

```golang
func updateGrid() {
	mouseX, mouseY := ebiten.CursorPosition()
	if ebiten.IsMouseButtonPressed(ebiten.MouseButtonMiddle) {
		offsetX = offsetX + (float64(mouseX) - float64(startX))
		offsetY = offsetY + (float64(mouseY) - float64(startY))
	}
	startX, startY = ebiten.CursorPosition()
}
```

# Select a Tile on the Grid

## Get Mouse Position on Click

```golang
func canvasClick() {
	if ebiten.IsMouseButtonPressed(ebiten.MouseButtonLeft) {
		mouseX, mouseY := ebiten.CursorPosition()
		fmt.Println(mouseX, mouseY)
	}
}
```

## Compare it to the Offset
We need to do some math here to determine if the click happens on a tile.

```golang
func getTileIndex(mouseX, mouseY int) (int, int) {
	mapX := mouseX - int(offsetX)
	mapY := mouseY - int(offsetY)
	return mapX / tileSize, mapY / tileSize
}

func canvasClick() {
	if ebiten.IsMouseButtonPressed(ebiten.MouseButtonLeft) {
		tileX, tileY := getTileIndex(ebiten.CursorPosition())
		fmt.Println(tileX, tileY)
	}
}
```

I think that will work for now.

## Stamp Something on the Selected Tile
Let's start by stamping the clicked tile with an empty(white) image.

```golang
func getTileIndex(mouseX, mouseY int) (int, int) {
	mapX := mouseX - int(offsetX)
	mapY := mouseY - int(offsetY)
	return mapX / tileSize, mapY / tileSize
}

func canvasClick() {
	if inpututil.IsMouseButtonJustPressed(ebiten.MouseButtonLeft) {
		tileX, tileY := getTileIndex(ebiten.CursorPosition())

		coords := coordinates{
			x: tileX * tileSize,
			y: tileY * tileSize,
		}
		fmt.Println(coords.x, coords.y)

		if worldTiles[coords] != nil {
			delete(worldTiles, coords)
			return
		}

		worldTiles[coords] = ebiten.NewImage(tileSize, tileSize)
	}
}

func drawMap(canvas *ebiten.Image) {
	for coords, tile := range worldTiles {
		op := &ebiten.DrawImageOptions{}
		tile.Fill(color.White)
		op.GeoM.Translate(float64(coords.x), float64(coords.y))
		canvas.DrawImage(tile, op)
	}
}
```

`worldTiles` is a map that's indexed by coordinates. Each coordinate can contain an `Image`.

```golang
worldTiles map[coordinates]*ebiten.Image

func init() {
	...
	worldTiles = make(map[coordinates]*ebiten.Image)
}
```

## Blocking Clicks 
There's an issue now that allows you click in the area that the sprite sheet renders.
To block this, we will update our function to ignore these clicks.

```golang
mouseX, mouseY := ebiten.CursorPosition()

if mouseY > screenHeight-spriteSheetHeight {
	return
}

tileX, tileY := getTileIndex(mouseX, mouseY)
```

# Select a tile in the Sprite Sheet
Now let's see if we can click the sprite sheet to select which tile we want to paint on the canvas.


This is very similar to registering a click in the world map.  We just need to apply an offset.

```golang
func getSpriteIndex(mouseX, mouseY int) (int, int) {
	mapX := mouseX
	mapY := mouseY - (screenHeight - spriteSheetHeight)
	return mapX / (spriteSize), mapY / (spriteSize)
}

func spriteSheetClick() {
	x, y := getSpriteIndex(ebiten.CursorPosition())
	selectedSpriteCoords.x = x
	selectedSpriteCoords.y = y

	spriteCursorOp.GeoM.Reset()
	spriteCursorOp.GeoM.Translate(float64(selectedSpriteCoords.x*spriteSize), float64(selectedSpriteCoords.y*spriteSize))
}
```

# Stamp a tile from the Sprite Sheet on the Grid
Now we can update the white square that we were stamping on the tilemap to a subimage of the spritesheet.

```golang
worldTiles[coords] = ebiten.NewImageFromImage(loadedSpriteSheet.SubImage(image.Rectangle{
	image.Point{X: selectedSpriteCoords.x * spriteSize, Y: selectedSpriteCoords.y * spriteSize},
	image.Point{X: (selectedSpriteCoords.x * spriteSize) + spriteSize, Y: (selectedSpriteCoords.y * spriteSize) + spriteSize},
}))
```

Nice, we are now adding a subimage of the spritesheet to the worldmap.
However, it's too small.
We happen to know that the world map is scaled up by 2.  So, we can scale our subimage up by 2 as well.

```golang
op.GeoM.Scale(2, 2)
```

We will need to revisit this if we decide to allows sprite sheets of different sizes.


# Continuing
Sweet!

Now we can stamp subimages from the sprite sheet on the map.

## Where do we go from here?
There are several features I can think to add.

* Save map as PNG
* embed map metadata in png
* add a bool to make a tile collidable
* map layers
* undo/redo

commit [47ad357d37](https://github.com/dfirebaugh/bananamap/tree/47ad357d37138b8ac353509897ef765c2293e27e)
