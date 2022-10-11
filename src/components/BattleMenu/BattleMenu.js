import styles from "./styles.module.css";
import { useSelector } from "react-redux";

export const BattleMenu = ({ onPrimary, onSecondary, onFleeClick }) => {
  const primary = useSelector((state) => state.hero.primary);
  const secondary = useSelector((state) => state.hero.secondary);
  const accessory = useSelector((state) => state.hero.accessory);
  const physicalModifier =
    accessory && accessory.type === "physical attack" ? accessory.value : 0;
  const magicalModifier =
    accessory && accessory.type === "magical attack" ? accessory.value : 0;
  let primaryAttack = 0 + physicalModifier;
  let secondaryAttack = 0 + physicalModifier;
  if (primary && primary.type === "physical") {
    primaryAttack = primary.attack + physicalModifier;
  } else if (primary && primary.type === "magical") {
    primaryAttack = primary.attack + magicalModifier;
  }
  if (secondary && secondary.type === "physical") {
    secondaryAttack = secondary.attack + physicalModifier;
  } else if (secondary && secondary.type === "magical") {
    secondaryAttack = secondary.attack + magicalModifier;
  }

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
      <div className={styles.otherOptions}>
        <button onClick={onFleeClick}>Flee</button>
      </div>
    </div>
  );
};
