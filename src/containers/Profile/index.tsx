import React from "react";
import { Switch, Route, Redirect } from "react-router";
import Settings from "@components/Profile/Settings";
import {
  PROFILE,
  PROFILE_ROUTER,
  SETTINGS_ROUTER,
} from "src/helpers/constants";
import styles from "./Profile.module.scss";

const Profile = () => (
  <div className={styles.wrapper}>
    <Switch>
      <Route path={PROFILE_ROUTER.SETTINGS}>
        <Settings />
      </Route>
      <Redirect from={PROFILE} to={SETTINGS_ROUTER.DETAILS} />
    </Switch>
  </div>
);

export default Profile;
