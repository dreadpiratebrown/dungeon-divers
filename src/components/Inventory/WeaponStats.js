import styles from "./styles.module.css";

export const WeaponStats = (weapon) => {
  return (
    <div className={styles.weaponStats}>
      <ul>
        <li>{weapon.weapon.name}</li>
        <li>Attack: {weapon.weapon.attack}</li>
        <li>
          Type:{" "}
          {weapon.weapon.type.charAt(0).toUpperCase() +
            weapon.weapon.type.slice(1)}
        </li>
        <li>Range: {weapon.weapon.ranged === true ? "Ranged" : "Melee"}</li>
      </ul>
    </div>
  );
};
