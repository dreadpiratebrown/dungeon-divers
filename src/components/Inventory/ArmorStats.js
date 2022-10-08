import styles from "./styles.module.css";

export const ArmorStats = (armor) => {
  return (
    <div className={styles.weaponStats}>
      <ul>
        <li>{armor.armor.name}</li>
        <li>Defense: {armor.armor.defense}</li>
        <li>
          Type:{" "}
          {armor.armor.type.charAt(0).toUpperCase() + armor.armor.type.slice(1)}
        </li>
      </ul>
    </div>
  );
};
