import styles from "./styles.module.css";
import { quests } from "shared";
import { useDispatch, useSelector } from "react-redux";
import { addQuest, removeQuest } from "features/quest/questSlice";
import { increaseGold } from "features/hero/heroSlice";
import { removeBulk } from "features/inventory/inventorySlice";

export const Quests = ({ onCloseClick }) => {
  const acceptedQuests = useSelector((state) => state.quest.quests);
  const inventory = useSelector((state) => state.inventory.items);
  const level = useSelector((state) => state.hero.level);
  const dispatch = useDispatch();
  const accept = (uuid) => {
    dispatch(addQuest(uuid));
  };
  const resolve = (uuid, reward, item, quantity) => {
    dispatch(increaseGold(reward));
    dispatch(removeQuest(uuid));
    dispatch(removeBulk({ id: item, quantity }));
  };
  const range = { low: level - 1, high: level + 1 };
  const questPool = quests.filter(
    (q) => q.level >= range.low && q.level <= range.high
  );
  return (
    <div className={styles.main}>
      <button className={styles.closeBtn} onClick={onCloseClick}>
        X
      </button>
      <h1>Quests</h1>
      {questPool.map((quest) => {
        const index = acceptedQuests.findIndex((q) => q === quest.id);
        const hasItem = inventory.findIndex((item) => item.id === quest.goalId);
        const hasEnough =
          hasItem >= 0 && inventory[hasItem].quantity >= quest.goal;
        return (
          <div className={styles.quest} key={quest.id}>
            <img src={quest.icon} alt="quest icon" />
            <div className={styles.questInfo}>
              <h2>{quest.name}</h2>
              <p>
                {quest.description}
                <br />
                Level: {quest.level} | Reward: {quest.reward} gold
              </p>
            </div>
            <div className={styles.questButtons}>
              {index < 0 ? (
                <button
                  className={styles.actionBtn}
                  onClick={() => accept(quest.id)}
                >
                  Accept
                </button>
              ) : (
                <button
                  className={styles.actionBtn}
                  disabled={hasEnough ? "" : "disabled"}
                  onClick={() =>
                    resolve(quest.id, quest.reward, quest.goalId, quest.goal)
                  }
                >
                  {hasEnough ? "Turn In" : "In Progress"}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
