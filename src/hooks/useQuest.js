import { useEffect, useState } from "react";
import { quests, questItems } from "shared";
import { useSelector } from "react-redux";

export const useQuest = (fiend) => {
  const [item, setItem] = useState(null);
  const [haveNum, setHaveNum] = useState();
  const [needNum, setNeedNum] = useState();
  const heroQuests = useSelector((state) => state.quest.quests);
  const inventory = useSelector((state) => state.inventory.items);

  useEffect(() => {
    if (heroQuests.includes(fiend.quest)) {
      const drop = Math.floor(Math.random() * 100);
      if (drop < fiend.questDropRate) {
        const index = questItems.findIndex(
          (item) => item.id === fiend.questItem
        );
        setItem(questItems[index]);
      }
      if (item) {
        const questIdx = quests.findIndex((quest) => quest.id === fiend.quest);
        setNeedNum(quests[questIdx].goal);
        const questItemIdx = inventory.findIndex(
          (questItem) => questItem.id === item.id
        );
        const questItem = inventory[questItemIdx];
        if (questItem && questItem.quantity) {
          setHaveNum(questItem.quantity);
        } else {
          setHaveNum(1);
        }
      }
    }
  }, [fiend, item, needNum, haveNum]);

  return { item, needNum, haveNum };
};
