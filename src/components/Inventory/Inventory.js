import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  changePrimary,
  changeSecondary,
  changeArmor,
  changeHelmet,
  changeAccessory,
  changeItem,
} from "features/hero/heroSlice";
import { add, remove } from "features/inventory/inventorySlice";
import { AccessoryStats, ArmorStats, HeroStats, WeaponStats } from "components";
import { useItem } from "hooks";

export const Inventory = ({ onCloseClick }) => {
  const [item, setItem] = useState();
  const [showItem, setShowItem] = useState();
  const [itemUsed, setItemUsed] = useState();
  const dispatch = useDispatch();
  const hero = useSelector((state) => state.hero);
  const nextLevel = Math.round(Math.pow(hero.level / 0.3, 2));
  const inventory = useSelector((state) => state.inventory.items);

  const removePrimary = () => {
    dispatch(add(hero.primary));
    dispatch(changePrimary(null));
  };

  const removeSecondary = () => {
    dispatch(add(hero.secondary));
    dispatch(changeSecondary(null));
  };

  const removeArmor = () => {
    dispatch(add(hero.armor));
    dispatch(changeArmor(null));
  };

  const removeHelmet = () => {
    dispatch(add(hero.helmet));
    dispatch(changeHelmet(null));
  };

  const removeAccessory = () => {
    dispatch(add(hero.accessory));
    dispatch(changeAccessory(null));
  };

  const equipPrimary = (item) => {
    if (hero.primary) {
      removePrimary();
    }
    dispatch(changePrimary(item));
    dispatch(remove(item));
    setShowItem(null);
  };

  const equipSecondary = (item) => {
    if (hero.secondary) {
      removeSecondary();
    }
    dispatch(changeSecondary(item));
    dispatch(remove(item));
    setShowItem(null);
  };

  const equipItem = (item) => {
    if (item.item === "armor" && hero.armor) {
      removeArmor();
    }
    if (item.item === "helmet" && hero.helmet) {
      removeHelmet();
    }
    if (item.item === "accessory" && hero.accessory) {
      removeAccessory();
    }
    dispatch(changeItem(item));
    dispatch(remove(item));
    setShowItem(null);
  };

  useItem(itemUsed, setShowItem);

  return (
    <div className={styles.main}>
      <div className={styles.character}>
        <div className={styles.stats}>
          <HeroStats hero={hero} nextLevel={nextLevel} />
        </div>
        <div className={styles.equipment}>
          <ul>
            <li
              onMouseOver={() => setItem(hero.primary)}
              onMouseOut={() => setItem(null)}
            >
              Primary:
              {hero.primary && <img src={hero.primary.icon} alt="icon" />}
              {hero.primary && hero.primary.name}
              {hero.primary && <button onClick={removePrimary}>Unequip</button>}
            </li>
            <li
              onMouseOver={() => setItem(hero.secondary)}
              onMouseOut={() => setItem(null)}
            >
              Secondary:
              {hero.secondary && <img src={hero.secondary.icon} alt="icon" />}
              {hero.secondary && hero.secondary.name}
              {hero.secondary && (
                <button onClick={removeSecondary}>Unequip</button>
              )}
            </li>
            <li
              onMouseOver={() => setItem(hero.helmet)}
              onMouseOut={() => setItem(null)}
            >
              Helmet:
              {hero.helmet && <img src={hero.helmet.icon} alt="icon" />}
              {hero.helmet && hero.helmet.name}
              {hero.helmet && <button onClick={removeHelmet}>Unequip</button>}
            </li>
            <li
              onMouseOver={() => setItem(hero.armor)}
              onMouseOut={() => setItem(null)}
            >
              Armor:
              {hero.armor && <img src={hero.armor.icon} alt="icon" />}
              {hero.armor && hero.armor.name}
              {hero.armor && <button onClick={removeArmor}>Unequip</button>}
            </li>
            <li
              onMouseOver={() => setItem(hero.accessory)}
              onMouseOut={() => setItem(null)}
            >
              Accessory:
              {hero.accessory && <img src={hero.accessory.icon} alt="icon" />}
              {hero.accessory && hero.accessory.name}
              {hero.accessory && (
                <button onClick={removeAccessory}>Unequip</button>
              )}
            </li>
          </ul>
          {item && item.item === "weapon" && <WeaponStats weapon={item} />}
          {item && (item.item === "armor" || item.item === "helmet") && (
            <ArmorStats armor={item} />
          )}
          {item && item.item === "accessory" && (
            <AccessoryStats accessory={item} />
          )}
        </div>
      </div>
      <div className={styles.inventory}>
        <button className={styles.closeBtn} onClick={onCloseClick}>
          X
        </button>
        <h1>Inventory</h1>
        <p>Gold: {hero.gold}</p>
        <ul>
          {inventory.map((item, index) => (
            <li
              key={index}
              onMouseOver={() => setShowItem(item)}
              onMouseOut={() => setShowItem(null)}
            >
              <img src={item.icon} alt={item.name} />
              {item.name}
              {item.quantity > 1 && <> x {item.quantity}</>}
              {item.item === "weapon" && (
                <>
                  <button onClick={() => equipPrimary(item)}>
                    Equip Primary
                  </button>
                  <button onClick={() => equipSecondary(item)}>
                    Equip Secondary
                  </button>
                </>
              )}
              {item.item !== "weapon" && item.equippable && (
                <button onClick={() => equipItem(item)}>Equip</button>
              )}
              {item.usable && (
                <button onClick={() => setItemUsed(item)}>Use</button>
              )}
            </li>
          ))}
        </ul>
        {showItem && (
          <div className={styles.itemStats}>
            <ul>
              <li>{showItem.name}</li>
              {showItem.item === "weapon" && <li>Attack: {showItem.attack}</li>}
              {(showItem.item === "armor" || showItem.item === "helmet") && (
                <li>Defense: {showItem.defense}</li>
              )}
              {showItem.item !== "accessory" && !showItem.usable && (
                <li>
                  Type:{" "}
                  {showItem.type.charAt(0).toUpperCase() +
                    showItem.type.slice(1)}
                </li>
              )}
              {showItem.item === "accessory" && (
                <li>
                  {showItem.type.charAt(0).toUpperCase() +
                    showItem.type.slice(1)}
                  : {showItem.value}
                </li>
              )}
              {showItem.item === "weapon" && (
                <li>Range: {showItem.ranged === true ? "Ranged" : "Melee"}</li>
              )}
              {showItem.usable && <li>{showItem.description}</li>}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
