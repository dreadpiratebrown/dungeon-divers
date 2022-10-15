import styles from "./styles.module.css";

export const ExitScreen = ({ onDungeonClick }) => {
  return (
    <div className={styles.main}>
      <h1>You have made your way out safely.</h1>
      <p>
        You have a chance to rest up at the inn, buy some new equipment, or you
        can simply re-enter the dungeon... <em>at your own peril.</em>
      </p>
      <button className={styles.actionBtn}>Inn</button>
      <button className={styles.actionBtn}>Shop</button>
      <button className={styles.actionBtn} onClick={onDungeonClick}>
        Dungeon
      </button>
    </div>
  );
};
