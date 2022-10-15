import styles from "./styles.module.css";
import { loadState } from "app/storage";

export const StartMenu = ({ onStartClick, onLoadClick, onGenClick }) => {
  const savedState = loadState();

  return (
    <div className={styles.main}>
      <h1>You stand before a dungeon.</h1>
      <p>
        Wealth and fame await those who can survive its depths. Are you worthy?
      </p>
      <button className={styles.startButton} onClick={onStartClick}>
        New Game
      </button>
      {savedState && (
        <button className={styles.continueButton} onClick={onLoadClick}>
          Load Saved Game
        </button>
      )}
      {/* <button onClick={onGenClick}>Generator</button> */}
    </div>
  );
};
