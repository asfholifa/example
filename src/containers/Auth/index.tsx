import React, { useEffect, useState } from "react";
import { EuiCallOut, EuiLoadingSpinner } from "@elastic/eui";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { signInByToken } from "@redux/slices/authSlice";
import { loadingSelector } from "@redux/slices/appSlice";
import classNames from "classnames";
import { AUTH_ROUTER, DASHBOARD } from "@helpers/constants";
import SignIn from "@components/Auth/SignIn";
import SignUp from "@components/Auth/SignUp";
import PasswordRecovery from "@components/Auth/PasswordRecovery";
import styles from "./Auth.module.scss";

const Auth = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { auth } = useAppSelector(loadingSelector);
  const [shouldCallOutShow, setCallOutShow] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      (async () => {
        try {
          await dispatch(signInByToken(token));
          history.push(DASHBOARD);
        } catch (err) {
          console.warn(err);
        }
      })();
    }
  }, []);

  const showCallOut = () => {
    setCallOutShow(true);
    setTimeout(() => {
      setCallOutShow(false);
    }, 2000);
  };

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.flexed]: auth?.signInByToken,
      })}
    >
      {shouldCallOutShow && (
        <EuiCallOut
          className={styles.callOut}
          title="Password was successfully reset"
          color="success"
        />
      )}
      <div className={styles.container}>
        {auth?.signInByToken ? (
          <div>
            <EuiLoadingSpinner size="xl" />
          </div>
        ) : (
          <Switch>
            <Route path={AUTH_ROUTER.SIGN_IN}>
              <SignIn />
            </Route>
            <Route path={AUTH_ROUTER.SIGN_UP}>
              <SignUp />
            </Route>
            <Route path={AUTH_ROUTER.PASSWORD_RECOVERY}>
              <PasswordRecovery showCallOut={showCallOut} />
            </Route>
            <Redirect to={AUTH_ROUTER.SIGN_IN} />
          </Switch>
        )}
      </div>
    </div>
  );
};

export default Auth;
