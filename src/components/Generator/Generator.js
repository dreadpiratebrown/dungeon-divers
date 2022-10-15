import { useState } from "react";
import styles from "./styles.module.css";

export const Generator = () => {
  const [name, setName] = useState();
  const [level, setLevel] = useState();
  const [health, setHealth] = useState();
  const [primary, setPrimary] = useState();
  const [secondary, setSecondary] = useState();
  const [physical, setPhysical] = useState();
  const [magical, setMagical] = useState();
  const [speed, setSpeed] = useState();
  const [exp, setExp] = useState();
  const [gold, setGold] = useState();

  const generate = () => {
    fetch(`https://rolz.org/api/?${level}d8.json`)
      .then((response) => response.json())
      .then((data) => setHealth(data.result));

    fetch(`https://rolz.org/api/?${Math.ceil(level / 10)}d20.json`)
      .then((response) => response.json())
      .then((data) => setPrimary(data.result + parseInt(level)));

    fetch(`https://rolz.org/api/?${Math.ceil(level / 10)}d20.json`)
      .then((response) => response.json())
      .then((data) => setSecondary(data.result + parseInt(level)));

    fetch(`https://rolz.org/api/?${Math.ceil(level / 2)}d12.json`)
      .then((response) => response.json())
      .then((data) => setPhysical(data.result));

    fetch(`https://rolz.org/api/?${Math.ceil(level / 2)}d12.json`)
      .then((response) => response.json())
      .then((data) => setMagical(data.result));

    fetch(`https://rolz.org/api/?${Math.floor(Math.sqrt(level))}d4.json`)
      .then((response) => response.json())
      .then((data) => setSpeed(data.result));

    fetch(`https://rolz.org/api/?${level}d6.json`)
      .then((response) => response.json())
      .then((data) => setExp(data.result));

    fetch(`https://rolz.org/api/?${level}d6.json`)
      .then((response) => response.json())
      .then((data) => setGold(data.result));
  };

  return (
    <div className={styles.main}>
      <h1>Monster Generator</h1>
      <ul>
        <li>
          <label htmlFor="name">Name</label>
          <input id="name" onChange={(e) => setName(e.target.value)} />
        </li>
        <li>
          <label htmlFor="level">Level</label>
          <input id="level" onChange={(e) => setLevel(e.target.value)} />
        </li>
        <li>
          <label htmlFor="health">Health</label>
          <input id="health" value={health} />
        </li>
        <li>
          <label htmlFor="primary">Primary Attack</label>
          <input id="primary" value={primary} />
        </li>
        <li>
          <label htmlFor="secondary">Secondary Attack</label>
          <input id="secondary" value={secondary} />
        </li>
        <li>
          <label htmlFor="physical">Physical Defense</label>
          <input id="physical" value={physical} />
        </li>
        <li>
          <label htmlFor="magical">Magical Defense</label>
          <input id="magical" value={magical} />
        </li>
        <li>
          <label htmlFor="speed">Speed</label>
          <input id="speed" value={speed} />
        </li>
        <li>
          <label htmlFor="exp">Exp</label>
          <input id="exp" value={exp} />
        </li>
        <li>
          <label htmlFor="gold">Gold</label>
          <input id="gold" value={gold} />
        </li>
        <li>
          <button onClick={generate}>Generate</button>
        </li>
      </ul>
    </div>
  );
};
