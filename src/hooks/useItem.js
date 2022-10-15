import { useEffect } from "react";
import { exitDungeon } from "features/app/appSlice";
import { heal } from "features/hero/heroSlice";
import { remove } from "features/inventory/inventorySlice";
import { useDispatch } from "react-redux";

export const useItem = (item, setShowItem) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (item && item.item === "scroll") {
      switch (item.effect) {
        case "exit": {
          dispatch(exitDungeon(true));
          dispatch(remove(item));
          setShowItem(null);

          break;
        }

        case "heal": {
          dispatch(heal(item.value));
          dispatch(remove(item));
          setShowItem(null);

          break;
        }

        default:
          break;
      }
    }
  }, [item]);
};
