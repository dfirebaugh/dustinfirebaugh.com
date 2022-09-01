---
path: '/Text_Editors'
date: '2020-01-20'
title: 'Text Editors'
tags: ['Text Editors', 'programming']
excerpt: 'What text editor should you use?'
---

## What text editor should you use?

![monkey-on-keyboard](https://media.giphy.com/media/f5BwvEFBcgzU4/giphy.gif)

That a question that has the potential to start a holy war amongst techies.

Ultimately, this choice comes down to preference, but if you are just getting started as a developer/techie and you're shopping around for a daily driver text editor, I'll break down some options.

You could certainly use these editors for other tasks, but I'm looking at them with the intention of banging on keyboards to create code.

Note: this is just a high level view of some text editors. To avoid a holy war, I will not state if emacs is better than vim, but you might have fun playing a game a friend of mine made [world war vi](http://wordwarvi.sourceforge.net/). It won't teach you how to use these editors, but it is a fun little old school style shoot-em-up!

### vim

Out in the wild i've found myself on strange systems or perhaps mounted into a stripped down docker container (note: it's not on the most stripped down of docker images). Vim happens to be fairly ubiquitous. If not vim, you might could find vi (vim = vi improved -- i.e. "Visual Editor Improved.)

#### What's so great about vim?

`vim` is very feature rich! If you're looking for a powerful tool and are willing to learn a few keyboard shortcuts, `vim` has a lot to offer you.

Some claim that it has a steep learning curve.

#### What's so hard about vim?

I don't really think `vim` is all that hard. The biggest thing I see beginners struggle with is that `vim` modal. What I mean is that `vim` has modes.
e.g. You can't start typing as soon as you open a file. You have to go into "insert" mode by pressing `i`. Then you can start typing.

Here's a cool web game that can help you internalize the keyboard shortcuts [vim-adventures](https://vim-adventures.com/)

Ultimately, it's definitely worth learning your way around the basics of `vim`.

If you are just starting out, you might could justify that it's more worthwhile to spend you energy learning other technologies whilst throwing `vim` on the backlog of things to learn. However, I will double down on the "it's a good idea to learn some basics in `vim`"

Imagine yourself ssh'ed(remotely connected to another machine/server via a terminal) into some server somewhere and you have to edit a config file on the fly. `Vim` to the rescue!

## emacs

`Emacs` is amazing. I will admit that I'm not as well versed in `emacs`, but I have seen its glory. The joke is that `emacs` is a text editor with ambitions of being an operating system. You can do a lot of your daily computing all inside of `emacs`. Like `vim`, `emacs` has tons of handy keyboard shortcuts which usually take advantage of a combination of keys.

Graphical `emacs` is garbage. Go for the command line `emacs` or choose to use [spacemacs](https://www.spacemacs.org/). Perhaps, the graphical `emacs` is not garbage, but I did not have the patience to give it the time of day. Graphical `vim` is garbage too though. Maybe it's not garbage, but it's uglier than I want it to be.

If you've made the decision that you will learn a command line based text editor in hopes of taking advantage of all those tasty features, don't disqualify `emacs`. Especially if you are doing [Functional Programming](https://en.wikipedia.org/wiki/Functional_programming). `emacs` has a built in scripting language (emacs lisp) that can be used to extend the functionality of `emacs`.

Btw, you can emulate vi/vim with `emacs` if you enable "evil mode".

I will say that most of the people who trash talk `emacs` have never really given it the good college try.

## nano

From a design perspective, `nano` tries to be discoverable and perhaps similar to other editors you might be familiar with. What I mean is, it doesn't take much to get up and running with `nano`. I've noticed many avoid learning `vim` in favor of `nano` because of this familiarity. This is mostly ok, but it's worth mentioning that `nano` is not as ubiquitous as `vim`.

I will say that I don't think I know of anyone who uses `nano` as their daily driver. i.e. something they write code in all day
It just isn't as feature rich as `vim` or `emacs`

## vscode

Vscode seems to be what almost everyone is using these days. Especially people in the webdev realm. It's one of the most contributed to projects on github.

If I understand correctly, it's built as an electron app. Which is basically the chrome engine running as a standalone app.

Vscode is my daily driver. I like the extensions that are available and there are plenty of features that make my day to day tasks as a developer easier.

There are other editors in the same weight class as vscode. Most notably:
[atom](https://atom.io/) by github. I'm not sure what's happening with this since [Microsoft bought Github](https://blogs.microsoft.com/blog/2018/10/26/microsoft-completes-github-acquisition/) (and Microsoft makes vscode), but last I heard it was still being developed.
[sublime text](https://www.sublimetext.com/)

## Notepad++

I believe Notepad++ is windows only. As a techie, I've had to use windows at several gigs. Notepad++ has been around a long time and it has many great features. One of my favorites is that if you close it, it won't discard what you were working on... even if you don't save it. The next time you open it up you can decide to save it if you want or just haphazardly close it again.

I also use Notepad++ to [base64](https://en.wikipedia.org/wiki/Base64) encode/decode things quickly if I'm not on a linux box.

## So which should you use?

That's a very personal decision and it kind of depends on what you plan to do. Ultimately, you should just try some and have fun.

Build your own opinions, but avoid the holy wars!
