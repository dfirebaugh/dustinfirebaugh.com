# Turtle
Turtle is a fake game console.

![prey](./assets/prey.gif)

## High Level goal
The high level goal is to make it easy to make games.

## Secondary Goals
* allow for games to be portable. 
    * you should be able to compile down to a binary
* provides quick feedback
    * can develop in browser to see immediate results\
* make it easy to share games
* be a good tool for gamejams

* [code](https://github.com/dfirebaugh/turtle)

## Scripting
Game Carts are built with lua (turtle has a lua interpreter embedded in the engine).

There are also several built in functions provided.

## Sprite Editor
I created a simple sprite editor (inspired by [spritely](https://github.com/dfirebaugh/spritely-editor)).  To access the sprite editor, press Tab while the web emulator is running.

Sprites will be encoded to a hex string that is stored in the lua script as a comment.

You can then render that sprite by calling the `SPR` function.
e.g.

```lua
function RENDER()
    CLR()
    RECT(0, 0, SCREENW(), SCREENH(), 12)
    SPR(0, 64, 80)
    SPR(1, 73, 80)
    SPR(2, 82, 80)
    SPR(3, 91, 80)
end

--startSprites
--cddccddcddddddddddddd7ddddddddddddddddddcddddddcccddddcccccddccc
--c88cc88c88888888888887888888888888888888c888888ccc8888ccccc88ccc
--c22cc22c22222222222227222222222222222222c222222ccc2222ccccc22ccc
--ceecceeceeeeeeeeeeeee7eeeeeeeeeeeeeeeeeeceeeeeeccceeeeccccceeccc
--ceecceeceeeeeeeeeeeee7eeeeeeeeee8888e888ceeeeeeccceeeeccccceeccc
--endSprites

```

### demos
* [simple](https://dfirebaugh.github.io/turtle/)
* [font](https://dfirebaugh.github.io/turtle/?cart=https://raw.githubusercontent.com/dfirebaugh/turtle/main/examples/font.lua)
* [raycast](https://dfirebaugh.github.io/turtle/?cart=https://raw.githubusercontent.com/dfirebaugh/turtle/main/examples/raycast.lua)
* [rect](https://dfirebaugh.github.io/turtle/?cart=https://raw.githubusercontent.com/dfirebaugh/turtle/main/examples/rect.lua)
* [stress](https://dfirebaugh.github.io/turtle/?cart=https://raw.githubusercontent.com/dfirebaugh/turtle/main/examples/stress.lua)


#### Future Plans
There are several things I can think to do to improve Turtle.  However, I'd like to step back from it.

I'm currently exploring ways to use [WASI](https://wasi.dev/) as a host for an interpreter.

I'd like to build out some tools to help make audio.

I'd like to build this to a smaller binary.  It would be interesting to be able to build out a game in some kind of simple game cart and then deploy it to firmware on a micro-controller.  For something like this, I would likely need to change out the tech stack.  Go can build to web assembly, but the filesize ends up being fairly large (around 6MB for something simple).  I will likely have to use something like [tinygo](https://tinygo.org/) (which is basically go with an LLVM backend) or switch to a different language.

The dream is to be able to compile to a native binary, a static website, or an custom built (cheap) game console.
> based on my current research, it seems reasonable to build a nice game console that would run these games for less than $20

With all that said, I'll likely stop working on the current implementation of Turtle while I research how to meet these goals.  
