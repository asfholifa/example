import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router";
import { useAppDispatch } from "@redux/hooks";
import { getProfile } from "@redux/slices/profileSlice";
import { EuiTabs, EuiTab } from "@elastic/eui";
import useWindowDimensions from "src/hooks/useWindowDimensions";
import { PROFILE_ROUTER, SETTINGS_ROUTER } from "@helpers/constants";
import Details from "./Details";
import styles from "./Settings.module.scss";

const tabs = [
  {
    id: "details",
    name: "Details",
    disabled: false,
  },
  {
    id: "tab-2",
    name: "Tab 2",
    disabled: false,
  },
  {
    id: "tab-3",
    name: "Tab 3",
    disabled: false,
  },
  {
    id: "tab-4",
    name: "Tab 4",
    disabled: false,
  },
];

const ProfileSettings = () => {
  const { width } = useWindowDimensions();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [selectedTabId, setSelectedTabId] = useState("details");

  useEffect(() => {
    // TODO: Test getProfile dispatch
    (async () => {
      const data = await dispatch(getProfile({ user_id: 19 }));
      console.log(data.payload);
    })();
  }, []);

  const onSelectedTabChanged = (id: string) => {
    history.push(`${PROFILE_ROUTER.SETTINGS}/${id}`);
    setSelectedTabId(id);
  };

  const renderTabs = () =>
    tabs.map((tab, index) => (
      <EuiTab
        onClick={() => onSelectedTabChanged(tab.id)}
        isSelected={tab.id === selectedTabId}
        disabled={tab.disabled}
        key={index}
      >
        {tab.name}
      </EuiTab>
    ));

  return (
    <div>
      <h1 className={styles.title}>Profile Settings</h1>
      {width > 500 && <EuiTabs size="l">{renderTabs()}</EuiTabs>}
      <Switch>
        <Route path={SETTINGS_ROUTER.DETAILS}>
          <Details />
        </Route>
      </Switch>
    </div>
  );
};

export default ProfileSettings;
