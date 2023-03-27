import styles from "./styles.module.css";
import { quests } from "shared";
import { useDispatch, useSelector } from "react-redux";
import { addQuest, completeQuest } from "features/quest/questSlice";
import { increaseGold } from "features/hero/heroSlice";
import { removeBulk } from "features/inventory/inventorySlice";
import { Bar } from "components/Bar";

export const Quests = ({ onCloseClick }) => {
  const acceptedQuests = useSelector((state) => state.quest.quests);
  const completedQuests = useSelector((state) => state.quest.completedQuests);
  const inventory = useSelector((state) => state.inventory.items);
  const dispatch = useDispatch();
  const accept = (uuid) => {
    dispatch(addQuest(uuid));
  };
  const resolve = (uuid, reward, item, quantity) => {
    dispatch(increaseGold(reward));
    dispatch(completeQuest(uuid));
    dispatch(removeBulk({ id: item, quantity }));
  };
  const questPool = quests
    .filter((quest) => !completedQuests.includes(quest.id))
    .slice(0, 5);
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
              ) : hasEnough ? (
                <button
                  className={styles.actionBtn}
                  disabled={hasEnough ? "" : "disabled"}
                  onClick={() =>
                    resolve(quest.id, quest.reward, quest.goalId, quest.goal)
                  }
                >
                  {hasEnough ? "Turn In" : "In Progress"}
                </button>
              ) : (
                <Bar
                  label={`${
                    hasItem >= 0
                      ? inventory[hasItem].quantity
                        ? inventory[hasItem].quantity
                        : 1
                      : 0
                  }/${quest.goal}`}
                  value={
                    hasItem >= 0
                      ? inventory[hasItem].quantity
                        ? inventory[hasItem].quantity
                        : 1
                      : 0
                  }
                  maxValue={quest.goal}
                  showValueLabel={false}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
