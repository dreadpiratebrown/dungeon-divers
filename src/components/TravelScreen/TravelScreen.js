import styles from "./styles.module.css";
import { fiends, travelText, treasures } from "shared";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetApp } from "features/app/appSlice";
import { setFiend } from "features/fiend/fiendSlice";
import { reset } from "features/hero/heroSlice";
import { add, resetInventory } from "features/inventory/inventorySlice";
import uuid from "react-uuid";

export const TravelScreen = ({ onFightClick, newGame }) => {
  const [encounterType, setEncounterType] = useState();
  const [treasure, setTreasure] = useState();
  const [percentile, setPercentile] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (newGame) {
      dispatch(resetApp());
      dispatch(reset());
      dispatch(resetInventory());
    }
  }, [newGame]);

  const level = useSelector((state) => state.hero.level);
  const travel = Math.floor(Math.random() * travelText.length);
  useEffect(() => {
    setPercentile(Math.floor(Math.random() * 100) + 1);
  }, []);

  useEffect(() => {
    if (percentile && percentile < 86) {
      setEncounterType("fiend");
      const range = { low: level - 2, high: level + 2 };
      const fiendPool = fiends.filter(
        (f) => f.level >= range.low && f.level <= range.high
      );
      const fiend = fiendPool[Math.floor(Math.random() * fiendPool.length)];
      dispatch(setFiend(fiend));
    } else if (percentile && percentile >= 86) {
      setEncounterType("treasure");
      let tempTreasure = {
        ...treasures[Math.floor(Math.random() * treasures.length)],
      };
      const tempID = uuid();
      if (!tempTreasure.id) {
        tempTreasure.id = tempID;
      }
      setTreasure(tempTreasure);
      dispatch(add(tempTreasure));
      tempTreasure = null;
    }
  }, [percentile]);

  const carryOn = () => {
    setPercentile(Math.floor(Math.random() * 100) + 1);
  };

  return (
    <div className={styles.main}>
      <p>{travelText[travel]}</p>
      {encounterType === "fiend" && (
        <>
          <p>You encounter a fiend! </p>
          <button onClick={onFightClick} className={styles.fightBtn}>
            Fight!
          </button>
        </>
      )}
      {encounterType === "treasure" && (
        <>
          <p>You find treasure!</p>
          <p>You have found a {treasure.name}.</p>
          <button onClick={carryOn} className={styles.fightBtn}>
            Continue!
          </button>
        </>
      )}
    </div>
  );
};
