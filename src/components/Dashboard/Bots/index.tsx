import React, { useEffect, useState, useCallback } from "react";
import { EuiButton } from "@elastic/eui";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { userIdSelector } from "@redux/slices/profileSlice";
import { botsLengthSelector, getBotList } from "@redux/slices/botsSlice";
import useWindowDimensions from "src/hooks/useWindowDimensions";
import Filter from "./Filter";
import List from "./List";
import styles from "./Bots.module.scss";

const Bots = () => {
  const [selectedBots, setSelectedBots] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const userId = useAppSelector(userIdSelector);
  const botsLength = useAppSelector(botsLengthSelector);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (userId) {
      dispatch(getBotList({ user_id: userId }));
    }
  }, []);

  const changeSelectedBots = useCallback((state: number[]) => {
    setSelectedBots(state);
  }, []);

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>MyBots</h1>
        {width > 768 && (
          <EuiButton fill iconType="plusInCircle" onClick={() => {}}>
            Create bot
          </EuiButton>
        )}
      </div>
      <div className={styles.botListContainer}>
        {botsLength > 0 ? (
          <>
            <Filter
              selectedBots={selectedBots}
              changeSelectedBots={changeSelectedBots}
            />
            <List selectedBots={selectedBots} callback={changeSelectedBots} />
          </>
        ) : (
          <div className={styles.empty}>
            <EuiButton fill iconType="plusInCircle" onClick={() => {}}>
              Create first bot
            </EuiButton>
          </div>
        )}
      </div>
    </>
  );
};

export default Bots;
