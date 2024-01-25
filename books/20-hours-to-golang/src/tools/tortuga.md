# Tools

## Tortuga
Tortuga is a library that is intended for making it easy to make games.  However, it's not very performant.  The main method for rendering to the screen is to draw one pixel at a time.  This should be fine for the tiny games that we plan to build in this course.

You will need to implement the `Cart` interface.  `Cart` is intended to represent a game cartridge (like from back in the day).

```golang
type Cart interface {
    Update()
    Render()
}
```

### Example

```golang
package main

import (
	"github.com/dfirebaugh/tortuga"
	"github.com/dfirebaugh/tortuga/pkg/math/geom"
)

type cart struct{}

var (
	game  tortuga.Console
	rect  geom.Rect
	speed = 4.0
)

func (c cart) Update() {
	if game.IsDownPressed() {
		rect[1] += speed
	}
	if game.IsUpPressed() {
		rect[1] -= speed
	}
	if game.IsLeftPressed() {
		rect[0] -= speed
	}
	if game.IsRightPressed() {
		rect[0] += speed
	}
}

func (c cart) Render() {
	game.Clear()

	// render a rectangle on the given display as a certain color
	// draw calls need to happen in the render loop
	rect.Draw(game.GetDisplay(), game.Color(2))
}

func main() {
	// create a rectangle when the app starts (so we don't create on every render loop)
	rect = geom.MakeRect(20, 20, 20, 20)

	// instantiate the game console
	game = tortuga.New()

	// run the cart (note: this is a blocking operation)
	game.Run(cart{})
}
```

## Useful Packages

|name|path|description|
|----|----|-----------|
|geom| `github.com/dfirebaugh/tortuga/pkg/math/geom`| draw shapes and simple collision detection |
|component|`github.com/dfirebaugh/tortuga/pkg/component`| useful structs for game components|
|sprite|`github.com/dfirebaugh/tortuga/pkg/sprite`|encode and decode sprites from text|

