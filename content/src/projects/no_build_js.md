# No Build Frontends
I built a small js lib that wraps the [built in web components api](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements).  It's available via cdn and will likely not change much.
[https://github.com/dfirebaugh/bop](https://github.com/dfirebaugh/bop)

## Why?
I've found that there is a significant cost to having a build step in js. `npm` packages get outdated and sometime have breaking changes.  Using the builtin custom html elements are widely supported by browsers now.  Which inherently means that custom html elements will have longevity on the web.

I was building out [hackmap](https://github.com/hackrva/hackmap) using custom html elements, but I found that using the shadow dom added some confusion and ergonomically, I'd rather just write functions instead of classes.

I don't expect this to be widely adopted, but this is a great tool for quickly slapping together frontends for my personal projects.

## Problems

#### Third party libraries

Not using npm means that you have less access to third party libraries.
[Casey Muratori](https://caseymuratori.com/about) had an interesting take about why people use 3rd party libraries.  It was something along the lines of "People reach for libraries when they don't know how to do something..." (hopefully that's not too much of a misquote -- going off of memory).
For my purposes, `bop` and a css framework like bulma is enough to get a pretty decent frontend.  If I needed something with a fair amount of complexity, like a sortable and filterable spreadsheet (i.e. something that doesn't sound like fun to build from scratch), there are still some vanillajs web components available (e.g. [Shoelace](https://shoelace.style/) or [Adobe's Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/))

#### Passing data around
A lot of the frontend frameworks have some kind of management for passing data around your web app. `bop` doesn't have anything advanced for this problem.  Most of the frontends I'm using this for are very simple.  You can use attributes to pass data down or events to throw things across the fence.

I like the idea of building components that only worry about their internal state and then using something like [htmx](https://htmx.org) for application state  - [Hypermedia as the engine of application state (HATEOAS)](https://en.wikipedia.org/wiki/HATEOAS).

## Examples
* [bop examples](https://dfirebaugh.github.io/bop/)
* [punch playground](https://dfirebaugh.github.io/punch/) - punch is a hobby programming language - the playground is a way to explore the AST in a browser
