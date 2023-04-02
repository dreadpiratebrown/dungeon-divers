import { useDispatch, useSelector } from "react-redux";
import { addFame, addGold, playAgain } from "features/app/appSlice";
import { resetHero } from "features/hero/heroSlice";
import { resetInventory } from "features/inventory/inventorySlice";
import { resetMap } from "features/map/mapSlice";
import { resetQuests } from "features/quest/questSlice";
import styles from "./styles.module.css";
import tombstone from "../../images/tombstone.png";

export const EndMenu = ({ winner, onStartClick }) => {
  const gold = useSelector((state) => state.hero.gold);
  const steps = useSelector((state) => state.hero.stepsTaken);
  const fiends = useSelector((state) => state.hero.fiendsKilled);
  const dispatch = useDispatch();

  dispatch(addGold(gold));

  const handlePlayAgain = () => {
    dispatch(playAgain());
    dispatch(resetHero());
    dispatch(resetInventory());
    dispatch(resetMap());
    dispatch(resetQuests());
    onStartClick();
  };

  return (
    <div className={styles.main}>
      <img src={tombstone} alt="tombstone" />
      <h1 className={styles.text}>
        You have died. The dungeon claims another victim.
      </h1>
      <p className={styles.text}>
        Gold: {gold}
        <br />
        Steps Taken: {steps}
        <br />
        Fiends Killed: {fiends}
      </p>
      <button className={styles.startButton} onClick={handlePlayAgain}>
        Play Again
      </button>
    </div>
  );
};
