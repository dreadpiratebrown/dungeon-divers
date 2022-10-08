import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import {
  Battle,
  CharacterBuilder,
  EndMenu,
  StartMenu,
  VictoryScreen,
  TravelScreen,
} from "components";

export const App = () => {
  const [mode, setMode] = useState("start");
  const [newGame, setNewGame] = useState(false);
  const [winner, setWinner] = useState();

  useEffect(() => {
    if (mode === "battle") {
      setWinner(undefined);
    }
  }, [mode]);

  return (
    <div className={styles.main}>
      {mode === "start" && (
        <StartMenu
          onStartClick={() => {
            setMode("build");
            setNewGame(true);
          }}
          onLoadClick={() => {
            setMode("travel");
          }}
        />
      )}

      {mode === "build" && (
        <CharacterBuilder
          onStartClick={() => {
            setMode("travel");
          }}
        />
      )}

      {mode === "travel" && (
        <TravelScreen
          onFightClick={() => {
            setMode("battle");
          }}
          newGame={newGame}
        />
      )}

      {mode === "battle" && (
        <Battle
          onLose={(winner) => {
            setWinner(winner);
            setMode("gameOver");
          }}
          onWin={(winner) => {
            setWinner(winner);
            setMode("victory");
          }}
        />
      )}

      {mode === "victory" && !!winner && (
        <VictoryScreen
          fiend={winner}
          onStartClick={() => {
            setMode("travel");
            setNewGame(false);
          }}
        />
      )}

      {mode === "gameOver" && !!winner && (
        <EndMenu winner={winner} onStartClick={() => setMode("battle")} />
      )}
    </div>
  );
};
