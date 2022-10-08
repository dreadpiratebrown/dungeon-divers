import styles from "./styles.module.css";

export const BattleAnnouncer = ({ message }) => {
  return (
    <div className={styles.main}>
      <div className={styles.message}>{message}</div>
    </div>
  );
};
