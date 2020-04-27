# Celestial Struggle Project Proposal

## Background and Overview
Celestial Struggle is a game similar to Galaga. You can move your ship that shoots projectiles at incoming enemies. The goal is to conquer space while struggling to get through the levels that increase in difficulty as you go along. 

Users will be able to move around their ship within the window freely using their mouse. Every 2 levels conquered will allow for an upgrade to either the damage or the health of the ship.

## Functionality and MVP
* Users can initialize a game
* Users can move ship with mouse
* Users can shoot and destroy enemy ships
* Users can upgrade damage or health

## WireFrames
![alt text](https://github.com/cjchoi97/celestial-struggle/blob/master/celestial-sky-wireframe.png "wireframe")

## Architecture and Technology
* Javascript for game logic
* CanvasHTML for rendering game
* Firebase DB for persisting high scores
* Webpack for bundling files

In addition to entry file, there will also be different files to handle different aspects of the game:
* game.js to handle main game loop
* ship.js will be parent class to different enemy ships and user ship
* field.js will handle the state of the game

## Implementaion Timeline
### Day 1
Set up weback and node modules. Write out the skeleton files. Review CanvasHTML to refresh on syntax and logic

### Day 2
Build out the game field. Build out the user ship as well as some enemy ships. Build enough to get to the starting state of the game. Get the ship moving with the mouse. Render different images onto the field. Start to get the state logic

### Day 3
Implement the state logic with winning or losing, projectiles hitting enemy ships or user ship.

### Day 4
Structuring the overall site. Continue working on game logic and other things that weren't finished in the previous days.


## Bonus Features
* Temporary upgrades drop
* Set a specific difficulty
* different kinds of user ships
