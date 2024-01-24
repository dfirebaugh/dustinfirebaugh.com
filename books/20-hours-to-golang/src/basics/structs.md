# Structs

A Struct is like a blueprint or template for creating our own types. We can think of structs as collections of related information. For example, if we are making a game and we want to keep track of the player's score, name, and level, we could create a struct called `Player` that has fields for each of these pieces of information.

```golang
package game

type Player struct {
    Score   uint
    Name    string
    Level   uint
}

func run() {
    p := Player{
        Score: 0,
        Name: getPlayerName(),
    }

    increaseScore(p, 10)

    println(p.Score) // output: 10
}

func increaseScore(player Player, amount uint) {
    player.Score += amount
}
```

> note that we did not assign a value to the `Level` property See [zero values](./variables.md#zero-values) for an explanation

If you try to run this code, it probably won't work.  Hopefully, your gotools will show a squiggly line and provide some error message like "this value will not be modified" or "variable player is not used".

Let's look at this code step by step and explain what's going on.

```golang
package game // declare the package

type Player struct {
    Score   uint
    Name    string
    Level   uint
} // define the type of Player

func run() {
    p := Player{
        Score: 0,
        Name: getPlayerName(),
    } // declare the variable `p` as the type of `Player` and assign values to the properties.

    increaseScore(p, 10)// call the increase score function and pass in a copy of `p` and the number `10`

    println(p.Score) // output: 0
}

func increaseScore(player Player, amount uint) { // declare increaseScore
    player.Score += amount // increase the value of `player.Score` by `amount`
}
```

Since we are passing a copy of the variable, when `increaseScore` returns, the copy (i.e.`player`) will be discarded and the struct that we passed will not be modified.

To accommodate, we can pass a reference to `p` into the `increaseScore` function.

We can use the `&` operator to denote that we will be store a reference to this value.  What we are actually storing is a memory address of that variable.  

```golang
a := 42
b := &a
```

This is called a pointer.  You could think of this as "this variable points to an address in memory", but I tend to prefer saying, "`a` stores a value, `b` stores a reference to a value".

We will need to change the signature of the function to include the `*` operator.  This denotes that the argument will be a `pointer`.

```golang
package game // declare the package

type Player struct {
    Score   uint
    Name    string
    Level   uint
} // define the type of Player

func run() {
    p := &Player{
        Score: 0,
        Name: getPlayerName(),
    } // declare the variable `p` as a reference to a `Player` and assign values to the properties.

    increaseScore(p, 10)// call the increase score function and pass in `p` and the number `10`

    println(p.Score) // output: 10
}

func increaseScore(player *Player, amount uint) { // declare increaseScore
    player.Score += amount // increase the value of `player.Score` by `amount`
}
```

Another way to write this code:
```golang
package game // declare the package

type Player struct {
    Score   uint
    Name    string
    Level   uint
} // define the type of Player

func run() {
    p := Player{
        Score: 0,
        Name: getPlayerName(),
    } // declare the variable `p` as the type of `Player` and assign values to the properties.

    increaseScore(&p, 10)// call the increase score function and pass in a reference to `p` and the number `10`

    println(p.Score) // output: 10
}

func increaseScore(player *Player, amount uint) { // declare increaseScore
    player.Score += amount // increase the value of `player.Score` by `amount`
}
```

Now the score should update correctly in the `run` function.

## Methods

We can also define methods on a struct.

To do this, we use need to use a `value receiver` or a `pointer receiver`.

The general rule of thumb is that if you need to change a property on the struct, you will need to use a `pointer receiver`.  Which also means that when you declare a variable with that function


```golang
package game

type Player struct {
    Score uint
    Name string
    Level uint
}

func (p Player) increaseScore(amount uint) {
    p.Score += amount
}

func Run() {
    p := Player{
        Name: getPlayerName(),
    }

    p.increaseScore(10)

    println(p.Score) // outputs: 0
}
```

Use a Pointer receiver to modify a property on a struct

```golang
package game

type Player struct {
    Score uint
    Name string
    Level uint
}

func (p *Player) increaseScore(amount uint) {
    p.Score += amount
}

func Run() {
    p := &Player{
        Name: getPlayerName(),
    }

    p.increaseScore(10)

    println(p.Score) // outputs: 10
}
```

However, we run into the same problem here.
