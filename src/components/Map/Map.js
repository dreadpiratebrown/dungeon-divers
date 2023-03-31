import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addFame, exitDungeon } from "features/app/appSlice";
import { increaseSteps } from "features/hero/heroSlice";
import {
  addTenFloors,
  decrementLevel,
  incrementLevel,
  mapFloor,
  saveFloor,
} from "features/map/mapSlice";
import { Inventory } from "components/Inventory";
import gate from "../../images/dungeon-gate.png";
import stepsDown from "../../images/stairs-down.png";
import stepsUp from "../../images/stairs-up.png";
import { MiniProfile } from "components/MiniProfile";

export const Map = ({ onEncounter, newGame }) => {
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [grid, setGrid] = useState([]);
  const [exit, setExit] = useState({ left: 0, top: 0 });
  const [stairsDown, setStairsDown] = useState({ left: 0, top: 0 });
  const [stairsUp, setStairsUp] = useState({ left: 0, top: 0 });
  const [opacity, setOpacity] = useState(100);
  const [showPrompt, setShowPrompt] = useState(false);
  const [going, setGoing] = useState();
  const [numSteps, setNumSteps] = useState(0);
  const [floorMapped, setFloorMapped] = useState(false);
  const [reachedTenFloors, setReachedTenFloors] = useState(false);
  const [showInventory, setShowInventory] = useState(false);

  const dispatch = useDispatch();

  let dimensions = 20;
  let maxTunnels = 50;
  let maxLength = 8;
  const maxSteps = 50;

  const avatar = useSelector((state) => state.hero.img);
  const level = useSelector((state) => state.map.currentLevel);
  const levelPlusOne = level + 1;
  const floors = useSelector((state) => state.map.floors);
  const floorsMapped = useSelector((state) => state.map.floorsMapped);
  const tenFloors = useSelector((state) => state.map.tenFloors);

  const createArray = (num, dimensions) => {
    var array = [];
    for (var i = 0; i < dimensions; i++) {
      array.push([]);
      for (var j = 0; j < dimensions; j++) {
        array[i].push(num);
      }
    }
    return array;
  };

  const createMap = () => {
    let map = createArray(1, dimensions),
      currentRow = Math.floor(Math.random() * dimensions),
      currentColumn = Math.floor(Math.random() * dimensions),
      directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ],
      lastDirection = [],
      randomDirection,
      stairsSet = false;

    while (maxTunnels && dimensions && maxLength) {
      do {
        randomDirection =
          directions[Math.floor(Math.random() * directions.length)];
      } while (
        (randomDirection[0] === -lastDirection[0] &&
          randomDirection[1] === -lastDirection[1]) ||
        (randomDirection[0] === lastDirection[0] &&
          randomDirection[1] === lastDirection[1])
      );

      var randomLength = Math.ceil(Math.random() * maxLength),
        tunnelLength = 0;

      while (tunnelLength < randomLength) {
        if (
          (currentRow === 0 && randomDirection[0] === -1) ||
          (currentColumn === 0 && randomDirection[1] === -1) ||
          (currentRow === dimensions - 1 && randomDirection[0] === 1) ||
          (currentColumn === dimensions - 1 && randomDirection[1] === 1)
        ) {
          // leave as 1 = wall
          break;
        } else {
          // set to 0 = tunnel
          map[currentRow][currentColumn] = 0;
          currentRow += randomDirection[0];
          currentColumn += randomDirection[1];
          tunnelLength++;
        }
      }

      if (tunnelLength) {
        lastDirection = randomDirection;
        maxTunnels--;
      }
    }

    if (level === 0) {
      // floor 1 - exit, stairs down, hero
      setLeft(currentColumn * 40);
      setTop(currentRow * 40);
      setExit({
        left: currentColumn * 40,
        top: currentRow * 40,
      });
      setStairsUp({
        left: -9999,
        top: -9999,
      });

      while (!stairsSet) {
        let downLeft = Math.floor(Math.random() * dimensions),
          downTop = Math.floor(Math.random() * dimensions);
        if (
          downLeft !== exit.left &&
          downTop !== exit.top &&
          map[downTop][downLeft] === 0
        ) {
          setStairsDown({
            left: downLeft * 40,
            top: downTop * 40,
          });
          stairsSet = true;
        }
      }
    } else {
      setExit({
        left: -9999,
        top: -9999,
      });

      while (!stairsSet) {
        let downLeft = Math.floor(Math.random() * dimensions),
          downTop = Math.floor(Math.random() * dimensions),
          upLeft = Math.floor(Math.random() * dimensions),
          upTop = Math.floor(Math.random() * dimensions);
        if (
          downLeft !== exit.left &&
          downTop !== exit.top &&
          map[downTop][downLeft] === 0 &&
          upLeft !== exit.left &&
          upTop !== exit.top &&
          upLeft !== downLeft &&
          upTop !== downTop &&
          map[upTop][upLeft] === 0
        ) {
          setStairsDown({
            left: downLeft * 40,
            top: downTop * 40,
          });
          setStairsUp({
            left: upLeft * 40,
            top: upTop * 40,
          });
          setLeft(upLeft * 40);
          setTop(upTop * 40);
          stairsSet = true;
        }
      }
    }

    setNumSteps(Math.floor(Math.random() * maxSteps));

    return map;
  };

  const handleExit = () => {
    dispatch(
      saveFloor({
        level: level,
        grid: grid,
        hero: { left: left, top: top },
        exit: { left: exit.left, top: exit.top },
        stairsDown: { left: stairsDown.left, top: stairsDown.top },
        stairsUp: { left: stairsUp.left, top: stairsUp.top },
      })
    );
    dispatch(exitDungeon(true));
  };

  const handleStairs = (direction) => {
    if (direction === "down") {
      setShowPrompt(false);
      dispatch(
        saveFloor({
          level: level,
          grid: grid,
          hero: { left: left, top: top },
          exit: { left: exit.left, top: exit.top },
          stairsDown: { left: stairsDown.left, top: stairsDown.top },
          stairsUp: { left: stairsUp.left, top: stairsUp.top },
        })
      );
      dispatch(incrementLevel());
      setGrid(createMap());
    } else {
      setShowPrompt(false);
      dispatch(
        saveFloor({
          level: level,
          grid: grid,
          hero: { left: left, top: top },
          exit: { left: exit.left, top: exit.top },
          stairsDown: { left: stairsDown.left, top: stairsDown.top },
          stairsUp: { left: stairsUp.left, top: stairsUp.top },
        })
      );
      dispatch(decrementLevel());
      const prevLevel = level - 1;
      const floor = floors[prevLevel];
      if (floor) {
        setGrid(floor.grid);
        setLeft(floor.hero.left);
        setTop(floor.hero.top);
        setExit({ left: floor.exit.left, top: floor.exit.top });
        setStairsDown({
          left: floor.stairsDown.left,
          top: floor.stairsDown.top,
        });
        setStairsUp({ left: floor.stairsUp.left, top: floor.stairsUp.top });
      }
    }
  };

  const moveHero = (event) => {
    const col = left / 40;
    const row = top / 40;
    switch (event.keyCode) {
      case 37: {
        // if move would hit a wall exit, otherwise move
        if (grid[row][col - 1] === 1 || col - 1 < 0) {
          return false;
        } else {
          setLeft((state) => state - 40);
          const newGrid = JSON.parse(JSON.stringify(grid));
          newGrid[row][col] = 2;
          setGrid(newGrid);
        }
        // check if hero is at exit
        if (left - 40 === exit.left && top === exit.top) {
          handleExit();
        }
        // check if hero is at stairs down
        if (left - 40 === stairsDown.left && top === stairsDown.top) {
          setShowPrompt(true);
          setGoing("down");
        }
        // check if hero is at stairs up
        if (left - 40 === stairsUp.left && top === stairsUp.top) {
          setShowPrompt(true);
          setGoing("up");
        }
        event.stopImmediatePropagation();
        break;
      }
      case 38: {
        // if move would hit a wall exit, otherwise move
        if (grid[row - 1][col] === 1) {
          return false;
        } else {
          setTop((state) => state - 40);
          const newGrid = JSON.parse(JSON.stringify(grid));
          newGrid[row][col] = 2;
          setGrid(newGrid);
        }
        // check if hero is at exit
        if (top - 40 === exit.top && left === exit.left) {
          handleExit();
        }
        // check if hero is at stairs down
        if (top - 40 === stairsDown.top && left === stairsDown.left) {
          setShowPrompt(true);
          setGoing("down");
        }
        // check if hero is at stairs up
        if (top - 40 === stairsUp.top && left === stairsUp.left) {
          setShowPrompt(true);
          setGoing("up");
        }
        event.stopImmediatePropagation();
        break;
      }
      case 39: {
        // if move would hit a wall exit, otherwise move
        if (grid[row][col + 1] === 1 || col + 1 > dimensions - 1) {
          return false;
        } else {
          setLeft((state) => state + 40);
          const newGrid = JSON.parse(JSON.stringify(grid));
          newGrid[row][col] = 2;
          setGrid(newGrid);
        }
        // check if hero is at exit
        if (left + 40 === exit.left && top === exit.top) {
          handleExit();
        }
        // check if hero is at stairs down
        if (left + 40 === stairsDown.left && top === stairsDown.top) {
          setShowPrompt(true);
          setGoing("down");
        }
        // check if hero is at stairs up
        if (left + 40 === stairsUp.left && top === stairsUp.top) {
          setShowPrompt(true);
          setGoing("up");
        }
        event.stopImmediatePropagation();
        break;
      }
      case 40: {
        // if move would hit a wall exit, otherwise move
        if (grid[row + 1][col] === 1) {
          return false;
        } else {
          setTop((state) => state + 40);
          const newGrid = JSON.parse(JSON.stringify(grid));
          newGrid[row][col] = 2;
          setGrid(newGrid);
        }
        // check if hero is at exit
        if (top + 40 === exit.top && left === exit.left) {
          handleExit();
        }
        // check if hero is at stairs down
        if (top + 40 === stairsDown.top && left === stairsDown.left) {
          setShowPrompt(true);
          setGoing("down");
        }
        // check if hero is at stairs up
        if (top + 40 === stairsUp.top && left === stairsUp.left) {
          setShowPrompt(true);
          setGoing("up");
        }
        event.stopImmediatePropagation();
        break;
      }
      default:
        break;
    }
    // increase total steps taken
    dispatch(increaseSteps());
    // decrease number of steps until next encounter
    setNumSteps(numSteps - 1);
    if (numSteps === 0) {
      document.removeEventListener("keydown", moveHero);
      dispatch(
        saveFloor({
          level: level,
          grid: grid,
          hero: { left: left, top: top },
          exit: { left: exit.left, top: exit.top },
          stairsDown: { left: stairsDown.left, top: stairsDown.top },
          stairsUp: { left: stairsUp.left, top: stairsUp.top },
        })
      );
      setOpacity(0);
      setTimeout(onEncounter, 500);
    }
  };

  useEffect(() => {
    if (
      grid.length &&
      !grid.flat().includes(0) &&
      !floorsMapped.includes(level)
    ) {
      setFloorMapped(true);
      dispatch(mapFloor(level));
      dispatch(addFame(5));
    }

    if ((level + 1) % 10 === 0 && !tenFloors.includes(level)) {
      setReachedTenFloors(true);
      dispatch(addTenFloors(level));
      dispatch(addFame(10));
    }
  }, [grid, level]);

  useEffect(() => {
    const floor = floors[level];
    if (floor) {
      setGrid(floor.grid);
      setLeft(floor.hero.left);
      setTop(floor.hero.top);
      setExit({ left: floor.exit.left, top: floor.exit.top });
      setStairsDown({ left: floor.stairsDown.left, top: floor.stairsDown.top });
      setStairsUp({ left: floor.stairsUp.left, top: floor.stairsUp.top });
      setNumSteps(Math.floor(Math.random() * maxSteps));
    } else {
      setGrid(createMap());
    }
  }, [floors]);

  useEffect(() => {
    document.addEventListener("keydown", moveHero);
    if (showPrompt) {
      document.removeEventListener("keydown", moveHero);
    }
    return () => {
      document.removeEventListener("keydown", moveHero);
    };
  });

  const inventoryClick = () => {
    opacity === 0 ? setOpacity(100) : setOpacity(0);
    setShowInventory(!showInventory);
  };

  return (
    <>
      <h1 className={styles.floorName}>Floor {level + 1}</h1>
      <MiniProfile onBtnClick={inventoryClick} opacity={opacity} />
      <div className={styles.main} style={{ opacity: `${opacity}` }}>
        <div className={styles.grid}>
          {grid.map((obj, row) => (
            <React.Fragment key={row}>
              {obj.map((obj2, col) => (
                <div
                  className={
                    obj2 === 1
                      ? styles.wall
                      : obj2 === 2
                      ? styles.tunnelVisited
                      : styles.tunnel
                  }
                  key={col}
                ></div>
              ))}
            </React.Fragment>
          ))}
        </div>
        <img
          src={avatar}
          style={{
            position: "absolute",
            width: "39px",
            left: left,
            top: top,
            zIndex: 1,
          }}
        />
        <img
          src={gate}
          style={{
            position: "absolute",
            width: "39px",
            left: exit.left,
            top: exit.top,
          }}
        />
        <img
          src={stepsDown}
          style={{
            position: "absolute",
            width: "39px",
            left: stairsDown.left,
            top: stairsDown.top,
          }}
        />
        <img
          src={stepsUp}
          style={{
            position: "absolute",
            width: "39px",
            left: stairsUp.left,
            top: stairsUp.top,
          }}
        />
        {showPrompt && (
          <div className={styles.stairsPrompt}>
            Do you wish to{" "}
            {going === "down"
              ? "descend further into the dungeon"
              : "ascend towards the light"}
            ? <br />
            <br />
            <button onClick={() => handleStairs(going)}>Yes</button>
            <button onClick={() => setShowPrompt(false)}>No</button>
          </div>
        )}
        {floorMapped && (
          <div className={styles.stairsPrompt}>
            <h3>
              Congratulations, you have completely mapped this floor! Your fame
              increases by 5.
            </h3>
            <button onClick={() => setFloorMapped(false)}>Dismiss</button>
          </div>
        )}
        {reachedTenFloors && (
          <div className={styles.stairsPrompt}>
            <h3>
              Congratulations, you have reached floor {levelPlusOne}! Your fame
              increases by 10.
            </h3>
            <button onClick={() => setReachedTenFloors(false)}>Dismiss</button>
          </div>
        )}
      </div>
      {showInventory && <Inventory onCloseClick={inventoryClick} />}
    </>
  );
};
