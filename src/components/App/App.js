import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { exitDungeon } from "features/app/appSlice";
import styles from "./styles.module.css";
import {
  Battle,
  CharacterBuilder,
  EndMenu,
  ExitScreen,
  FleeScreen,
  Generator,
  Shop,
  StartMenu,
  TravelScreen,
  VictoryScreen,
} from "components";

export const App = () => {
  const [mode, setMode] = useState("start");
  const [newGame, setNewGame] = useState(false);
  const [winner, setWinner] = useState();

  const exit = useSelector((state) => state.app.exit);

  const dispatch = useDispatch();

  useEffect(() => {
    if (mode === "battle") {
      setWinner(undefined);
    }
  }, [mode]);

  useEffect(() => {
    if (exit) {
      setMode("exit");
    }
  }, [exit]);

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
          onGenClick={() => {
            setMode("generator");
          }}
        />
      )}

      {mode === "generator" && <Generator />}

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
          onFlee={() => {
            setMode("flee");
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

      {mode === "flee" && (
        <FleeScreen
          onStartClick={() => {
            setMode("travel");
            setNewGame(false);
          }}
        />
      )}

      {mode === "exit" && (
        <ExitScreen
          onDungeonClick={() => {
            dispatch(exitDungeon(false));
            setMode("travel");
            setNewGame(false);
          }}
          onShopClick={() => {
            setMode("shop");
          }}
        />
      )}

      {mode === "shop" && (
        <Shop
          onCloseClick={() => {
            setMode("exit");
          }}
        />
      )}

      {mode === "gameOver" && !!winner && (
        <EndMenu winner={winner} onStartClick={() => setMode("start")} />
      )}
    </div>
  );
};
