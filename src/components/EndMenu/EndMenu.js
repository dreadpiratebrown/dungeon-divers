import styles from "./styles.module.css";
import tombstone from "../../images/tombstone.png";

export const EndMenu = ({ winner, onStartClick }) => {
  return (
    <div className={styles.main}>
      <img src={tombstone} alt="tombstone" />
      <h1>You have died. The dungeon claims another victim.</h1>
      <button className={styles.startButton} onClick={onStartClick}>
        Play Again
      </button>
    </div>
  );
};
