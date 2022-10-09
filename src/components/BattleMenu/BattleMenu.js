import styles from "./styles.module.css";
import { useSelector } from "react-redux";

export const BattleMenu = ({ onPrimary, onSecondary }) => {
  const primary = useSelector((state) => state.hero.primary);
  const secondary = useSelector((state) => state.hero.secondary);
  const accessory = useSelector((state) => state.hero.accessory);
  const physicalModifier =
    accessory && accessory.type === "physical attack" ? accessory.value : 0;
  const magicalModifier =
    accessory && accessory.type === "magical attack" ? accessory.value : 0;
  const primaryAttack =
    primary.type === "physical"
      ? primary.attack + physicalModifier
      : primary.attack + magicalModifier;
  const secondaryAttack =
    secondary.type === "physical"
      ? secondary.attack + physicalModifier
      : secondary.attack + magicalModifier;

  return (
    <div className={styles.main}>
      <div className={styles.option}>
        {primary && (
          <>
            <img src={primary.icon} alt={primary.name} />
            <span>{primary.name}</span>
            <span>{primaryAttack}</span>
            <button
              onClick={() =>
                onPrimary(primary.name, primary.type, primaryAttack)
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
            <span>{secondaryAttack}</span>
            <button
              onClick={() =>
                onSecondary(secondary.name, secondary.type, secondaryAttack)
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
