import React, { useState } from "react";
import {
  EuiContextMenuPanel,
  EuiPopover,
  EuiButtonIcon,
  EuiButton,
  EuiButtonEmpty,
  EuiContextMenuItem,
  EuiBadge,
} from "@elastic/eui";
import Helpers from "@helpers/utils";
import styles from "./Popover.module.scss";

interface Items {
  label: string;
  icon?: string;
  color?: string;
}

interface PopoverProps {
  items: Items[];
  callback: (id: string) => void;
  disabled?: boolean;
  text?: string;
  state?: string;
  className?: string;
  buttonText?: string;
  buttonType?: "icon" | "empty" | "default";
  buttonIcon?: string;
}

const Popover: React.FC<PopoverProps> = ({
  className,
  buttonType = "default",
  buttonText,
  disabled,
  buttonIcon,
  text,
  state,
  items,
  callback,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const closePopover = () => {
    setIsOpen(false);
  };

  const button = () => {
    switch (buttonType) {
      case "icon":
        return (
          <EuiButtonIcon
            onClick={togglePopover}
            iconType={buttonIcon || ""}
            aria-label="sortBtn"
          />
        );
      case "empty":
        return (
          <EuiButtonEmpty iconType={buttonIcon || ""} onClick={togglePopover}>
            {buttonText || ""}
          </EuiButtonEmpty>
        );
      case "default":
      default:
        return (
          <EuiButton
            disabled={disabled}
            onClick={togglePopover}
            iconType={buttonIcon || ""}
            iconSide="right"
          >
            {buttonText || ""}
          </EuiButton>
        );
    }
  };

  const onMenuItemClick = (id: string) => {
    callback(id);
  };

  const getContextMenuItems = () =>
    items.map((el) => (
      <EuiContextMenuItem
        icon={el.icon}
        onClick={() => onMenuItemClick(el.label)}
        key={Helpers.toKebabCase(el.label)}
        style={{ color: el.color }}
      >
        {el.label}
      </EuiContextMenuItem>
    ));

  return (
    <div className={styles.popover}>
      {text && (
        <div className={styles.flexed}>
          <p className={styles.text}>{text}</p>
          <EuiBadge className={styles.badge}>{state}</EuiBadge>
        </div>
      )}
      <EuiPopover
        className={className}
        id="singlePanel"
        button={button()}
        isOpen={isOpen}
        closePopover={closePopover}
        panelPaddingSize="none"
        anchorPosition="downRight"
      >
        <EuiContextMenuPanel size="s" items={getContextMenuItems()} />
      </EuiPopover>
    </div>
  );
};

export default Popover;
