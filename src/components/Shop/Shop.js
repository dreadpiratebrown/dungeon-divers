import styles from "./styles.module.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  armor,
  boots,
  bows,
  bracelets,
  gloves,
  helmets,
  jewelry,
  magic,
  necklaces,
  scrolls,
  swords,
} from "shared";
import { Tooltip } from "./Tooltip";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseGold,
  increaseGold,
  changePrimary,
  changeSecondary,
  changeArmor,
  changeHelmet,
  changeAccessory,
} from "features/hero/heroSlice";
import { add, remove } from "features/inventory/inventorySlice";
import uuid from "react-uuid";

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th></th>
      </tr>
    </thead>
  );
};

const WeaponRow = (weapon) => {
  const dispatch = useDispatch();

  const buyItem = (item) => {
    dispatch(decreaseGold(item.buy));
    const tempItem = { ...item };
    if (!tempItem.id) {
      tempItem.id = uuid();
    }
    dispatch(add(tempItem));
  };

  return (
    <tr>
      <td>
        <img src={weapon.weapon.icon} alt={weapon.weapon.name} />
        {weapon.weapon.name}
      </td>
      <td>
        {weapon.weapon.type} attack: {weapon.weapon.attack},{" "}
        {weapon.weapon.ranged ? "ranged" : "melee"}
      </td>
      <td>{weapon.weapon.buy}</td>
      <td>
        <button onClick={() => buyItem(weapon.weapon)}>Buy</button>
      </td>
    </tr>
  );
};

const ArmorRow = (armor) => {
  const dispatch = useDispatch();

  const buyItem = (item) => {
    dispatch(decreaseGold(item.buy));
    const tempItem = { ...item };
    if (!tempItem.id) {
      tempItem.id = uuid();
    }
    dispatch(add(tempItem));
  };

  return (
    <tr>
      <td>
        <img src={armor.armor.icon} alt={armor.armor.name} />
        {armor.armor.name}
      </td>
      <td>
        {armor.armor.type} defense: {armor.armor.defense}
      </td>
      <td>{armor.armor.buy}</td>
      <td>
        <button onClick={() => buyItem(armor.armor)}>Buy</button>
      </td>
    </tr>
  );
};

const ScrollRow = (scroll) => {
  const dispatch = useDispatch();

  const buyItem = (item) => {
    dispatch(decreaseGold(item.buy));
    const tempItem = { ...item };
    if (!tempItem.id) {
      tempItem.id = uuid();
    }
    dispatch(add(tempItem));
  };
  return (
    <tr>
      <td>
        <img src={scroll.scroll.icon} alt={scroll.scroll.name} />
        {scroll.scroll.name}
      </td>
      <td>{scroll.scroll.description}</td>
      <td>{scroll.scroll.buy}</td>
      <td>
        <button onClick={() => buyItem(scroll.scroll)}>Buy</button>
      </td>
    </tr>
  );
};

const AccessoryRow = (accessory) => {
  const dispatch = useDispatch();

  const buyItem = (item) => {
    dispatch(decreaseGold(item.buy));
    const tempItem = { ...item };
    if (!tempItem.id) {
      tempItem.id = uuid();
    }
    dispatch(add(tempItem));
  };
  return (
    <tr>
      <td>
        <img src={accessory.accessory.icon} alt={accessory.accessory.name} />
        {accessory.accessory.name}
      </td>
      <td>
        {accessory.accessory.type}: {accessory.accessory.value}
      </td>
      <td>{accessory.accessory.buy}</td>
      <td>
        <button onClick={() => buyItem(accessory.accessory)}>Buy</button>
      </td>
    </tr>
  );
};

