import styles from "./styles.module.css";
import { useAIOpponent, useBattleSequence } from "hooks";
import { BattleAnnouncer, BattleMenu, PlayerSummary } from "components";
import { wait } from "shared";
import { useState, useEffect } from "react";

export const Battle = ({ onLose, onWin, onFlee }) => {
  const [sequence, setSequence] = useState({});
  const [showBattleMenu, setShowBattleMenu] = useState(true);

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
    fleeing,
  } = useBattleSequence(sequence);

  const maxPD =
    (playerStats.armor ? playerStats.armor.defense : 0) +
    (playerStats.accessory && playerStats.accessory.type === "physical defense"
      ? playerStats.accessory.value
      : 0);
  const maxMD =
    (playerStats.helmet ? playerStats.helmet.defense : 0) +
    (playerStats.accessory && playerStats.accessory.type === "magical defense"
      ? playerStats.accessory.value
      : 0);

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

  useEffect(() => {
    if (fleeing) {
      onFlee();
    }
  }, [fleeing]);

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
              flying={opponentStats.flying}
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
              maxPD={maxPD}
              md={playerMD}
              maxMD={maxMD}
            />
          </div>
          {showBattleMenu && (
            <BattleMenu
              onPrimary={(name, type, damage) =>
                setSequence({
                  mode: type,
                  turn,
                  name,
                  damage,
                  weapon: playerStats.primary,
                })
              }
              onSecondary={(name, type, damage) =>
                setSequence({
                  mode: type,
                  turn,
                  name,
                  damage,
                  weapon: playerStats.secondary,
                })
              }
              onFleeClick={() =>
                setSequence({
                  mode: "flee",
                  turn,
                })
              }
            />
          )}
        </div>
      </div>
      <BattleAnnouncer message={announcerMessage} />
    </>
  );
};
