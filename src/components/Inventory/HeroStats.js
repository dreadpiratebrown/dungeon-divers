import styles from "./styles.module.css";

export const HeroStats = ({ hero, nextLevel }) => {
  let pdModifier = 0,
    mdModifier = 0,
    speedModifier = 0;
  if (hero.accessory) {
    switch (hero.accessory.type) {
      case "speed": {
        speedModifier = hero.accessory.value;
        break;
      }
      case "physical defense": {
        pdModifier += hero.accessory.value;
        break;
      }
      case "magical defense": {
        mdModifier += hero.accessory.value;
        break;
      }
      default:
        break;
    }
  }
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
        <li>Speed {hero.speed + speedModifier}</li>
        <li>
          Physical Defense{" "}
          {hero.armor ? hero.armor.defense + pdModifier : pdModifier}
        </li>
        <li>
          Magical Defense{" "}
          {hero.helmet ? hero.helmet.defense + mdModifier : mdModifier}
        </li>
      </ul>
    </>
  );
};
