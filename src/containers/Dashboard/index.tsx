import React from "react";
import { Switch, Route, Redirect } from "react-router";
import Home from "@components/Dashboard/Home";
import Bots from "@components/Dashboard/Bots";
import { DASHBOARD_ROUTER } from "src/helpers/constants";
import styles from "./Dashboard.module.scss";

const Profile = () => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <Switch>
        <Route path={DASHBOARD_ROUTER.HOME}>
          <Home />
        </Route>
        <Route path={DASHBOARD_ROUTER.BOTS}>
          <Bots />
        </Route>
        <Redirect to={DASHBOARD_ROUTER.HOME} />
      </Switch>
    </div>
  </div>
);

export default Profile;
