# Variables
In programming, a variable is a way to store information that can be used later. Think of it like a container where you can put stuff in and take stuff out.

When we write programs in Go, we use variables to store different types of data such as numbers, text, or true/false values.

Here's an example of how we can use variables to store and use numbers in a program:

## Declare a variable

```golang
package main

import "fmt"

func main() {
    // Declare variables to hold numbers
    var x int = 5
    var y int = 10

    // Add the variables together and print the result
    var sum int = x + y
    fmt.Println(sum) // Outputs: 15
}
```

In this code, we declare two variables `x` and `y` to hold the values `5` and `10` respectively. We then add these variables together and store the result in a new variable called `sum`. Finally, we print out the value of the `sum` variable which is `15`.

Variables in Go are declared using the `var` keyword followed by the name of the variable and the type of data it will hold. In the example above, we declared `x`, `y`, and `sum` to be of type `int` which means they can hold whole numbers.

You can also declare variables without giving them a specific value, like this:

```golang
var z int
```

This creates a variable named `z` that has no value yet. You can assign a value to it later using the `=` operator:

```golang
z = 20
```

Or you can declare and assign a value to a variable at the same time:

```golang
var z int = 20
```

In Go, you can also use shorthand notation to declare and assign a value to a variable:

```golang
z := 20
```

This is equivalent to writing `var z int = 20`.

Overall, variables are an essential concept in programming and are used in many different ways. They allow us to store and manipulate data, which is what programs are all about!

## Zero Values
If you don't assign a value to a variable (or a property on a struct), it will be the zero value for that type.

e.g.
```golang
var num int

println(num) // outputs: 0
```


## Key Terms
| Term | Explanation |
|-------------|--------------------------------------------------------------------------------------------|
| Declaration | Creating a new variable with a specific name and data type. |
| Assignment | Giving a value to a declared variable. |
| Scope | The area of a program where a variable can be accessed. |
| Data Type | A classification of the type of data that a variable can hold, such as int, string, etc.|
| Constant | A variable whose value cannot be changed after it is assigned. |
| Identifier | The name given to a declared variable. |
| Pointer | An address that points to the memory location of a value. |
| Value | The data held by a variable. |
| Type Inference | The feature in Go that allows the compiler to determine the data type of a variable based on its initial value.|