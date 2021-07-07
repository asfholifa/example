import React, { useState } from "react";
import { EuiSideNav, EuiTitle, EuiIcon } from "@elastic/eui";
import { DASHBOARD_ROUTER, LOGO_TITLE } from "@helpers/constants";
import { NavLink } from "react-router-dom";
import styles from "./SideNav.module.scss";

const SideBar = () => {
  const [isMobile, setIsMobile] = useState(false);

  const toggleOpenOnMobile = () => {
    setIsMobile(!isMobile);
  };

  const sideNav = {
    head: [
      {
        name: (
          <NavLink
            to={DASHBOARD_ROUTER.HOME}
            className={styles.navLink}
            activeClassName={styles.selected}
          >
            <EuiIcon type="grid" />
            Dashboard
          </NavLink>
        ),
        id: "dashboard",
      },
      {
        name: (
          <NavLink
            to="/user-request"
            className={styles.navLink}
            activeClassName={styles.selected}
          >
            <EuiIcon type="editorComment" />
            User request
          </NavLink>
        ),
        id: "user-request",
      },
      {
        name: (
          <NavLink
            to={DASHBOARD_ROUTER.BOTS}
            className={styles.navLink}
            activeClassName={styles.selected}
          >
            <EuiIcon type="heatmap" />
            My bots
          </NavLink>
        ),
        id: "my-bots",
      },
      {
        name: (
          <NavLink
            to="/nlp"
            className={styles.navLink}
            activeClassName={styles.selected}
          >
            <EuiIcon type="indexMapping" />
            NLP
          </NavLink>
        ),
        id: "nlp",
      },
    ],
    foot: [
      {
        name: (
          <NavLink
            to="/profile"
            className={styles.navLink}
            activeClassName={styles.selected}
          >
            <EuiIcon type="user" />
            Account
          </NavLink>
        ),
        id: "profile",
      },
      {
        name: (
          <NavLink
            to="/help"
            className={styles.navLink}
            activeClassName={styles.selected}
          >
            <EuiIcon type="questionInCircle" />
            Help
          </NavLink>
        ),
        id: "help",
      },
    ],
  };

  return (
    <div className={styles.sideNav}>
      <EuiTitle className={styles.title}>
        <div>
          <img src="/Vector.png" alt="" className={styles.headerLogo} />
          {LOGO_TITLE}
        </div>
      </EuiTitle>
      <div className={styles.sideNavContent}>
        <EuiSideNav
          mobileBreakpoints={["xs", "xs"]}
          toggleOpenOnMobile={() => toggleOpenOnMobile()}
          isOpenOnMobile={isMobile}
          style={{ width: 192 }}
          items={sideNav.head}
        />
        <EuiSideNav
          mobileBreakpoints={["xs", "xs"]}
          toggleOpenOnMobile={() => toggleOpenOnMobile()}
          isOpenOnMobile={isMobile}
          style={{ width: 192 }}
          items={sideNav.foot}
        />
      </div>
    </div>
  );
};

export default SideBar;
