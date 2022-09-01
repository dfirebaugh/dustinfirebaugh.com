---
path: '/mapeditordevlog3'
date: '2021-03-13'
title: "Let's Make a Map Editor Pt. 3"
tags: ['Golang', 'Go', 'game dev', 'map editor', 'programming']
excerpt: 'A dev log of a simple 2d tile based map editor?'
---

# Recap
Checkout [the previous post](../MakeAMapPt2/)

Previous commit: [47ad357d37](https://github.com/dfirebaugh/bananamap/tree/47ad357d37138b8ac353509897ef765c2293e27e)

# Cleanup
We will be outputting some json to represent which subImage of the png file will exist at what index of the level.  It would be nice if we use this same data structure when rendering in the map editor tool.
However, we are currently using a `map` that is indexed by `coordinates` that stores a subImage.
i.e.
```golang
worldTiles   map[coordinates]*ebiten.Image
```
It's very convenient to store the sub-images this way because we can add, delete, replace the subImage from the level in constant time.
I don't think we can marshal this to json.  We could potentially change this to a slice and instead of indexing by `coordinates` we could translate `coordinates` to and index of where the sub-image exists on the PNG.


### Considering a multi-tile tool
It would be nice to select multiple tiles in the png to paint into the level. 
e.g. With the current implementation, if we have a house drawn in the png, we would have to select each tile and place it in one at a time.  If we have a tool that can select and apply multiple tiles, this would be a lot more convenient.

It would be easy for us to select a larger subImage of the png and place it in to the level.  However, this doesn't help us with tile data.  Assuming our resulting json will include the index of each subImage and whether or not it's collidable (and possibly other properties), it seems to make some sense to keep the smallest unit as a tile.

# Continuing
Sweet!

Now we can stamp subimages from the sprite sheet on the map.

## Where do we go from here?
There are several features I can think to add.

* Save map as PNG
* embed map metadata in png
* add a bool to make a tile collidable
* map layers
* undo/redo

commit [47ad357d37](https://github.com/dfirebaugh/bananamap/tree/47ad357d37138b8ac353509897ef765c2293e27e)
