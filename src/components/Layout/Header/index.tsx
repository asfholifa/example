import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import {
  EuiHeader,
  EuiIcon,
  EuiAvatar,
  EuiHeaderSectionItemButton,
} from "@elastic/eui";
import { isAuthorizedSelector } from "@redux/slices/authSlice";
import { useAppSelector } from "@redux/hooks";
import { userDataSelector } from "@redux/slices/profileSlice";
import { SETTINGS_ROUTER } from "@helpers/constants";
import Helpers from "@helpers/utils";
import useWindowDimensions from "src/hooks/useWindowDimensions";
import styles from "./Header.module.scss";

const Header = () => {
  const location = useLocation();
  const history = useHistory();
  const [header, setHeader] = useState<{ header: string; isVisible: boolean }>({
    header: "default",
    isVisible: true,
  });
  const isAuthorized = useAppSelector(isAuthorizedSelector);
  const { width } = useWindowDimensions();
  const { firstName, lastName } = useAppSelector(userDataSelector);

  useEffect(
    () =>
      Helpers.headerConfig[location.pathname]
        ? setHeader(Helpers.headerConfig[location.pathname])
        : setHeader(Helpers.headerConfig.default),
    [location]
  );

  const onAvatarClick = () => {
    history.push(SETTINGS_ROUTER.DETAILS);
  };

  const logo = (!isAuthorized || width <= 768) && (
    <img style={{ marginLeft: "10px" }} src="/Left.png" alt="" />
  );

  const bellAndAvatarButtons = isAuthorized
    ? [
        <EuiHeaderSectionItemButton>
          <EuiIcon type="bell" />
        </EuiHeaderSectionItemButton>,
        <EuiHeaderSectionItemButton onClick={onAvatarClick}>
          {width <= 768 ? (
            <EuiIcon type="menu" size="l" />
          ) : (
            <EuiAvatar name={`${firstName} ${lastName}`} />
          )}
        </EuiHeaderSectionItemButton>,
      ]
    : [];

  return (
    <>
      {(header.isVisible || width <= 768) && (
        <EuiHeader
          className={styles.header}
          sections={[
            {
              items: [logo],
              borders: "none",
            },
            {
              items: bellAndAvatarButtons,
              borders: "none",
            },
          ]}
        />
      )}
    </>
  );
};

export default Header;
