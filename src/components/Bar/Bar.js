import styles from "./styles.module.css";

export const Bar = ({ value, maxValue, label }) => (
  <div className={styles.main}>
    <div>
      {label} {value}
    </div>
    <div className={styles.max}>
      <div
        className={styles.value}
        style={{ width: `${maxValue > 0 ? (value / maxValue) * 100 : 0}%` }}
      ></div>
    </div>
  </div>
);
