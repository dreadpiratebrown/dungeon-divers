import styles from "./styles.module.css";

export const FleeScreen = ({ onStartClick }) => {
  return (
    <div className={styles.main}>
      <h1>You have fled the fiend!</h1>
      <p>You live to fight another day.</p>
      <button className={styles.startButton} onClick={onStartClick}>
        Continue
      </button>
    </div>
  );
};
