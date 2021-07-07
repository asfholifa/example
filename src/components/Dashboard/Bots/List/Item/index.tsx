import React, { useCallback } from "react";
import {
  EuiAvatar,
  EuiCheckbox,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiToolTip,
} from "@elastic/eui";
import classNames from "classnames";
import { CHANNEL_LOGO, NO_CHANNELS_TEXT } from "@helpers/constants";
import useWindowDimensions from "src/hooks/useWindowDimensions";
import Popover from "@components/Popover";
import BotAPI from "src/api/botApi";
import { useAppDispatch } from "@redux/hooks";
import { getBot } from "@redux/slices/botsSlice";
import styles from "./Item.module.scss";

interface BotListItemProps {
  bot: BotAPI.IBot;
  onCheckBoxChange: (id: number[]) => void;
  selectedBots: number[];
}

const menuItems = [
  {
    label: "Duplicate",
    icon: "copy",
  },
  {
    label: "Rename",
    icon: "pencil",
  },
  {
    label: "Edit",
    icon: "wrench",
  },
  {
    label: "Delete",
    icon: "trash",
    color: "#BD271E",
  },
];

const BotListItem: React.FC<BotListItemProps> = ({
  selectedBots,
  bot,
  onCheckBoxChange,
}) => {
  const {
    id,
    avatar_link: avatarLink,
    name,
    description,
    created_at: createdAt,
    updated_at: updatedAt,
    channels,
  } = bot;
  const dispatch = useAppDispatch();
  const { width } = useWindowDimensions();
  const botAction: { [key: string]: () => void } = {
    duplicate: async () => {
      const result = await dispatch(getBot({ id }));
      console.log(result);
    },
    rename: () => {},
    edit: () => {},
    delete: () => {},
  };

  const handleCheckBoxChange = useCallback(
    (botId: number) => {
      const selected = selectedBots;
      if (selected.includes(botId)) {
        onCheckBoxChange(selected.filter((el) => el !== botId));
        return;
      }
      onCheckBoxChange([...selected, botId]);
    },
    [onCheckBoxChange, selectedBots]
  );

  const botHandler = (event: string) => {
    botAction[event]();
    console.log(id, event);
  };

  return (
    <div className={classNames(styles.botItem, styles.flexed)}>
      {width > 768 && (
        <>
          <EuiCheckbox
            className={styles.aligned}
            checked={selectedBots.includes(id)}
            id={id.toString()}
            onChange={() => handleCheckBoxChange(id)}
          />
          <EuiAvatar
            className={styles.aligned}
            size="xl"
            name={name}
            imageUrl={avatarLink}
          />
        </>
      )}
      <div className={styles.botDescription}>
        <div>
          <p className={styles.bold}>
            {name} <span className={styles.statusCircle} />
          </p>
          <p className={styles.text}>{description}</p>
          <div>
            <p className={classNames(styles.text, styles.grey)}>
              Created at {new Date(createdAt).toLocaleDateString()}
            </p>
            {updatedAt && (
              <>
                <div />
                <p className={classNames(styles.text, styles.grey)}>
                  Updated at {new Date(updatedAt).toLocaleDateString()}
                </p>
              </>
            )}
          </div>
          {width <= 500 && (
            <div className={styles.menuButtonContainer}>
              <EuiButtonIcon
                className={styles.menuButton}
                iconType="boxesVertical"
                aria-label="menu"
              />
            </div>
          )}
        </div>
      </div>
      <div
        className={classNames(
          { [styles.bordered]: width > 768 },
          styles.channelsWrapper
        )}
      >
        <div className={styles.channelsContainer}>
          {channels.length > 0
            ? channels.map(({ name: channelName }) => (
                <div key={channelName} className={styles.channelItem}>
                  <EuiToolTip content={channelName}>
                    <img src={CHANNEL_LOGO[channelName]} alt="" />
                  </EuiToolTip>
                </div>
              ))
            : NO_CHANNELS_TEXT}
        </div>
      </div>
      <div
        className={classNames(
          styles.statisticContainer,
          styles.flexed,
          styles.bordered
        )}
      >
        {/* TODO: add statistics when can get it from backend */}
        <div className={styles.statisticInfo}>
          <div className={styles.statisticText}>
            <p className={classNames(styles.text, styles.grey)}>Users</p>
            <p className={styles.bold}>333 333</p>
          </div>
          <div className={styles.statisticText}>
            <p className={classNames(styles.text, styles.grey)}>Session</p>
            <p className={styles.bold}>197 364</p>
          </div>
        </div>
        <EuiButtonEmpty iconType="stats">View statistics</EuiButtonEmpty>
      </div>
      {width > 500 && (
        <div
          className={classNames(styles.menuButtonContainer, styles.bordered)}
        >
          <Popover
            className={styles.menuPopover}
            items={menuItems}
            buttonType="icon"
            buttonIcon="boxesVertical"
            callback={botHandler}
          />
        </div>
      )}
    </div>
  );
};

export default BotListItem;
