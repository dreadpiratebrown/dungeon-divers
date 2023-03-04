import { useState } from "react";
import styles from "./styles.module.css";

export const Tooltip = ({ item, children }) => {
  const [active, setActive] = useState(false);

  const showTip = () => {
    setActive(true);
  };

  const hideTip = () => {
    setActive(false);
  };

  return (
    <li onMouseEnter={showTip} onMouseLeave={hideTip}>
      {children}

      {active && item && (
        <div className={styles.itemStats}>
          <ul>
            <li>{item.name}</li>
            {item.item === "weapon" && <li>Attack: {item.attack}</li>}
            {(item.item === "armor" || item.item === "helmet") && (
              <li>Defense: {item.defense}</li>
            )}
            {item.item !== "accessory" &&
              item.item !== "misc" &&
              !item.usable && (
                <li>
                  Type: {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </li>
              )}
            {item.item === "accessory" && (
              <li>
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}:{" "}
                {item.value}
              </li>
            )}
            {item.item === "weapon" && (
              <li>Range: {item.ranged === true ? "Ranged" : "Melee"}</li>
            )}
            {(item.usable || item.item === "misc") && (
              <li>{item.description}</li>
            )}
          </ul>
        </div>
      )}
    </li>
  );
};
