# Light-the-Bulb
Light the Bulb is a Puzzle Game using Javascript, HTLM/CSS. 
 
Light bulb placement
=================================================================

![image](https://user-images.githubusercontent.com/87647395/206874307-1e7ee34b-b574-4a7e-8e44-568a499a2719.png)

Once upon a time, King Unnamed of Nowhereland was both smiling and crying at the same time. He was smiling because his enormous brand-new palace with many spacious rooms and corridors has just been finished. He is also crying as these rooms need to be illuminated and kept warm, but the ongoing increase of utility costs affect him as well. So now it's time to think about the placement of the palace's light bulbs. We need to place them so that everything is properly lit, but we cannot install any unnecessary bulbs.

Game description
----------------

*   The king's palace has rooms with square shaped floors that consist of black and white tiles only.
*   Light bulbs can only be placed above white tiles.
*   The light from the light bulbs does not spread diagonally, only straight along the given row and column.
*   The black tiles have objects placed on them, which block the propagation of light.
*   Black cells can optionally contain an integer from 0 to 4. This indicates how many adjacent (bottom, top, right, left) cells contain light bulbs. If there is such a number, the puzzle must be solved accordingly!
*   Two light bulbs can NEVER illuminate each other!
*   The goal of the game is to place the light bulbs so that all the white tiles are illuminated.
*   The game is played by one player until he solves the puzzle, so there is no need to manage multiple players at the same time or divide into rounds.

### Gameplay example

1.  **The beginning of the game.** The game board only contains the tiles (mostly white, some black with or without numbers) but no light bulbs.

 ![image](https://user-images.githubusercontent.com/87647395/206874007-bdb84847-3e4c-4960-b0ff-5a6298032900.png)
 
2.  **Intermediate state.** The player can place a new light bulb or remove previously placed bulbs by clicking. Notice that the light only spreads along the row and column of the light bulb and does not traverse through black tiles!

![image](https://user-images.githubusercontent.com/87647395/206874063-26071209-bcc0-4c21-b215-76e68c891033.png)

3.  **The end of the game.** The player wins once every white tile is illuminated according to the rules.

![image](https://user-images.githubusercontent.com/87647395/206874089-9dad71e0-8690-4ec4-9821-494f3c6d8847.png)

### Example of an incorrect solution

The solution below is **incorrect** (regardless of the fact that all white cells are actually illuminated) because two light bulbs illuminate each other!
![image](https://user-images.githubusercontent.com/87647395/206874109-6221923e-d5c6-4fe1-a17a-392a312f6cac.png)

Game implementation
-------------------

The game launches on a **map selector** screen that performs the following:

*   displays a short description of the game
*   the map to be played can be chosen from the (pre-implemented) list of maps
*   the name of the player can be entered
*   the results of previous games are visible here
*   the saved game (if there is one) can be continued
*   the map editor can be launched from here (task for extra points)

There is also the **board** itself where the game takes place:

*   the elements belonging to the selected map are displayed here (e.g. a table for the correct size but another display method can be used as well, see the help section later)
*   light bulbs can be placed or removed by clicking
*   the validity of the player's solution can be checked (either automatically after a stop or with the press of a button)
*   the game can be saved or restarted

**Attention! These are not separate pages, only different panels which can be hidden or shown as needed. The entire game SHOULD be on one HTML page!**

Example maps
------------

In the three tables below a starting state is provided for each level of difficulty. You may as well create your own layout but pay attention that there should be a sufficient number of black tiles and some of them should contain numbers as well. **If you parameterize the task correctly, the puzzle will have only one solution.**

1.  Easy 7x7 map:

![image](https://user-images.githubusercontent.com/87647395/206874138-f3b8b7e8-531e-4597-8173-e106ef13a854.png)


2.  Advanced 7x7 map:

![image](https://user-images.githubusercontent.com/87647395/206874153-9d646337-735f-4917-aedb-7b227b24bc50.png)


3.  Extreme 10x10 map:

![image](https://user-images.githubusercontent.com/87647395/206874161-af19abb7-f50c-4d2a-aa92-19645e092840.png)

4. We can also Create our Custom Puzzle :
 
