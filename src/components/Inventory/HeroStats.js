import styles from "./styles.module.css";

export const HeroStats = ({ hero, nextLevel }) => {
  return (
    <>
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
        <li>
          Magical Defense{" "}
          {hero.helmet ? hero.magicalDef + hero.helmet.defense : 0}
        </li>
      </ul>
    </>
  );
};
