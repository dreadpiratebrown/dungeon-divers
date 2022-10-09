import styles from "./styles.module.css";

export const AccessoryStats = (accessory) => {
  return (
    <div className={styles.weaponStats}>
      <ul>
        <li>{accessory.accessory.name}</li>
        {accessory.accessory.type === "speed" && (
          <li>Speed: {accessory.accessory.value}</li>
        )}
        {accessory.accessory.type === "physical attack" && (
          <li>Physical Attack: {accessory.accessory.value}</li>
        )}
        {accessory.accessory.type === "magical attack" && (
          <li>Magical Attack: {accessory.accessory.value}</li>
        )}
        {accessory.accessory.type === "physical defense" && (
          <li>Physical Defense: {accessory.accessory.value}</li>
        )}
        {accessory.accessory.type === "magical defense" && (
          <li>Magical Defense: {accessory.accessory.value}</li>
        )}
      </ul>
    </div>
  );
};
