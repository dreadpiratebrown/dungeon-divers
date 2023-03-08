# Credits

https://medium.com/free-code-camp/how-to-make-your-own-procedural-dungeon-map-generator-using-the-random-walk-algorithm-e0085c8aa9a

# TO DO

- Readjust weapon stats to creature levels
- Readjust creature stats
- Treasures - fix articles; reduce encounters
- Add scroll of return to possible treasures or create traveling merchant encounter?
- More traveling text
- Is there a story? What else to do besides fight monsters? Quests?
- Player customization - validation
- Bestiary
- Treasure maps
- Sound?
- More than one fighter
- More than one fiend
- Meta stats - fiends killed, “steps” taken, etc
- Monster drops
- Puzzles?
- Traps?
- Crafting? Big lift.
- Sort inventory?
- Inventory limit?
- Critical hits?
- Multiple map levels?
- Write tests
- Goblin is too powerful
- Lower chance of encounter directly after a previous encounter / better encounter roll algo

Test play: too much gold. Cost steps for items too small. Too many treasure encounters. Leveling is too fast.

## Quests

- quests table
  - UUID
  - types: fetch (monster drops), fetch (treasure), kill monster(s)
  - name
  - description
  - UUID of item to fetch or fiend to kill
  - goal
  - reward (just gold? XP also?)
- quest items table (monster drops)
  - UUID
  - name
  - description?
  - image
  - item type
  - equippable (might not need this)
  - usable (might not need this)
  - value (for selling)?
- quest journal (active quests)

  - UUID
  - name
  - description
  - progress
  - complete?

## Multi-Level Dungeon

Floor object

- grid
- exit position (if floor 1)
- hero position
- stairs down
- stairs up (if floor > 1)

Floor creation

- get current level from mapSlice
- if floors[current level] exists (going up)
  - get floors[current level] from state
  - floors.pop from mapSlice
  - load grid and all icon positions
- else (going down)
  - create grid
  - set exit if current level === 1
  - set hero at exit if current level === 1, otherwise at stairs up
  - set stairs down (make sure they don't collide with exit)
  - set stairs up if current level > 1 (make sure they don't collide with exit or stairs down)

On hero move

- check for collisions
- move hero and set previous square to 2
- check if hero is on exit (if exit exists)
  - handle exit
- check if hero is on stairs down
  - stop keyboard listener
  - ask if player wants to go down; if yes
    - assemble floor object and save to mapSlice (floors.push)
    - increment current level in mapSlice
    - make a new floor
- check if hero is on stairs up
  - stop keyboard listener
  - ask if player wants to go up; if yes
    - decrement current level in mapSlice
    - run floor creation
- roll for encounter
  - assemble floor object and save to mapSlice (floors.push)
  - run onEncounter
