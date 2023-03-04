import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  saveExitPosition,
  saveGrid,
  saveHeroPosition,
  resetMap,
} from "features/map/mapSlice";
import { exitDungeon, resetApp } from "features/app/appSlice";
import { resetHero } from "features/hero/heroSlice";
import { resetInventory } from "features/inventory/inventorySlice";
import { resetQuests } from "features/quest/questSlice";
import gate from "../../images/dungeon-gate.png";

export const Map = ({ onEncounter, newGame }) => {
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [grid, setGrid] = useState([]);
  const [exit, setExit] = useState({ left: 0, top: 0 });
  const [opacity, setOpacity] = useState(100);

  const dispatch = useDispatch();

  let dimensions = 20;
  let maxTunnels = 50;
  let maxLength = 8;

  useEffect(() => {
    if (newGame) {
      dispatch(resetApp());
      dispatch(resetHero());
      dispatch(resetInventory());
      dispatch(resetMap());
      dispatch(resetQuests());
    }
  }, [newGame]);

  const avatar = useSelector((state) => state.hero.img);
  const savedGrid = useSelector((state) => state.map.grid);
  const savedHeroPosition = useSelector((state) => state.map.heroPosition);
  const savedExitPosition = useSelector((state) => state.map.exitPosition);

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
      randomDirection;

    setLeft(
      savedHeroPosition.left ? savedHeroPosition.left : currentColumn * 40
    );
    setTop(savedHeroPosition.top ? savedHeroPosition.top : currentRow * 40);
    setExit({
      left: savedExitPosition.left
        ? savedExitPosition.left
        : currentColumn * 40,
      top: savedExitPosition.top ? savedExitPosition.top : currentRow * 40,
    });

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
          break;
        } else {
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
    return map;
  };

  const handleExit = () => {
    dispatch(saveHeroPosition({ left: exit.left, top: exit.top }));
    dispatch(exitDungeon(true));
  };

  const moveHero = (event) => {
    const col = left / 40;
    const row = top / 40;
    switch (event.keyCode) {
      case 37: {
        // if mvoe would hit a wall exit, otherwise move
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
        event.stopImmediatePropagation();
        break;
      }
      case 38: {
        // if mvoe would hit a wall exit, otherwise move
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
        event.stopImmediatePropagation();
        break;
      }
      case 39: {
        // if mvoe would hit a wall exit, otherwise move
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
        event.stopImmediatePropagation();
        break;
      }
      case 40: {
        // if mvoe would hit a wall exit, otherwise move
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
        event.stopImmediatePropagation();
        break;
      }
      default:
        break;
    }
    const encounterRoll = Math.floor(Math.random() * 20) + 1;
    if (encounterRoll >= 18) {
      document.removeEventListener("keydown", moveHero);
      dispatch(saveGrid(grid));
      dispatch(saveHeroPosition({ left: left, top: top }));
      dispatch(saveExitPosition({ left: exit.left, top: exit.top }));
      setOpacity(0);
      setTimeout(onEncounter, 500);
    }
  };

  useEffect(() => {
    setGrid(savedGrid.length > 0 ? savedGrid : createMap());
    if (savedHeroPosition.left) {
      setLeft(savedHeroPosition.left);
    }
    if (savedHeroPosition.top) {
      setTop(savedHeroPosition.top);
    }
    if (savedExitPosition.left) {
      setExit({ left: savedExitPosition.left, top: savedExitPosition.top });
    }
  }, [savedGrid, savedHeroPosition, saveExitPosition]);

  useEffect(() => {
    document.addEventListener("keydown", moveHero);
    return () => {
      document.removeEventListener("keydown", moveHero);
    };
  });

  return (
    <div className={styles.main} style={{ opacity: `${opacity}` }}>
      <div className={styles.grid}>
        {grid.map((obj, row) => (
          <>
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
          </>
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
    </div>
  );
};
