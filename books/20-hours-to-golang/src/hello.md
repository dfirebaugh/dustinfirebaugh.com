# Hello World
1. create a file called `hello.go`
2. add the code from below
3. run the code with `go run hello.go`

```golang
// hello.go
package main

func main() {
    println("Hello, World!")
}
```

This may be the most simple golang program.
You could also compile the program to an executable binary.

To do that you would run `go build hello.go -o hello`
(note: on windows you would add the .exe extension)