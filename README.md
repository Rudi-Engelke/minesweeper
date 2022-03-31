# Introduction
This is a pure JS/HTML/CSS implementation of Minesweeper, and includes all the features of regular (ye olde) minesweeper, including board size and mine count adjustment, flagging of mines, and accurate colors for adjacent mine counts.

# How to play
The objective of Minesweeper is to clear all the mines. The game board is a grid of blocks, whether the blocks may or may not have mines hidden in them. To play, enter a board size (X and Y) and a mine count, and click New Game.

To start, click anywhere to reveal whether a block has a mine or not. Sometimes this first move is the end of the game (BOOM!). If you haven't revealed a mine, you'll either have a blank space (no mines surrounding this block) or a number, which represents the number of mines surrounding this block. The number counts mines in all directions, including diagonals.

If you think you've found a mine, use CTRL+click to flag the block as a mine (this differs from the original game, which uses right click). Once you've flagged all the mines and revealed all other blocks (or just revealed all other blocks like a madman), you win!

# FAQ
* Why is it so basic? *I made this one night when I wanted to play Minesweeper, but my internet was down so I couldn't play it on Windows 10. Evidently I really just wanted to play minesweeper.*