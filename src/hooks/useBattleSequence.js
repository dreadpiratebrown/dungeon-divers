import { wait } from "shared";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { takeDamage } from "features/hero/heroSlice";

export const useBattleSequence = (sequence) => {
  const [turn, setTurn] = useState(0);
  const [inSequence, setInSequence] = useState(false);

  const playerStats = useSelector((state) => state.hero);
  const playerHealth = playerStats.health;
  const [playerPD, setPlayerPD] = useState(playerStats.physicalDef);
  const [playerMD, setPlayerMD] = useState(playerStats.magicalDef);

  const opponentStats = useSelector((state) => state.fiend);
  const [opponentHealth, setOpponentHealth] = useState(opponentStats.maxHealth);
  const [opponentPD, setOpponentPD] = useState(opponentStats.physicalDef);
  const [opponentMD, setOpponentMD] = useState(opponentStats.magicalDef);

  const [announcerMessage, setAnnouncerMessage] = useState("");

  const [playerAnimation, setPlayerAnimation] = useState("static");
  const [opponentAnimation, setOpponentAnimation] = useState("static");

  const dispatch = useDispatch();

  useEffect(() => {
    const armor = playerStats.armor;
    setPlayerPD(playerPD + armor.defense);
  }, []);

  useEffect(() => {
    // ROLL FOR INITIATIVE
    const playerInitiative = Math.ceil(Math.random() * 20) + playerStats.speed;
    const fiendInitiative = Math.ceil(Math.random() * 20) + opponentStats.speed;
    setTurn(playerInitiative > fiendInitiative ? 0 : 1);

    const { mode, turn, name, damage } = sequence;

    if (mode) {
      const attacker = turn === 0 ? playerStats : opponentStats;

      switch (mode) {
        case "physical": {
          (async () => {
            setInSequence(true);
            setAnnouncerMessage(
              `${attacker.name} attacked with the ${name} for ${damage} damage.`
            );

            turn === 0
              ? setPlayerAnimation("attack")
              : setOpponentAnimation("attack");
            await wait(100);

            turn === 0
              ? setPlayerAnimation("static")
              : setOpponentAnimation("static");
            await wait(500);

            turn === 0
              ? setOpponentAnimation("damage")
              : setPlayerAnimation("damage");
            await wait(750);

            turn === 0
              ? setOpponentAnimation("static")
              : setPlayerAnimation("static");

            if (turn === 0) {
              opponentPD > 0
                ? setOpponentPD((h) => (h - damage > 0 ? h - damage : 0))
                : setOpponentHealth((h) => (h - damage > 0 ? h - damage : 0));
            } else {
              playerPD > 0
                ? setPlayerPD((h) => (h - damage > 0 ? h - damage : 0))
                : dispatch(takeDamage(damage));
            }
            await wait(2000);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        case "magical": {
          (async () => {
            setInSequence(true);
            setAnnouncerMessage(
              `${attacker.name} cast ${name} for ${damage} damage.`
            );
            turn === 0
              ? setPlayerAnimation("magic")
              : setOpponentAnimation("magic");
            await wait(1000);

            turn === 0
              ? setPlayerAnimation("static")
              : setOpponentAnimation("static");
            await wait(500);

            turn === 0
              ? setOpponentAnimation("damage")
              : setPlayerAnimation("damage");
            await wait(750);

            turn === 0
              ? setOpponentAnimation("static")
              : setPlayerAnimation("static");

            if (turn === 0) {
              opponentMD > 0
                ? setOpponentMD((h) => (h - damage > 0 ? h - damage : 0))
                : setOpponentHealth((h) => (h - damage > 0 ? h - damage : 0));
            } else {
              playerMD > 0
                ? setPlayerMD((h) => (h - damage > 0 ? h - damage : 0))
                : dispatch(takeDamage(damage));
            }
            await wait(2000);

            setTurn(turn === 0 ? 1 : 0);
            setInSequence(false);
          })();

          break;
        }

        default:
          break;
      }
    }
  }, [sequence]);

  return {
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
  };
};