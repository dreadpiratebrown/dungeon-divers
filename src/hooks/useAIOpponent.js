import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useAIOpponent = (turn) => {
  const [aiChoice, setAIChoice] = useState({});

  const fiend = useSelector((state) => state.fiend);
  const primary = fiend.primary;
  const secondary = fiend.secondary;

  useEffect(() => {
    if (turn === 1) {
      const options = [primary, secondary];
      const choice = options[Math.floor(Math.random() * options.length)];
      setAIChoice({
        mode: choice.type,
        name: choice.name,
        damage: choice.attack,
      });
    } else {
      setAIChoice({});
    }
  }, [turn]);

  return aiChoice;
};