export const Shop = ({ onCloseClick }) => {
  const hero = useSelector((state) => state.hero);
  const inventory = useSelector((state) => state.inventory.items);
  const dispatch = useDispatch();

  const sellItem = (item) => {
    dispatch(increaseGold(item.sell));
    dispatch(remove(item));
  };

  const unequip = (item) => {
    switch (item) {
      case "primary": {
        dispatch(add(hero.primary));
        dispatch(changePrimary(null));

        break;
      }
      case "secondary": {
        dispatch(add(hero.secondary));
        dispatch(changeSecondary(null));

        break;
      }
      case "armor": {
        dispatch(add(hero.armor));
        dispatch(changeArmor(null));

        break;
      }
      case "helmet": {
        dispatch(add(hero.helmet));
        dispatch(changeHelmet(null));

        break;
      }
      case "accessory": {
        dispatch(add(hero.accessory));
        dispatch(changeAccessory(null));

        break;
      }

      default:
        break;
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.shop}>
        <h1>Shop</h1>
        <Tabs>
          <TabList>
            <Tab>Weapons</Tab>
            <Tab>Magic</Tab>
            <Tab>Armor</Tab>
            <Tab>Helmets</Tab>
            <Tab>Accessories</Tab>
          </TabList>

          <TabPanel>
            <table>
              <TableHeader />
              <tbody>
                {swords.map((sword, index) => (
                  <WeaponRow weapon={sword} key={index} />
                ))}
                {bows.map((bow, index) => (
                  <WeaponRow weapon={bow} key={index} />
                ))}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <table>
              <TableHeader />
              <tbody>
                {magic.map((spell, index) => (
                  <WeaponRow weapon={spell} key={index} />
                ))}
                {scrolls.map((scroll, index) => (
                  <ScrollRow scroll={scroll} key={index} />
                ))}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <table>
              <TableHeader />
              <tbody>
                {armor.map((a, index) => (
                  <ArmorRow armor={a} key={index} />
                ))}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <table>
              <TableHeader />
              <tbody>
                {helmets.map((helmet, index) => (
                  <ArmorRow armor={helmet} key={index} />
                ))}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel style={{ overflow: "auto", maxHeight: "70vh" }}>
            <table>
              <TableHeader />
              <tbody>
                {boots.map((boot, index) => (
                  <AccessoryRow accessory={boot} key={index} />
                ))}
                {gloves.map((glove, index) => (
                  <AccessoryRow accessory={glove} key={index} />
                ))}
                {bracelets.map((bracelet, index) => (
                  <AccessoryRow accessory={bracelet} key={index} />
                ))}
                {necklaces.map((necklace, index) => (
                  <AccessoryRow accessory={necklace} key={index} />
                ))}
                {jewelry.map((jewel, index) => (
                  <AccessoryRow accessory={jewel} key={index} />
                ))}
              </tbody>
            </table>
          </TabPanel>
        </Tabs>
      </div>
      <div className={styles.inventory}>
        <button className={styles.closeBtn} onClick={onCloseClick}>
          X
        </button>
        <p>Gold: {hero.gold}</p>
        <h2>Equipment</h2>
        <ul>
          <Tooltip item={hero.primary}>
            Primary:
            {hero.primary && (
              <>
                <img src={hero.primary.icon} alt="icon" /> {hero.primary.name}
                <button onClick={() => unequip("primary")}>Unequip</button>
              </>
            )}
          </Tooltip>
          <Tooltip item={hero.secondary}>
            Secondary:
            {hero.secondary && (
              <>
                <img src={hero.secondary.icon} alt="icon" />{" "}
                {hero.secondary.name}
                <button onClick={() => unequip("secondary")}>Unequip</button>
              </>
            )}
          </Tooltip>
          <Tooltip item={hero.helmet}>
            Helmet:
            {hero.helmet && (
              <>
                <img src={hero.helmet.icon} alt="icon" /> {hero.helmet.name}
                <button onClick={() => unequip("helmet")}>Unequip</button>
              </>
            )}
          </Tooltip>
          <Tooltip item={hero.armor}>
            Armor:
            {hero.armor && (
              <>
                <img src={hero.armor.icon} alt="icon" /> {hero.armor.name}
                <button onClick={() => unequip("armor")}>Unequip</button>
              </>
            )}
          </Tooltip>
          <Tooltip item={hero.accessory}>
            Accessory:
            {hero.accessory && (
              <>
                <img src={hero.accessory.icon} alt="icon" />
                {hero.accessory.name}
                <button onClick={() => unequip("accessory")}>Unequip</button>
              </>
            )}
          </Tooltip>
        </ul>
        <h2>Inventory</h2>
        <ul>
          {inventory.map((item, index) => (
            <Tooltip key={index} item={item}>
              <img src={item.icon} alt={item.name} />
              {item.name}
              <button onClick={() => sellItem(item)}>Sell ({item.sell})</button>
            </Tooltip>
          ))}
        </ul>
      </div>
    </div>
  );
};
