import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Layout from "@components/Layout";
import { useAppSelector } from "@redux/hooks";
import { isAuthorizedSelector } from "@redux/slices/authSlice";
import { AUTH, DASHBOARD, PROFILE } from "@helpers/constants";
import Auth from "@containers/Auth";
import Dashboard from "@containers/Dashboard";
import Profile from "@containers/Profile";
import "./App.scss";

function App() {
  const isAuthorized = useAppSelector(isAuthorizedSelector);

  return (
    <Router>
      <Layout>
        <Switch>
          {isAuthorized ? (
            <>
              <Route path={DASHBOARD}>
                <Dashboard />
              </Route>
              <Route path={PROFILE}>
                <Profile />
              </Route>
              <Redirect to={DASHBOARD} />
            </>
          ) : (
            <>
              <Route path={AUTH}>
                <Auth />
              </Route>
              <Redirect to={AUTH} />
            </>
          )}
        </Switch>
      </Layout>
    </Router>
  );
}
export default App;
