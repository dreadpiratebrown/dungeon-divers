import styles from "./styles.module.css";

export const Bar = ({ value, maxValue, label }) => (
  <div className={styles.main}>
    <div>
      {label} {value}
    </div>
    <div className={styles.max}>
      <div
        className={styles.value}
        style={{ width: `${(value / maxValue) * 100}%` }}
      ></div>
    </div>
  </div>
);
