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

const WeaponRow = ({ weapon, gold }) => {
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
        <img src={weapon.icon} alt={weapon.name} />
        {weapon.name}
      </td>
      <td>
        {weapon.type} attack: {weapon.attack},{" "}
        {weapon.ranged ? "ranged" : "melee"}
      </td>
      <td>{weapon.buy}</td>
      <td>
        <button
          onClick={() => buyItem(weapon)}
          disabled={weapon.buy > gold ? "disabled" : ""}
        >
          Buy
        </button>
      </td>
    </tr>
  );
};

const ArmorRow = ({ armor, gold }) => {
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
        <img src={armor.icon} alt={armor.name} />
        {armor.name}
      </td>
      <td>
        {armor.type} defense: {armor.defense}
      </td>
      <td>{armor.buy}</td>
      <td>
        <button
          onClick={() => buyItem(armor)}
          disabled={armor.buy > gold ? "disabled" : ""}
        >
          Buy
        </button>
      </td>
    </tr>
  );
};

const ScrollRow = ({ scroll, gold }) => {
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
        <img src={scroll.icon} alt={scroll.name} />
        {scroll.name}
      </td>
      <td>{scroll.description}</td>
      <td>{scroll.buy}</td>
      <td>
        <button
          onClick={() => buyItem(scroll)}
          disabled={scroll.buy > gold ? "disabled" : ""}
        >
          Buy
        </button>
      </td>
    </tr>
  );
};

const AccessoryRow = ({ accessory, gold }) => {
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
        <img src={accessory.icon} alt={accessory.name} />
        {accessory.name}
      </td>
      <td>
        {accessory.type}: {accessory.value}
      </td>
      <td>{accessory.buy}</td>
      <td>
        <button
          onClick={() => buyItem(accessory)}
          disabled={accessory.buy > gold ? "disabled" : ""}
        >
          Buy
        </button>
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
                  <WeaponRow weapon={sword} key={index} gold={hero.gold} />
                ))}
                {bows.map((bow, index) => (
                  <WeaponRow weapon={bow} key={index} gold={hero.gold} />
                ))}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <table>
              <TableHeader />
              <tbody>
                {magic.map((spell, index) => (
                  <WeaponRow weapon={spell} key={index} gold={hero.gold} />
                ))}
                {scrolls.map((scroll, index) => (
                  <ScrollRow scroll={scroll} key={index} gold={hero.gold} />
                ))}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <table>
              <TableHeader />
              <tbody>
                {armor.map((a, index) => (
                  <ArmorRow armor={a} key={index} gold={hero.gold} />
                ))}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <table>
              <TableHeader />
              <tbody>
                {helmets.map((helmet, index) => (
                  <ArmorRow armor={helmet} key={index} gold={hero.gold} />
                ))}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel style={{ overflow: "auto", maxHeight: "70vh" }}>
            <table>
              <TableHeader />
              <tbody>
                {boots.map((boot, index) => (
                  <AccessoryRow accessory={boot} key={index} gold={hero.gold} />
                ))}
                {gloves.map((glove, index) => (
                  <AccessoryRow
                    accessory={glove}
                    key={index}
                    gold={hero.gold}
                  />
                ))}
                {bracelets.map((bracelet, index) => (
                  <AccessoryRow
                    accessory={bracelet}
                    key={index}
                    gold={hero.gold}
                  />
                ))}
                {necklaces.map((necklace, index) => (
                  <AccessoryRow
                    accessory={necklace}
                    key={index}
                    gold={hero.gold}
                  />
                ))}
                {jewelry.map((jewel, index) => (
                  <AccessoryRow
                    accessory={jewel}
                    key={index}
                    gold={hero.gold}
                  />
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
              {item.quantity > 1 && <> x {item.quantity}</>}
              <button onClick={() => sellItem(item)}>Sell ({item.sell})</button>
            </Tooltip>
          ))}
        </ul>
      </div>
    </div>
  );
};
