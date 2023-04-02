import styles from "./styles.module.css";
import { fiends, travelText, treasures } from "shared";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { exitDungeon, resetApp } from "features/app/appSlice";
import { setFiend } from "features/fiend/fiendSlice";
import { resetHero } from "features/hero/heroSlice";
import { add, remove, resetInventory } from "features/inventory/inventorySlice";
import { Inventory, MiniProfile } from "components";
import uuid from "react-uuid";

export const TravelScreen = ({ onFightClick, onCarryOn, newGame }) => {
  const [encounterType, setEncounterType] = useState();
  const [treasure, setTreasure] = useState();
  const [percentile, setPercentile] = useState();
  const [travel, setTravel] = useState();
  const [showInventory, setShowInventory] = useState(false);
  const [confirmTeleport, setConfirmTeleport] = useState(false);
  const [opacity, setOpacity] = useState(100);

  const dispatch = useDispatch();

  useEffect(() => {
    if (newGame) {
      dispatch(resetApp());
      dispatch(resetHero());
      dispatch(resetInventory());
    }
  }, [newGame]);

  const level = useSelector((state) => state.map.currentLevel) + 1;
  const inventory = useSelector((state) => state.inventory.items);
  const scroll = inventory.filter(
    (item) => item.id === "1576e7b7-42ef-4b7c-a807-b012832dd60e"
  );

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
    dispatch(remove(scroll[0]));
    dispatch(exitDungeon(true));
  };

  const inventoryClick = () => {
    opacity === 0 ? setOpacity(100) : setOpacity(0);
    setShowInventory(!showInventory);
  };

  return (
    <>
      <MiniProfile onBtnClick={inventoryClick} opacity={opacity} />
      {!confirmTeleport && (
        <div className={styles.main} style={{ opacity: `${opacity}` }}>
          <p className={styles.p}>{travelText[travel]}</p>
          {encounterType === "fiend" && (
            <>
              <p className={styles.p}>You encounter a fiend! </p>
              <button onClick={onFightClick} className={styles.fightBtn}>
                Fight!
              </button>
              <button
                className={styles.fightBtn}
                onClick={() => setConfirmTeleport(true)}
                disabled={scroll.length ? "" : "disabled"}
              >
                Teleport Out
              </button>
              {scroll.length ? (
                ""
              ) : (
                <span>You must have a Scroll of Return to teleport out</span>
              )}
            </>
          )}
          {encounterType === "treasure" && (
            <>
              <p className={styles.p}>You find treasure!</p>
              <p className={styles.p}>You have found a {treasure.name}.</p>
              <button className={styles.fightBtn} onClick={inventoryClick}>
                Inventory
              </button>
              <button onClick={onCarryOn} className={styles.fightBtn}>
                Continue!
              </button>
            </>
          )}
        </div>
      )}
      {showInventory && <Inventory onCloseClick={inventoryClick} />}
      {confirmTeleport && (
        <div className={styles.main} style={{ opacity: `${opacity}` }}>
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
