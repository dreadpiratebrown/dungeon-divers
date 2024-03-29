import styles from "./styles.module.css";
import { loadState } from "app/storage";
import Logo from "../../images/logo.png";

export const StartMenu = ({ onStartClick, onLoadClick, onGenClick }) => {
  const savedState = loadState();

  return (
    <div className={styles.main} data-testid="startMenu">
      <h1>Welcome to</h1>
      <img src={Logo} alt="Dungeon Divers" className={styles.logo} />
      <button
        className={styles.startButton}
        onClick={onStartClick}
        data-testid="startBtn"
      >
        New Game
      </button>
      {savedState && (
        <button
          className={styles.continueButton}
          onClick={onLoadClick}
          data-testid="loadBtn"
        >
          Continue Game
        </button>
      )}
      {/* <button onClick={onGenClick}>Generator</button> */}
    </div>
  );
};
