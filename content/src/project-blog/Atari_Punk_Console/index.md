# Atari Punk Console

> Atari Punk console is an astable square wave oscillator driving a monostable oscillator that creates a single (square) pulse. -- [Wikipedia](https://en.wikipedia.org/wiki/Atari_Punk_Console)

<iframe title="vimeo-player" src="https://player.vimeo.com/video/88420134" width="640" height="360" frameborder="0" allowfullscreen></iframe>

Ah man this thing is sick!

I present the 555 timer ![image of 555 timer](https://upload.wikimedia.org/wikipedia/commons/2/21/Signetics_NE555N.JPG)
A 555 timer basically provides a clocking signal. ![clocking_signal](http://www.designcabana.com/knowledge/electrical/electronics/digital/clock/clock.gif)

Over time, the signal flips on and off. We can adjust how frequently this happens.

The [Atari Punk Console](https://en.wikipedia.org/wiki/Atari_Punk_Console) takes advantage of 2 555 timers. In my case, I'm using a 556 timer. Which basically two 555 timers in one IC (integrated circuit).

The first timer oscilates a square wave and its output is divided by the second timer. One knob controls the frequency of the oscillator and the other controls the pulse width.

Here's a good [instructable](https://www.instructables.com/id/Build-an-Atari-Punk-circuit-on-a-breadboard/) to follow if you want to build your own!

A lot people use altoid tins as cases. I gutted an old netgear switch for mine.
