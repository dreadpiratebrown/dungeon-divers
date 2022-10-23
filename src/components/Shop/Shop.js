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
import { TableTooltip } from "./TableTooltip";
import { Tooltip } from "./Tooltip";
import { useSelector } from "react-redux";

export const Shop = () => {
  const hero = useSelector((state) => state.hero);
  const inventory = useSelector((state) => state.inventory.items);

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
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {swords.map((sword, index) => (
                  <tr key={index}>
                    <td>
                      <img src={sword.icon} alt={sword.name} />
                      {sword.name}
                    </td>
                    <td>
                      {sword.type} attack: {sword.attack},{" "}
                      {sword.ranged ? "ranged" : "melee"}
                    </td>
                    <td>{sword.buy}</td>
                    <td>
                      <button>Buy</button>
                    </td>
                  </tr>
                ))}
                {bows.map((bow, index) => (
                  <tr key={index}>
                    <td>
                      <img src={bow.icon} alt={bow.name} />
                      {bow.name}
                    </td>
                    <td>
                      {bow.type} attack: {bow.attack},{" "}
                      {bow.ranged ? "ranged" : "melee"}
                    </td>
                    <td>{bow.buy}</td>
                    <td>
                      <button>Buy</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {magic.map((spell, index) => (
                  <tr key={index}>
                    <td>
                      <img src={spell.icon} alt={spell.name} />
                      {spell.name}
                    </td>
                    <td>
                      {spell.type} defense: {spell.attack}
                    </td>
                    <td>{spell.buy}</td>
                    <td>
                      <button>Buy</button>
                    </td>
                  </tr>
                ))}
                {scrolls.map((scroll, index) => (
                  <tr key={index}>
                    <td>
                      <img src={scroll.icon} alt={scroll.name} />
                      {scroll.name}
                    </td>
                    <td>{scroll.description}</td>
                    <td>{scroll.buy}</td>
                    <td>
                      <button>Buy</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {armor.map((a, index) => (
                  <tr key={index}>
                    <td>
                      <img src={a.icon} alt={a.name} />
                      {a.name}
                    </td>
                    <td>
                      {a.type} defense: {a.defense}
                    </td>
                    <td>{a.buy}</td>
                    <td>
                      <button>Buy</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {helmets.map((helmet, index) => (
                  <tr key={index}>
                    <td>
                      <img src={helmet.icon} alt={helmet.name} />
                      {helmet.name}
                    </td>
                    <td>
                      {helmet.type} defense: {helmet.defense}
                    </td>
                    <td>{helmet.buy}</td>
                    <td>
                      <button>Buy</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel style={{ overflow: "auto", maxHeight: "70vh" }}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {boots.map((boot, index) => (
                  <tr key={index}>
                    <td>
                      <img src={boot.icon} alt={boot.name} />
                      {boot.name}
                    </td>
                    <td>
                      {boot.type}: {boot.value}
                    </td>
                    <td>{boot.buy}</td>
                    <td>
                      <button>Buy</button>
                    </td>
                  </tr>
                ))}
                {gloves.map((glove, index) => (
                  <tr key={index}>
                    <td>
                      <img src={glove.icon} alt={glove.name} />
                      {glove.name}
                    </td>
                    <td>
                      {glove.type}: {glove.value}
                    </td>
                    <td>{glove.buy}</td>
                    <td>
                      <button>Buy</button>
                    </td>
                  </tr>
                ))}
                {bracelets.map((bracelet, index) => (
                  <tr key={index}>
                    <td>
                      <img src={bracelet.icon} alt={bracelet.name} />
                      {bracelet.name}
                    </td>
                    <td>
                      {bracelet.type}: {bracelet.value}
                    </td>
                    <td>{bracelet.buy}</td>
                    <td>
                      <button>Buy</button>
                    </td>
                  </tr>
                ))}
                {necklaces.map((necklace, index) => (
                  <tr key={index}>
                    <td>
                      <img src={necklace.icon} alt={necklace.name} />
                      {necklace.name}
                    </td>
                    <td>
                      {necklace.type}: {necklace.value}
                    </td>
                    <td>{necklace.buy}</td>
                    <td>
                      <button>Buy</button>
                    </td>
                  </tr>
                ))}
                {jewelry.map((jewel, index) => (
                  <tr key={index}>
                    <td>
                      <img src={jewel.icon} alt={jewel.name} />
                      {jewel.name}
                    </td>
                    <td>
                      {jewel.type}: {jewel.value}
                    </td>
                    <td>{jewel.buy}</td>
                    <td>
                      <button>Buy</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabPanel>
        </Tabs>
      </div>
      <div className={styles.inventory}>
        <p>Gold: {hero.gold}</p>
        <h2>Equipment</h2>
        <ul>
          <Tooltip item={hero.primary}>
            Primary:
            {hero.primary && (
              <>
                <img src={hero.primary.icon} alt="icon" /> {hero.primary.name}
              </>
            )}
          </Tooltip>
          <Tooltip item={hero.secondary}>
            Secondary:
            {hero.secondary && (
              <>
                <img src={hero.secondary.icon} alt="icon" />{" "}
                {hero.secondary.name}
              </>
            )}
          </Tooltip>
          <Tooltip item={hero.helmet}>
            Helmet:
            {hero.helmet && (
              <>
                <img src={hero.helmet.icon} alt="icon" /> {hero.helmet.name}
              </>
            )}
          </Tooltip>
          <Tooltip item={hero.armor}>
            Armor:
            {hero.armor && (
              <>
                <img src={hero.armor.icon} alt="icon" /> {hero.armor.name}
              </>
            )}
          </Tooltip>
          <Tooltip item={hero.accessory}>
            Accessory:
            {hero.accessory && (
              <>
                <img src={hero.accessory.icon} alt="icon" />
                {hero.accessory.name}
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
            </Tooltip>
          ))}
        </ul>
      </div>
    </div>
  );
};
