import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { resetApp } from "features/app/appSlice";
import { resetHero } from "features/hero/heroSlice";
import { resetInventory } from "features/inventory/inventorySlice";
import { resetMap } from "features/map/mapSlice";
import { resetQuests } from "features/quest/questSlice";
import { useEffect } from "react";
import { viewIntroText } from "features/app/appSlice";
import Logo from "../../images/logo.png";

export const Office = ({ onStartClick, newGame }) => {
  const introViewed = useSelector((state) => state.app.introTextViewed);
  const gold = useSelector((state) => state.app.goldEarned);
  const fame = useSelector((state) => state.app.fameEarned);
  const dispatch = useDispatch();

  useEffect(() => {
    if (newGame) {
      dispatch(resetApp());
      dispatch(resetHero());
      dispatch(resetInventory());
      dispatch(resetMap());
      dispatch(resetQuests());
    }
  }, [newGame]);

  return (
    <div className={styles.main} data-testid="office">
      <img src={Logo} alt="Dungeon Divers" className={styles.logo} />
      {!introViewed && (
        <>
          <h1 className={styles.text}>Welcome adventurer!</h1>
          <p className={styles.text}>
            You are the proprietor of Dungeon Divers, Inc., a new business
            dedicated to one thing: prowling the deepest, darkest dungeons in
            search of treasure and fame. It's dangerous work at best, though,
            which is why you're going to hire heroes to do your dirty work for
            you.
          </p>
          <p className={styles.text}>
            Earn gold, find treasure, increase your fame, and make Dungeon
            Divers the best adventuring firm in town!
          </p>
          <button
            onClick={() => dispatch(viewIntroText())}
            data-testid="gotitBtn"
            className={styles.actionBtn}
          >
            Got It
          </button>
        </>
      )}
      {introViewed && (
        <>
          <p>
            Gold: {gold} Fame: {fame}{" "}
          </p>
          <button
            onClick={onStartClick}
            data-testid="startBtn"
            className={styles.actionBtn}
          >
            Start Game
          </button>
        </>
      )}
    </div>
  );
};
