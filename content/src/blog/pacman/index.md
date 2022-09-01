# What makes games fun?

![pacman_pills](https://wallpapercave.com/wp/VEWGjcP.jpg)

## How do you make a game fun?

Before reading this, it might be worthwhile to pretend that you are the game design lead on the project (i.e. [Pacman](https://en.wikipedia.org/wiki/Pac-Man)) and you're primary task is to make this game fun.

How would you implement the AI?
(let's not even think about how you would code it...)
Perhaps a better way to phrase it, what behaviors would you give each ghost? How do these decisions affect how fun the game is?
Can you optimize for fun?

I think it's difficult enough to just think about how to make the game
playable. Making the game fun is an entirely different thought process.

Turns out, these ghosts behave in a very intentional way. Maybe we can shed some light on their behavior and take a swing at the answer to the question, "How do you make a game fun?"

## Ghosts

The ghosts have 2 states in the game.

When the player eats a pill (I guess that's what we call it), the ghosts flee.

When not in this fleeing state, the player is free to chomp along eating the tasty dots on the screen. In this state the ghosts are in pursuit mode. In pursuit mode each ghost has its own unique behavior.

At the beginning of the game, the ghosts go to their respective corners. I assume this gives the player a bit of time to get their bearings. It's possibly an illusion of safety.

![ghosts](https://upload.wikimedia.org/wikipedia/en/5/51/Pacman_title_na.png)

### SHADOW -- "BLINKY"

RED

BLINKY is the chaser. BLINKY simply chases Pacman.

### SPEEDY -- "PINKY"

PINK

PINKY is the ambusher. PINKY aims for the position in front (or a few positions ahead) of Pacman's mouth.

### BASHFUL -- "INKY"

BLUE

INKY is the fickle ghost. INKY is supposed to get near the player, but keep its distance. However, INKY sometimes adopts the behavior of the other ghosts.

### POKEY -- "CLYDE"

ORANGE

CLYDE is supposed to be random. However, CLYDE seems to behave like the red ghost when it is some distance away from the player. When it gets too close to the player CLYDE moves toward the lower left corner.

One interesting note here is that the red ghost is following/chasing the player. So the red ghost will almost always be behind the player. However the pink ghost aims ahead of the player. Effectively performing a pincer move to trap the player.

This ends up looking like a strange dance.

![pacman-gif](https://media.giphy.com/media/d9QiBcfzg64Io/giphy.gif)

## So, What makes a game fun?

In pacman, you aren't really given many instructions. The game just kind of starts and the pacman starts moving... chomp chomp chomp...
The player quickly works out that the goal is to clear the board. Well, the goal is to gain as many points as possible. You just happen to gain points by eating the little Pac-dots. How does the player know that the ghosts are enemies. It might take an unfortunate loss of life to learn that. Or, the player might realize just by the fact that the ghosts are chasing the player. Another interesting question -- how does the player know that they can eat the ghosts when they consume a pill? Well, I think it has to do with the drastic behavior change. After eating the pill, the ghosts turn blue and start fleeing from the player. Perhaps it has something to do with that weird looking frowny face the ghosts make when you eat that pill. Maybe they just look edible. Maybe it's that Pacman only has one mode, to eat (ah, solidarity!). What is the player to do other than chase the ghosts. Oh, that gives you points too! The player begins strategizing by tracking the ghosts movements while planning their own routes to collect as many Pac-dots as possible...

So, what makes the game fun?

On first play some of the fun comes from discovering how the game works, but the player soon becomes an expert at the game. Unless there's a factor of randomness. We don't see much randomness in Pacman (aside from some random behaviors of the ghosts). Pacman typically just increases in difficulty as the game progresses.

Difficulty by itself does not make a game fun.

Too difficult, it's not fun.

Too easy, it's not fun.

Even at the goldy-locks level of difficulty, it doesn't guarantee that the game will be fun. There's a balance between many variables that might add up to "how much fun" a game is.

Some of those variables:

- [progression](http://game-wisdom.com/critical/progression-gameplay)
- [symmetry](https://en.wikipedia.org/wiki/Symmetric_game)
- [strategy](https://www.gamasutra.com/blogs/FabianFischer/20141201/231243/Criteria_for_Strategy_Game_Design.php)
- [randomness](https://www.gamecareerguide.com/features/1470/design_101_the_role_of_randomness.php)

There's also a bit of an external factor with pacman. In the day, arcade games were also a spectator sport. I don't think it's common that your first time playing pacman was the first time you've seen the game. You probably already knew how the game worked by watching others play and thinking in your head "I could do that". ... and there reveals another factor of fun, competition.

The truth is, it's hard to know how to make a game fun and finding the right balance is part of the art. That's why [playtesting](https://schoolofgamedesign.com/project/play-test-game-design/) is so important.
