import styles from "./styles.module.css";
import { avatars } from "shared";
import { useDispatch } from "react-redux";
import { setName, setImage } from "features/hero/heroSlice";
import { useState } from "react";

export const CharacterBuilder = ({ onStartClick, newGame }) => {
  const [charName, setCharName] = useState("");
  const [charImg, setCharImg] = useState("");

  const dispatch = useDispatch();

  const handleSetImage = (path) => {
    setCharImg(path);
    dispatch(setImage(path));
  };

  const handleSetName = (e) => {
    setCharName(e.target.value);
    dispatch(setName(e.target.value));
  };

  return (
    <div className={styles.main}>
      <h1>Choose an avatar:</h1>
      <ul className={styles.avatarList}>
        {avatars.map((avatar) => (
          <li className={styles.avatar} key={avatar.id}>
            <input
              type="radio"
              name="avatars"
              id={`avatar${avatar.id}`}
              onChange={() => handleSetImage(avatar.file)}
            />
            <label htmlFor={`avatar${avatar.id}`}>
              <img src={avatar.file} alt={avatar.alt} />
            </label>
          </li>
        ))}
      </ul>
      <label htmlFor="name" className={styles.nameLabel}>
        Name your character:
      </label>
      <input
        type="text"
        id="name"
        maxLength="30"
        value={charName}
        onChange={handleSetName}
        autoComplete="off"
      />
      <button onClick={onStartClick} className={styles.startButton}>
        Venture Forth!
      </button>
    </div>
  );
};
