import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseExp,
  increaseGold,
  increaseLevel,
} from "features/hero/heroSlice";
import { add } from "features/inventory/inventorySlice";
import { decrementRecharge } from "features/app/appSlice";
import { useQuest } from "hooks";
import { useEffect, useState } from "react";

export const VictoryScreen = ({ fiend, onStartClick }) => {
  const [levelUp, setLevelUp] = useState(false);

  const dispatch = useDispatch();
  const recharging = useSelector((state) => state.app.teleportRecharging);
  const { item: questItem, haveNum, needNum } = useQuest(fiend);

  useEffect(() => {
    dispatch(increaseExp(fiend.exp));
    dispatch(increaseGold(fiend.gold));
    if (questItem) {
      dispatch(add(questItem));
    }
    if (recharging) {
      dispatch(decrementRecharge());
    }
  }, [fiend, questItem, recharging]);

  const exp = useSelector((state) => state.hero.exp);
  const level = useSelector((state) => state.hero.level);
  const nextLevel = Math.round(Math.pow(level / 0.3, 2));
  const maxHealth = useSelector((state) => state.hero.maxHealth);

  useEffect(() => {
    if (exp >= nextLevel) {
      setLevelUp(true);
      const hpUp = Math.floor(Math.random() * 8) + 2;
      dispatch(increaseLevel(hpUp));
    }
  }, [exp]);

  return (
    <div className={styles.main}>
      <h1>Victory!</h1>
      <p>
        You gained {fiend.exp} XP and {fiend.gold} gold!
      </p>
      {questItem && (
        <p>
          You gained 1 {questItem.name}. {haveNum}/{needNum} collected.
        </p>
      )}
      {levelUp && (
        <>
          <h2>Level up!</h2>
          <p>Your level is now {level}.</p>
          <p>Your max health is now {maxHealth}.</p>
        </>
      )}
      <button className={styles.startButton} onClick={onStartClick}>
        Continue
      </button>
    </div>
  );
};
