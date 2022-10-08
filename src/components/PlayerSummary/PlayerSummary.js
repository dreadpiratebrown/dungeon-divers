import { Bar } from "components";
import styles from "./styles.module.css";

export const PlayerSummary = ({
  type,
  name,
  level,
  image,
  health,
  maxHealth,
  pd,
  maxPD,
  md,
  maxMD,
  onShowClick,
}) => {
  return (
    <div className={type === "fiend" ? styles.mainFiend : styles.main}>
      <div className={styles.portrait}>
        <img src={image} alt="character portrait" />
      </div>
      <div className={styles.info}>
        <div className={styles.levelName}>
          <span className={styles.level}>Lv. {level}</span>
          <span className={styles.name}>{name}</span>
          {type === "player" && (
            <button className={styles.inventoryButton} onClick={onShowClick}>
              <img src="/assets/knapsack.png" alt="Inventory" />
            </button>
          )}
        </div>
        <div className={styles.stats}>
          <Bar label="PD" value={pd} maxValue={maxPD} />
          <Bar label="MD" value={md} maxValue={maxMD} />
          <Bar label="HP" value={health} maxValue={maxHealth} />
        </div>
      </div>
    </div>
  );
};
