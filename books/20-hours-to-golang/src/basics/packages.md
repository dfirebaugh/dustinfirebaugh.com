# Packages
Don't focus on this too much at the moment.  This is intended as a high level explanation.  It will become more clear as we build more things.

## What is a package?
A `package` in Go allows you to have separate namespaces.

Packages are separated by directories.  If a file is in the same directory as another file, you will have access to things within that file without having to call it's namespace.

## Importing a package
Importing packages in Go can be done by using the `import` keyword followed by the name of the package you want to import. For example, if you wanted to import the "fmt" package, you would write `import "fmt"` at the beginning of your code.

Once you have imported a package, you can use the functions and variables defined in that package within your code. To call a function from an imported package, you will need to prefix the function with the name of the package. For example, if you wanted to call the `Println` function from the "fmt" package, you would write `fmt.Println("Hello, world!")`.

## The `main` Package
Go has a convention that the entry point of your application should be called main.

e.g.:

```golang
package main
...
```

The `main` package has special significance.  Mainly, that the `main` package should contain a `main` function. i.e. a function with the name of `main`.

```golang
package main

func main() {

}
```

If I run this package, the `main` function will execute.

There's another special function called `init`.
If you declare a function named `init`, it will execute when the package loads (before the `main` function).  The `init` function is entirely optional.

```golang
package main

func init() {
    println("runs when the package loads and before main runs")
}

func main() {
    println("runs when the package loads, but after init")
}
```

> Note that most packages don't have a `main` function.  The main package should be kept small.  Typically, you will be importing a different package and calling that code from within your `main` function.

## Private Functions
Go has a strange way of making functions private.
If the function's name is lower case, it is a private function.

Private functions can't be called by external packages.

Another way to say this:
To export a function, you must give the function a name with the first letter capitalized.

This rule applies to anything that a package can define such as functions, variables, constants, structs, etc...

```golang
package demo

func privateFunction() {

}

func PublicFunction() {

}
```
