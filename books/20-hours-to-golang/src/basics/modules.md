# Modules
Modules are used to manage dependencies in a project. A module is essentially a collection of related Go packages that are versioned together. It allows you to import external code into your project and use it without worrying about conflicts with other dependencies or versions. You can create your own module by initializing a `go.mod` file and specifying the module name and its dependencies. Once your module has been published, other projects can import it and use its packages as needed.

## Creating a Go module
`go mod init <module name>`

The module name should follow the pattern of `github.com/<username>/<project-name>` (assuming it's hosted on github).

## Project Structure
Go doesn't enforce a project structure, but there is a suggested project structure for golang. 

Take some time to review the project-layout repo: [https://github.com/golang-standards/project-layout](https://github.com/golang-standards/project-layout)

