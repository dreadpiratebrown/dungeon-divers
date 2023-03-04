# Credits

https://medium.com/free-code-camp/how-to-make-your-own-procedural-dungeon-map-generator-using-the-random-walk-algorithm-e0085c8aa9a

# TO DO

- Fix character creation
- Readjust weapon stats to creature levels
- Readjust creature stats
- Different leveling algorithm
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
