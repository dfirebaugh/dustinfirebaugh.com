# Let's Make a Map Editor

repo: https://github.com/dfirebaugh/bananamap

# Motivation
I recently participated in a small game jam with a few friends.  This was not an official game jam, but a self imposed game jam.  We decided, "Hey, let's try to make a game in one weekend."

We ended up making a proof of concept for a game we call "Chuck it! Now in VR".  It's what it sounds like.  You basically just throw things.

It was enough fun that we decided to try to do this annualy.  We shall call it "jelly jam".

![jelly jam](https://media.giphy.com/media/xUPGcHeIeZMmTcDQJy/giphy.gif)

Since this was a new platform for us, we spent a significant amount of time on learning.  It seems that if the majority of that time was spent creating, we might have made more progress.

So, I'm inclined to make an easy to use 2d tile based map editor and hopefully we can make good use of it at the next jelly jam.

# Spec/Requirements

* The Map Editor should import a sprite sheet as PNG
* A grid based system
* Layers
* Toggle whether or not a tile is collidable
* Maps will be stored in the PNG file as metadata

We will have a static spritesheet (probably something drawn in an external tool).  The map editor will allow us to select a tile from that sprite sheet and stamp it into the map.  This will allow us to easily create levels based on tiles from a spritesheet and have optimal reuse of these tiles (i.e. it should be relatively  memory efficient).

# So it begins

I will be developing this project in Golang.

I plan on using the [ebiten game engine](https://github.com/hajimehoshi/ebiten) because it should already have a few things that we need.
e.g.

* input mapping
* rendering
* it builds cross platform

## First things first
Let's spin up a new project with the ebiten game engine.

```go
package main

import (
	"fmt"
	_ "image/png"
	"log"

	"github.com/hajimehoshi/ebiten/v2"
	"github.com/hajimehoshi/ebiten/v2/ebitenutil"
)

const (
	screenWidth  = 640
	screenHeight = 480
)

type Game struct {
}

func (g *Game) Update() error {
	return nil
}

func (g *Game) Draw(screen *ebiten.Image) {
	// When the "left mouse button" is pressed...
	if ebiten.IsMouseButtonPressed(ebiten.MouseButtonLeft) {
		ebitenutil.DebugPrint(screen, "You're pressing the 'LEFT' mouse button.")
	}
	// When the "right mouse button" is pressed...
	if ebiten.IsMouseButtonPressed(ebiten.MouseButtonRight) {
		ebitenutil.DebugPrint(screen, "\nYou're pressing the 'RIGHT' mouse button.")
	}
	// When the "middle mouse button" is pressed...
	if ebiten.IsMouseButtonPressed(ebiten.MouseButtonMiddle) {
		ebitenutil.DebugPrint(screen, "\n\nYou're pressing the 'MIDDLE' mouse button.")
	}

	// Get the x, y position of the cursor from the CursorPosition() function
	x, y := ebiten.CursorPosition()

	// Display the information with "X: xx, Y: xx" format
	ebitenutil.DebugPrint(screen, fmt.Sprintf("X: %d, Y: %d", x, y))
}

func (g *Game) Layout(outsideWidth, outsideHeight int) (int, int) {
	return screenWidth, screenHeight
}

func main() {
	ebiten.SetWindowSize(screenWidth, screenHeight)
	ebiten.SetWindowTitle("Particles (Ebiten demo)")
	if err := ebiten.RunGame(&Game{}); err != nil {
		log.Fatal(err)
	}
}

```

This is a basic setup for ebiten that tracks mouse movement and clicks.
We can use this for draggin tiles from the sprite sheet.

Run the app with the following command.

```bash
go run .
```
## Draw a new image to the screen

Define this new image.
```go
var (
	canvas *ebiten.Image
)

func init() {
	canvas = ebiten.NewImage(640, 416)
}
```

At the bottom of the Draw function add the following code:
```go
canvas.Fill(color.NRGBA{0x00, 0x40, 0x80, 0xff})
screen.DrawImage(canvas, &ebiten.DrawImageOptions{})
```

Now when you run `go run .` you should see a blue rectangle at the top left of the screen.

## Load in the sprite sheet
We need to load in our sprite sheet.

The ebiten game engine should be able to handle this fairly easily.


## Create a canvas
Well, it's easy enough to make a canvas.  It's just an image in ebiten game engine.  We can render subimages on this images.  In fact, the main screen is considered an `Image` as well.  This will do for our needs.

Create the canvas `Image` with the `NewImage` constructor.
```go 
canvas = ebiten.NewImage(screenWidth, canvasHeight)
```

Then we will fill the image with a color and execute the `DrawImage` function.
> Note: This should run in the main Draw function

```go
img.Fill(color.NRGBA{0x40, 0x40, 0x80, 0xff})
canvas.DrawImage(img, &ebiten.DrawImageOptions{})
```

## Create Grid Lines
Ebiten game engine doesn't have a line primitive. So, we will need to cheat a bit.

Let's create lines by using their `Image` primitive.

```go 
type Line struct {
	img  *ebiten.Image
	geoM *ebiten.GeoM
}

func NewLine(width, height int, x, y float64) *Line {
	img := ebiten.NewImage(width, height)
	img.Fill(colornames.Black)
	geoM := &ebiten.GeoM{}
	geoM.Translate(x, y)
	return &Line{img: img, geoM: geoM}
}

func (l *Line) Draw(targetImage *ebiten.Image) {
	targetImage.DrawImage(l.img, &ebiten.DrawImageOptions{GeoM: *l.geoM})
}
```

From this, we should be able to construct lines as needed.

Let's draw some lines.

```go
func drawGrid() {
	for n := 0.0; n <= tileRowCount; n++ {
		horizontal := NewLine(screenWidth, 1, 0, n*tileSize)
		horizontal.Draw(canvas)

		vertical := NewLine(1, canvasHeight, n*tileSize, 0)
		vertical.Draw(canvas)
	}
}
```

The `drawGrid` function will need to be executed in the main `Draw` function.


# Continuing
Well, that's it for this session.

I hope to release some more updates soon!

Take it easy!


### Some upcoming todos:
* Allow the tiles on the grid to be selectable
* Allow for a tile to be selected from the sprite sheet
* Select the subImage that this tile represents
* Split the sprite sheet into tiles

repo: https://github.com/dfirebaugh/bananamap
