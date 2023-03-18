import styles from "./styles.module.css";
import { fiends, travelText, treasures } from "shared";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  exitDungeon,
  rechargeTeleport,
  setRecharge,
  resetApp,
} from "features/app/appSlice";
import { setFiend } from "features/fiend/fiendSlice";
import { resetHero } from "features/hero/heroSlice";
import { add, resetInventory } from "features/inventory/inventorySlice";
import { Inventory } from "components";
import uuid from "react-uuid";

export const TravelScreen = ({ onFightClick, onCarryOn, newGame }) => {
  const [encounterType, setEncounterType] = useState();
  const [treasure, setTreasure] = useState();
  const [percentile, setPercentile] = useState();
  const [travel, setTravel] = useState();
  const [showInventory, setShowInventory] = useState(false);
  const [confirmTeleport, setConfirmTeleport] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (newGame) {
      dispatch(resetApp());
      dispatch(resetHero());
      dispatch(resetInventory());
    }
  }, [newGame]);

  const level = useSelector((state) => state.map.currentLevel) + 1;
  const recharging = useSelector((state) => state.app.teleportRecharging);

  useEffect(() => {
    setPercentile(Math.floor(Math.random() * 100) + 1);
    setTravel(Math.floor(Math.random() * travelText.length));
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

  const teleportOut = () => {
    dispatch(rechargeTeleport(true));
    dispatch(setRecharge(Math.floor(Math.random() * 4) + 3));
    dispatch(exitDungeon(true));
  };

  return (
    <>
      {!confirmTeleport && (
        <div className={styles.main}>
          <p>{travelText[travel]}</p>
          {encounterType === "fiend" && (
            <>
              <p>You encounter a fiend! </p>
              <button onClick={onFightClick} className={styles.fightBtn}>
                Fight!
              </button>
              <button
                className={styles.fightBtn}
                onClick={() => setShowInventory(true)}
              >
                Inventory
              </button>
              <button
                className={styles.fightBtn}
                onClick={() => setConfirmTeleport(true)}
                disabled={recharging ? "disabled" : ""}
              >
                Teleport Out {recharging ? "(Recharging)" : ""}
              </button>
            </>
          )}
          {encounterType === "treasure" && (
            <>
              <p>You find treasure!</p>
              <p>You have found a {treasure.name}.</p>
              <button
                className={styles.fightBtn}
                onClick={() => setShowInventory(true)}
              >
                Inventory
              </button>
              <button onClick={onCarryOn} className={styles.fightBtn}>
                Continue!
              </button>
            </>
          )}
        </div>
      )}
      {showInventory && (
        <Inventory onCloseClick={() => setShowInventory(false)} />
      )}
      {confirmTeleport && (
        <div className={styles.main}>
          <p>
            Are you sure you want to teleport out? Your teleport skill will take
            some time to recharge.
          </p>
          <button className={styles.fightBtn} onClick={teleportOut}>
            Yes, take me out
          </button>
          <button
            className={styles.fightBtn}
            onClick={() => setConfirmTeleport(false)}
          >
            No, take me back
          </button>
        </div>
      )}
    </>
  );
};
