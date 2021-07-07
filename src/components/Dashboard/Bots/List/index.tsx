import React from "react";
import { botListSelector } from "@redux/slices/botsSlice";
import { useAppSelector } from "@redux/hooks";
import Item from "./Item";
// import styles from "./List.module.scss";

interface ListProps {
  callback: (id: number[]) => void;
  selectedBots: number[];
}

const List: React.FC<ListProps> = ({ selectedBots, callback }) => {
  const botList = useAppSelector(botListSelector);

  return (
    <>
      {botList.map((el) => (
        <Item
          key={el.id}
          selectedBots={selectedBots}
          onCheckBoxChange={callback}
          bot={el}
        />
      ))}
    </>
  );
};

export default List;
