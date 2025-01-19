# Punch
[punch](https://github.com/dfirebaugh/punch) 🥊 is a hobby programming language that I've been chipping away at for a few months.
I also built a [web playground](https://dfirebaugh.github.io/punch/) that gives a pretty good view of what's going on with the tokenizer and parser.

I started working on punch without much of a plan.  I wrote some fake code in a syntax that might feel good.  In hindsight, it might have been a better idea to use an existing syntax.  What I ended up with (it's still evolving) is a syntax that's a weird mix between C, go, zig, rust.  I say that I probably should have just used an existing syntax because the syntax is not exactly the point of what I'm trying to do here.  Fundamentally, this is just an excercise to learn.

I evaluated using tools like [bison](https://www.gnu.org/software/bison/) (a parser generator) or using something like [BNF or EBNF](https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form) to describe the syntax of the language and generate a parser off of that. Ultimately, I decided that if I was going to use a parser generator, then I might as well not work on this project. 

The language is written in [golang](https://go.dev/) mainly because this is the language I'm most familiar with and prefer to use, but also go seems to be a pretty reasonable language to write parsers in.

I did cheat a bit and use golang's standard lib [text/scanner](https://pkg.go.dev/text/scanner) for scanning in text.  The lexer and parser are written from scratch though.

This project has been fairly difficult to work on mainly because I wasn't exactly sure how to approach it.  
Initially I tried to implement one thing at a time on each layer.  For example, I would implement variable assignments in the parser which would generate some part of on the AST and then generate some [WAT](https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format) code (I was initially trying to explicitly target wasm).
It might have been a better approach to have a more defined AST before trying to implement the parser.

Most of my time so far has been spent on the parser.  There seems to be a fair amount of theory around writing parsers (e.g. recursive decent, LL, LR, operator precedence... ).  I did get wrapped up in researching those for a while, but at some point, I was watching a stream of [Jonathan Blow](https://en.wikipedia.org/wiki/Jonathan_Blow) while he was working on his [jai programming language](https://github.com/BSVino/JaiPrimer/blob/master/JaiPrimer.md).  He made a comment about parser theory... it was something along the lines of "just write it like you would write a regular program".  My programming philosophies don't always align with the things he says (turns out that's not a requirement to hearing other people's opinion), but the statement "just write it like you would write a regular program" is kind of inspiring. 

## The current state of punch
I've pumped the brakes on generating wasm for the time being.  I wrote a simple code generator that will spit out javascript - just so I can easily produce runnable code.
I would like to work on some kind of backend for punch.  At the moment, I'm kind of viewing that as a project for another day.
If I do dive down the backend rabbit hole that I probably won't use LLVM (in the spirit of learning).

