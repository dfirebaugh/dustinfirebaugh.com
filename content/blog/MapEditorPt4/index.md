---
path: '/mapeditordevlog4'
date: '2021-07-17'
title: "Let's Make a Map Editor Pt. 4"
tags: ['Golang', 'Go', 'game dev', 'map editor', 'programming']
excerpt: 'A dev log of a simple 2d tile based map editor?'
---

# Recap
Checkout [the previous post](../MakeAMapPt3)

Previous commit: [e52241f](https://github.com/dfirebaugh/bananamap/commit/e52241f8e95a38f19f274636de3aaaf9eb12d935)

# Internal conflict
I want the code to be more modular.  There aren't many files, but I've been more regularly practicing [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) and [TDD](https://en.wikipedia.org/wiki/Test-driven_development) concepts.

This project falls lower on the priority list compared to some of my other projects, but I suspect that I will clean this up more.

To accommodate this, I started moving things around and cleaning up the code.  I won't go into detail here on what's different.

# PNG-Embed
One of the original ideas for this project was to embed the map data into the sprite atlas.  I wasn't sure how much data you could embed in a png.  It's probably worth finding the answer to that question.  However, with the [png-embed](https://github.com/sabhiram/png-embed) this became very easy.

```golang
func (l Level) ExportPNG() {
	b, err := json.Marshal(l)
	if err != nil {
		fmt.Println(err)
		return
	}
	bs, _ := ioutil.ReadFile("sample.png")

	str := base64.StdEncoding.EncodeToString(b)

	// Encode the key "FOO" with the value "BAR" (string).
	data, _ := pngembed.Embed(bs, "FOO", str)
	ioutil.WriteFile("sample.png", data, 0755)
}
```

```golang
func extractPNG() {
	bs, _ := ioutil.ReadFile("sample.png")
	fileBytes, err := pngembed.Extract(bs)
	if err != nil {
		println(err.Error())
		return
	}

	data, err := base64.StdEncoding.DecodeString(string(fileBytes["FOO"]))
	if err != nil {
		fmt.Println("error:", err)
		return
	}
	fmt.Printf("%q\n", data)
}
```

It still needs some guards to prevent attempting loading a file that doesn't exist (and probably other things).

# What's next?
* add a way to make a tile collidable
* map layers
* undo/redo
* cleanup
* add more ease-of-use/ux

commit [24ce6dc9](https://github.com/dfirebaugh/bananamap/commit/24ce6dc9c17fc0cf650cb981afe12ade5927aa6e)
