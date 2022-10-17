import { wait } from "shared";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { takeDamage } from "features/hero/heroSlice";

export const useBattleSequence = (sequence) => {
  const [turn, setTurn] = useState(0);
  const [inSequence, setInSequence] = useState(false);

  const playerStats = useSelector((state) => state.hero);
  const playerHealth = playerStats.health;
  const [playerPD, setPlayerPD] = useState(() => {
    const armor = playerStats.armor ? playerStats.armor.defense : 0;
    const modifier =
      playerStats.accessory && playerStats.accessory.type === "physical defense"
        ? playerStats.accessory.value
        : 0;
    return armor + modifier;
  });
  const [playerMD, setPlayerMD] = useState(() => {
    const helmet = playerStats.helmet ? playerStats.helmet.defense : 0;
    const modifier =
      playerStats.accessory && playerStats.accessory.type === "magical defense"
        ? playerStats.accessory.value
        : 0;
    return helmet + modifier;
  });

  const opponentStats = useSelector((state) => state.fiend);
  const [opponentHealth, setOpponentHealth] = useState(opponentStats.maxHealth);
  const [opponentPD, setOpponentPD] = useState(opponentStats.physicalDef);
  const [opponentMD, setOpponentMD] = useState(opponentStats.magicalDef);

  const [announcerMessage, setAnnouncerMessage] = useState("");

  const [playerAnimation, setPlayerAnimation] = useState("static");
  const [opponentAnimation, setOpponentAnimation] = useState("static");

  const [fleeing, setFleeing] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // ROLL FOR INITIATIVE
    const speedModifier =
      playerStats.accessory && playerStats.accessory.type === "speed"
        ? playerStats.accessory.value
        : 0;
    const playerInitiative =
      Math.ceil(Math.random() * 20) + playerStats.speed + speedModifier;
    const fiendInitiative = Math.ceil(Math.random() * 20) + opponentStats.speed;
    setTurn(playerInitiative > fiendInitiative ? 0 : 1);

    const { mode, turn, name, damage, weapon } = sequence;

    if (mode) {
      const attacker = turn === 0 ? playerStats : opponentStats;

      switch (mode) {
        case "physical": {
          (async () => {
            setInSequence(true);
            let miss = false;
            if (turn === 0 && opponentStats.flying && !weapon.ranged) {
              setAnnouncerMessage(`[Miss! Try a ranged attack!]`);
              miss = true;
            } else {
              setAnnouncerMessage(`[${name} - ${damage} damage]`);
            }

            turn === 0
              ? setPlayerAnimation("attack")
              : setOpponentAnimation("attack");
            await wait(100);

            turn === 0
              ? setPlayerAnimation("static")
              : setOpponentAnimation("static");
            await wait(500);

            if (turn === 0 && !miss) {
              setOpponentAnimation("damage");
            } else if (turn === 1) {
              setPlayerAnimation("damage");
            }
            await wait(750);

            if (turn === 0 && !miss) {
              setOpponentAnimation("static");
            } else if (turn === 1) {
              setPlayerAnimation("static");
            }

            if (turn === 0 && !miss) {
              opponentPD > 0
                ? setOpponentPD((h) => (h - damage > 0 ? h - damage : 0))
                : setOpponentHealth((h) => (h - damage > 0 ? h - damage : 0));
            } else if (turn === 1) {
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
            setAnnouncerMessage(`[${name} - ${damage} damage]`);
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

        case "flee": {
          (async () => {
            setInSequence(true);
            const fleeRatio = (0.5 * playerStats.level) / opponentStats.level;
            const target = Math.random();
            if (target < fleeRatio) {
              setAnnouncerMessage("You flee!");
              await wait(1000);
              setFleeing(true);
              setInSequence(false);
            } else {
              setAnnouncerMessage("Your attempt to flee fails.");
              await wait(2000);
              setTurn(1);
              setInSequence(false);
            }
          })();
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
    fleeing,
  };
};
