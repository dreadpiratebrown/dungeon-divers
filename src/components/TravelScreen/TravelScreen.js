import styles from "./styles.module.css";
import { fiends, travelText } from "shared";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFiend } from "features/fiend/fiendSlice";
import { reset } from "features/hero/heroSlice";
import { resetInventory } from "features/inventory/inventorySlice";

export const TravelScreen = ({ onFightClick, newGame }) => {
  const [encounterType, setEncounterType] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (newGame) {
      dispatch(reset());
      dispatch(resetInventory());
    }
  }, [newGame]);

  const travel = Math.floor(Math.random() * travelText.length);
  const percentile = Math.floor(Math.random() * 100) + 1;

  useEffect(() => {
    if (percentile < 86) {
      setEncounterType("fiend");
      const fiend = fiends[Math.floor(Math.random() * fiends.length)];
      dispatch(setFiend(fiend));
    } else {
      setEncounterType("treasure");
    }
  }, [percentile]);

  return (
    <div className={styles.main}>
      <p>{travelText[travel]}</p>
      {encounterType === "fiend" && (
        <p>
          You encounter a fiend! <button onClick={onFightClick}>Fight!</button>
        </p>
      )}
      {encounterType === "treasure" && <p>You find treasure!</p>}
    </div>
  );
};
