import styles from "./styles.module.css";

export const HeroStats = ({ hero, nextLevel }) => {
  let pdModifier,
    mdModifier,
    speedModifier = 0;
  pdModifier = hero.armor ? hero.armor.defense : 0;
  mdModifier = hero.helmet ? hero.helmet.defense : 0;
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
        <li>Physical Defense {hero.physicalDef + pdModifier}</li>
        <li>Magical Defense {hero.magicalDef + mdModifier}</li>
      </ul>
    </>
  );
};
