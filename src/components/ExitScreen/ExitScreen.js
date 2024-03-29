import styles from "./styles.module.css";
import { heal } from "features/hero/heroSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

export const ExitScreen = ({ onDungeonClick, onShopClick, onQuestsClick }) => {
  const [innText, setInnText] = useState(false);
  const dispatch = useDispatch();
  const max = useSelector((state) => state.hero.maxHealth);

  const inn = () => {
    setInnText(true);
    dispatch(heal(max));
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.text}>You have made your way out safely.</h1>
      <p className={styles.text}>
        You have a chance to rest up at the inn, buy some new equipment, or you
        can simply re-enter the dungeon... <em>at your own peril.</em>
      </p>
      {innText && (
        <h2 classname={styles.text}>
          You feel refreshed and ready to tempt fate once more.
        </h2>
      )}
      <button className={styles.actionBtn} onClick={inn}>
        Inn
      </button>
      <button className={styles.actionBtn} onClick={onShopClick}>
        Shop
      </button>
      <button className={styles.actionBtn} onClick={onQuestsClick}>
        Quest Board
      </button>
      <button className={styles.actionBtn} onClick={onDungeonClick}>
        Dungeon
      </button>
    </div>
  );
};
