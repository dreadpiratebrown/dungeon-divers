import styles from "./styles.module.css";
import { useAIOpponent, useBattleSequence } from "hooks";
import {
  BattleAnnouncer,
  BattleMenu,
  Inventory,
  PlayerSummary,
} from "components";
import { wait } from "shared";
import { useState, useEffect } from "react";

export const Battle = ({ onLose, onWin }) => {
  const [sequence, setSequence] = useState({});
  const [showBattleMenu, setShowBattleMenu] = useState(true);
  const [showInventory, setShowInventory] = useState(false);

  const {
    turn,
    inSequence,
    playerStats,
    playerHealth,
    playerPD,
    playerMD,
    opponentHealth,
    opponentPD,
    opponentMD,
    opponentStats,
    playerAnimation,
    opponentAnimation,
    announcerMessage,
  } = useBattleSequence(sequence);

  const aiChoice = useAIOpponent(turn);

  useEffect(() => {
    if (aiChoice && turn === 1 && !inSequence) {
      setSequence({
        turn,
        mode: aiChoice.mode,
        name: aiChoice.name,
        damage: aiChoice.damage,
      });
    }
  }, [turn, aiChoice, inSequence]);

  useEffect(() => {
    turn === 0 && !inSequence
      ? setShowBattleMenu(true)
      : setShowBattleMenu(false);
  }, [turn, inSequence]);

  useEffect(() => {
    if (opponentHealth === 0) {
      (async () => {
        await wait(1000);
        onWin(opponentStats);
      })();
    } else if (playerHealth === 0) {
      (async () => {
        await wait(1000);
        onLose(opponentStats);
      })();
    }
  }, [playerHealth, opponentHealth, onWin, onLose]);

  return (
    <>
      <div className={styles.characters}>
        <div className={styles.fiend}>
          <div className={styles[opponentAnimation]}>
            <PlayerSummary
              type="fiend"
              name={opponentStats.name}
              level={opponentStats.level}
              image={opponentStats.img}
              health={opponentHealth}
              maxHealth={opponentStats.maxHealth}
              pd={opponentPD}
              maxPD={opponentStats.physicalDef}
              md={opponentMD}
              maxMD={opponentStats.magicalDef}
            />
          </div>
        </div>
        <div className={styles.player}>
          <div className={styles[playerAnimation]}>
            <PlayerSummary
              type="player"
              name={playerStats.name}
              level={playerStats.level}
              image={playerStats.img}
              health={playerHealth}
              maxHealth={playerStats.maxHealth}
              pd={playerPD}
              maxPD={playerStats.physicalDef}
              md={playerMD}
              maxMD={playerStats.magicalDef}
              onShowClick={() => setShowInventory(true)}
            />
          </div>
        </div>
      </div>
      {showBattleMenu && (
        <BattleMenu
          onPrimary={(name, type, damage) =>
            setSequence({ mode: type, turn, name, damage })
          }
          onSecondary={(name, type, damage) =>
            setSequence({ mode: type, turn, name, damage })
          }
        />
      )}
      <BattleAnnouncer message={announcerMessage} />
      {showInventory && (
        <Inventory onCloseClick={() => setShowInventory(false)} />
      )}
    </>
  );
};
