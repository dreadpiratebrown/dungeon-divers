import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  changePrimary,
  changeSecondary,
  changeArmor,
  changeItem,
} from "features/hero/heroSlice";
import { add, remove } from "features/inventory/inventorySlice";

export const Inventory = () => {
  const [weapon, setWeapon] = useState();
  const [armor, setArmor] = useState();
  const [showItem, setShowItem] = useState();
  const dispatch = useDispatch();
  const hero = useSelector((state) => state.hero);
  const nextLevel = Math.round(Math.pow(hero.level / 0.3, 2));
  const inventory = useSelector((state) => state.inventory.items);

  const showWeaponStats = (equipment) => {
    setWeapon(equipment);
  };

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
    dispatch(changeItem(item));
    dispatch(remove(item));
    setShowItem(null);
  };

  return (
    <div className={styles.main}>
      <div className={styles.character}>
        <div className={styles.stats}>
          <img src={hero.img} alt={hero.name} />
          <ul className={styles.info}>
            <li>
              Level {hero.level} {hero.name}
            </li>
            <li>
              HP {hero.health} / {hero.maxHealth}
            </li>
            <li>
              Exp {hero.exp} - Next Level {nextLevel - hero.exp}
            </li>
            <li>Speed {hero.speed}</li>
            <li>
              Physical Defense{" "}
              {hero.armor ? hero.physicalDef + hero.armor.defense : 0}
            </li>
            <li>Magical Defense {hero.magicalDef}</li>
          </ul>
        </div>
        <div className={styles.equipment}>
          <ul>
            <li
              onMouseOver={() => showWeaponStats(hero.primary)}
              onMouseOut={() => showWeaponStats(null)}
            >
              Primary:
              {hero.primary && <img src={hero.primary.icon} alt="icon" />}
              {hero.primary && hero.primary.name}
              {hero.primary && <button onClick={removePrimary}>Unequip</button>}
            </li>
            <li
              onMouseOver={() => showWeaponStats(hero.secondary)}
              onMouseOut={() => showWeaponStats(null)}
            >
              Secondary:
              {hero.secondary && <img src={hero.secondary.icon} alt="icon" />}
              {hero.secondary && hero.secondary.name}
              {hero.secondary && (
                <button onClick={removeSecondary}>Unequip</button>
              )}
            </li>
            <li>Helmet:</li>
            <li
              onMouseOver={() => setArmor(hero.armor)}
              onMouseOut={() => setArmor(null)}
            >
              Armor:
              {hero.armor && <img src={hero.armor.icon} alt="icon" />}
              {hero.armor && hero.armor.name}
              {hero.armor && <button onClick={removeArmor}>Unequip</button>}
            </li>
            <li>Accessory:</li>
          </ul>
          {weapon && (
            <div className={styles.weaponStats}>
              <ul>
                <li>{weapon.name}</li>
                <li>Attack: {weapon.attack}</li>
                <li>
                  Type:{" "}
                  {weapon.type.charAt(0).toUpperCase() + weapon.type.slice(1)}
                </li>
                <li>Range: {weapon.ranged === true ? "Ranged" : "Melee"}</li>
              </ul>
            </div>
          )}
          {armor && (
            <div className={styles.weaponStats}>
              <ul>
                <li>{armor.name}</li>
                <li>Defense: {armor.defense}</li>
                <li>
                  Type:{" "}
                  {armor.type.charAt(0).toUpperCase() + armor.type.slice(1)}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className={styles.inventory}>
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
              {item.item !== "weapon" && (
                <button onClick={() => equipItem(item)}>Equip</button>
              )}
            </li>
          ))}
        </ul>
        {showItem && showItem.item === "weapon" && (
          <div className={styles.itemStats}>
            <ul>
              <li>{showItem.name}</li>
              <li>Attack: {showItem.attack}</li>
              <li>
                Type:{" "}
                {showItem.type.charAt(0).toUpperCase() + showItem.type.slice(1)}
              </li>
              <li>Range: {showItem.ranged === true ? "Ranged" : "Melee"}</li>
            </ul>
          </div>
        )}
        {showItem && showItem.item === "armor" && (
          <div className={styles.itemStats}>
            <ul>
              <li>{showItem.name}</li>
              <li>Defense: {showItem.defense}</li>
              <li>
                Type:{" "}
                {showItem.type.charAt(0).toUpperCase() + showItem.type.slice(1)}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
