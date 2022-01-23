# XRP Ocean Drop, the Tsunami is comming 🌊

[<img src="img/kanagawa.jpg" alt="Kanagawa">](https://ocean-drop.github.io/ocean-drop/)

---

## Table of contents

1. [What is XRP Ocean Drop ?](#what-is-xrp-ocean-drop)
1. [How does the game work ?](#how-does-the-game-work)
   1. [The Ocean](#the-ocean)
   1. [The Tsunami](#the-tsunami)
   1. [The Waves](#the-waves)
   1. [The Boat](#the-boat)
1. [Why should I participate ?](#why-should-i-participate)
1. [When will the game end ?](#when-will-the-game-end)
1. [Where do I see the result ?](#where-do-i-see-the-result)
1. [TL;DR](#tldr)

---

## What is XRP Ocean Drop ?

XRP Ocean Drop is a game using the KISS principle, where the goal is to create an [Ocean](#the-ocean) composed of a million _Drops_, in order to generate a huge _[Tsunami](#the-tsunami)_, all this based on the technology offered by the XRPL

## How does the game work ?

The game is based on a strictly random selection principle. To do this and to avoid tampering, XRP Ocean Drop uses two key rules to ensure maximum randomness:

1. The [Fisher-Yates](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm) shuffle algorithm, which allows to randomly distribute all _Drops_ in the _Ocean_. Source code reference [see](https://github.com/ocean-drop/ocean-drop/blob/9a60e2ddabb30030215740c91f78c6217e71cfd6/src/Ocean.js#L115-L132).
1. [crypto.randomInt(min, max)](https://nodejs.org/api/crypto.html#cryptorandomintmin-max-callback) allowing to select a _Drop_ between 0 and 1'000'000(excluded). Source code reference [see](https://github.com/ocean-drop/ocean-drop/blob/9a60e2ddabb30030215740c91f78c6217e71cfd6/src/tsunami.js#L47-L50).

Players have the possibility to acquire one or more _Drops_ for 5XRP each. To do so, they just have to send 5XRP to the address ([r9chCF3ieEKCVDW1pAvtuDnvcjmBShiVfW](https://xrpscan.com/account/r9chCF3ieEKCVDW1pAvtuDnvcjmBShiVfW)). Players can also create their own [Wave](#the-waves) to participate in multiple times or to invite other players to join them.

### The Ocean

The _Ocean_ is the place where all the _Drops_ are stored while waiting for the _Tsunami_ to occur. The _Ocean_ is represented by the address ([r9chCF3ieEKCVDW1pAvtuDnvcjmBShiVfW](https://xrpscan.com/account/r9chCF3ieEKCVDW1pAvtuDnvcjmBShiVfW)) which is auditable at all times to ensure maximum transparency.

### The Tsunami

The _Tsunami_ depends on the size of the _Waves_, but is at least 2/5 of the _Ocean_ size, or at least 40% in percentage terms.

The _Tsunami_ is the result after all the _Drops_ have been sold. The _Tsunami_ is represented by one and only one address which will have been randomly selected according to the two rules described above.

### The Waves

The totality of all the _Waves_ and its participants is at most 2/5 of the _Ocean_ size, or at most 40% in percentage terms.

What are the advantages of creating a _Wave_? The creation of a _Wave_ allows its creator to reduce the cost of participation to 2/5 of the initial price, that is to say 40% discount on 5XRP. Each _Wave_ gets 2/5, or 40%, of each player that joined it.

To create a _Wave_ you just need to add a destination tag when you participate. However, make sure that your _Wave_ does not already exist, otherwise you will join someone else's _Wave_!

### The Boat

The boat represents the development team monitoring the _Ocean_ and is 1/5 the _Ocean_ size, or 20% in percentage terms.

## Why should I participate ?

Your participation will allow the development team to develop and promote projects around XRPL that will serve the community. All projects will be open source.

## When will the game end ?

The game will end when one million _Drops_ of the _Ocean_ are sold out.

However, if by December 31, 2022 the size of the _Ocean_ is less than 10% of the total _Drops_ available, the game will be cancelled and all the _Drops_ purchased will be returned to the individual players.

On the other hand, if on December 31, 2022 the size of the _Ocean_ is greater than 10% but less than 100% of the total _Drops_ available, a vote will be launched on our Twitter account to maintain or not the game. Two cases are possible:

- If the majority of players want to continue, the game will be maintained. Then, a vote will be held at the beginning of each month to decide whether or not to continue the game.
- If the majority of the players want to stop the game, all the _Drops_ purchased will be returned to the different players.

## Where do I see the result ?

The result will be generated automatically and without human intervention by the GitHub Actions. When the result will have been generated a copy will be kept in this GitHub repo, to keep a trace of the history. Indeed, as the generation of the _Waves_ can be reproduced, as the _Tsunami_ is totally random and cannot be reproduced.

## TL;DR

The goal is to create an _Ocean_ of a million _Drops_. You can also create your own _Wave_ and invite others to join.

To do so, you just have to send 5XRP to the address ([r9chCF3ieEKCVDW1pAvtuDnvcjmBShiVfW](https://xrpscan.com/account/r9chCF3ieEKCVDW1pAvtuDnvcjmBShiVfW)), to create your _Wave_ just add a destination tag. Make sure your _Wave_ doesn't already exist, otherwise you will join someone else's wave!

Once the million _Drops_ are sold out, a _Tsunami_ will reward a randomly chosen participant (cryptographically secured) at 2/5 of the _Ocean_ size, the _Waves_ will count for 2/5 and the 1/5 will be used to develop projects around the XRPL.
