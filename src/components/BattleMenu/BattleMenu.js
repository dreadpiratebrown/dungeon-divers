import styles from "./styles.module.css";
import { useSelector } from "react-redux";

export const BattleMenu = ({ onPrimary, onSecondary }) => {
  const primary = useSelector((state) => state.hero.primary);
  const secondary = useSelector((state) => state.hero.secondary);

  return (
    <div className={styles.main}>
      <div className={styles.option}>
        {primary && (
          <>
            <img src={primary.icon} alt={primary.name} />
            <span>{primary.name}</span>
            <span>{primary.attack}</span>
            <button
              onClick={() =>
                onPrimary(primary.name, primary.type, primary.attack)
              }
            >
              Attack
            </button>
          </>
        )}
      </div>
      <div className={styles.option}>
        {secondary && (
          <>
            <img src={secondary.icon} alt={secondary.name} />
            <span>{secondary.name}</span>
            <span>{secondary.attack}</span>
            <button
              onClick={() =>
                onSecondary(secondary.name, secondary.type, secondary.attack)
              }
            >
              Attack
            </button>
          </>
        )}
      </div>
    </div>
  );
};
