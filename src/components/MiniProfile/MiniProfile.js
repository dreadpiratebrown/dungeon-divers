import { useSelector } from "react-redux";
import styles from "./styles.module.css";

export const MiniProfile = ({ onBtnClick, opacity }) => {
  const hero = useSelector((state) => state.hero);
  const nextLevel = Math.round(Math.pow(hero.level / 0.2, 2));
  console.log(opacity);

  return (
    <div className={styles.miniProfile} style={{ opacity: `${opacity}` }}>
      <p className={styles.profileTop}>
        <span>{hero.name}</span>
        <span>Level {hero.level}</span>
        <span>Gold: {hero.gold}</span>
      </p>
      <div className={styles.profileIcons}>
        <img src={hero.img} alt="avatar" width="120" />
        <div className={styles.equipment}>
          {hero.primary ? (
            <img
              src={hero.primary.icon}
              alt="primary"
              width="40"
              title={hero.primary.name}
            />
          ) : (
            <></>
          )}
          {hero.secondary ? (
            <img
              src={hero.secondary.icon}
              alt="secondary"
              width="40"
              title={hero.secondary.name}
            />
          ) : (
            <></>
          )}
          {hero.armor ? (
            <img
              src={hero.armor.icon}
              alt="armor"
              width="40"
              title={hero.armor.name}
            />
          ) : (
            <></>
          )}
          {hero.helmet ? (
            <img
              src={hero.helmet.icon}
              alt="helmet"
              width="40"
              title={hero.helmet.name}
            />
          ) : (
            <></>
          )}
          {hero.accessory ? (
            <img
              src={hero.accessory.icon}
              alt="accessory"
              width="40"
              title={hero.accessory.name}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={styles.bar}>
        <div className={styles.barLabels}>
          <span>HP {hero.health}</span>
          <span>{hero.maxHealth}</span>
        </div>
        <div className={styles.max}>
          <div
            className={styles.value}
            style={{ width: `${(hero.health / hero.maxHealth) * 100}%` }}
          ></div>
        </div>
      </div>
      <div className={styles.bar}>
        <div className={styles.barLabels}>
          <span>XP {hero.exp}</span>
          <span>{nextLevel}</span>
        </div>
        <div className={styles.max}>
          <div
            className={styles.value}
            style={{ width: `${(hero.exp / nextLevel) * 100}%` }}
          ></div>
        </div>
      </div>
      <button className={styles.inventoryBtn} onClick={onBtnClick}>
        Inventory
      </button>
    </div>
  );
};
