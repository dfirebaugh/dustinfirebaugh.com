# Tools

## The Get Gud Game Engine
The Get Gud Game Engine (i.e. `ggge`) is a library that is intended for making it easy to make games.  However, it's not very performant.  The main method for rendering to the screen is to draw one pixel at a time.  This should be fine for the tiny games that we plan to build in this course.

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
    "github.com/dfirebaugh/ggge/pkg/input"
    "github.com/dfirebaugh/ggge/pkg/math/geom"
    "github.com/dfirebaugh/ggge"
)

type cart struct {
    input input.PlayerInput
}

var (
    game  ggge.GGGE
    rect  geom.Rect
    speed = 4.0
)

func (c cart) Update() {
    if c.input.IsDownPressed() {
        rect[1] += speed
    }
    if c.input.IsUpPressed() {
        rect[1] -= speed
    }
    if c.input.IsLeftPressed() {
        rect[0] -= speed
    }
    if c.input.IsRightPressed() {
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
    game = ggge.New()

    // run the cart (note: this is a blocking operation)
    game.Run(cart{
        input: input.Keyboard{},
    })
}
```

## Useful Packages

|name|path|description|
|----|----|-----------|
|geom| `github.com/dfirebaugh/ggge/pkg/math/geom`| draw shapes and simple collision detection |
|input| `github.com/dfirebaugh/ggge/pkg/input` | detect player input|
|component|`github.com/dfirebaugh/ggge/pkg/component`| useful structs for game components|
|sprite|`github.com/dfirebaugh/ggge/pkg/sprite`|encode and decode sprites from text|

