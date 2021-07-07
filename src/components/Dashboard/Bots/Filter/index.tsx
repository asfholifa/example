import React, { useState, useCallback } from "react";
import { useAppSelector } from "@redux/hooks";
import { botsIdSelector, botsLengthSelector } from "@redux/slices/botsSlice";
import { EuiFieldSearch, EuiCheckbox } from "@elastic/eui";
import useWindowDimensions from "src/hooks/useWindowDimensions";
import Popover from "@components/Popover";
import styles from "./Filter.module.scss";

const sortItems = [
  { label: "Name: A-Z" },
  { label: "Name: Z-A" },
  { label: "Modified: recent first" },
  { label: "Created: recent first" },
];

const filterItems = [
  { label: "All bots" },
  { label: "Web Widget" },
  { label: "Facebook Messenger" },
  { label: "Telegram" },
  { label: "Slack" },
  { label: "Email" },
  { label: "SMS" },
  { label: "API" },
];

const bulkItems = [
  {
    label: "Delete",
    icon: "trash",
    color: "#BD271E",
  },
];

interface FilterProps {
  selectedBots: number[];
  changeSelectedBots: (id: number[]) => void;
}

const Filter: React.FC<FilterProps> = ({
  selectedBots,
  changeSelectedBots,
}) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Name: A-Z");
  const [filter, setFilter] = useState("All bots");
  const botsId = useAppSelector(botsIdSelector);
  const botsLength = useAppSelector(botsLengthSelector);
  const { width } = useWindowDimensions();

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };

  const onDelete = (event: string) => {
    console.log(botsId, event);
  };

  const selectAll = useCallback(() => {
    if (selectedBots.length > 0) {
      changeSelectedBots([]);
      return;
    }
    changeSelectedBots(botsId);
  }, [botsId, changeSelectedBots, selectedBots.length]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.flexed}>
        {width > 768 && (
          <EuiCheckbox
            className={styles.checkbox}
            indeterminate={
              selectedBots.length < botsLength && selectedBots.length !== 0
            }
            checked={selectedBots.length === botsLength}
            id="all"
            label="Select all"
            onChange={selectAll}
          />
        )}
        <EuiFieldSearch
          placeholder="Search by name and description"
          value={search}
          onChange={(e) => onSearch(e)}
        />
        <div className={styles.popoverContainer}>
          <Popover
            text="Filter"
            state={filter}
            items={filterItems}
            buttonType="icon"
            buttonIcon="arrowDown"
            callback={setFilter}
          />
          <Popover
            text="Sort by"
            state={sort}
            items={sortItems}
            buttonType="icon"
            buttonIcon="arrowDown"
            callback={setSort}
          />
        </div>
      </div>
      {width > 768 && (
        <div className={styles.flexed}>
          <p>{`${selectedBots.length} of ${botsLength} selected`}</p>
          <Popover
            items={bulkItems}
            className={styles.bulkPopover}
            buttonType="default"
            buttonText="Bulk action"
            buttonIcon="arrowDown"
            disabled={selectedBots.length === 0}
            callback={onDelete}
          />
        </div>
      )}
    </div>
  );
};

export default Filter;
