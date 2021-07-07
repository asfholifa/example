import React, { useState } from "react";
import {
  EuiHorizontalRule,
  EuiForm,
  EuiFormRow,
  EuiButton,
  EuiButtonEmpty,
  EuiCallOut,
} from "@elastic/eui";
import {
  DELETE_ACCOUNT_BUTTON,
  DELETE_ACCOUNT_DESCRIPTION,
  LOG_OUT_BUTTON_TEXT,
  LOG_OUT_TITLE_TEXT,
} from "@helpers/constants";
import { deleteAccount, logout } from "@redux/slices/profileSlice";
import { useAppDispatch } from "@redux/hooks";
import General from "./General";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";
import styles from "./Details.module.scss";

const initialCalloutState = {
  value: "",
  isVisible: false,
};

const Details = () => {
  const [calloutState, setCalloutState] = useState(initialCalloutState);
  const dispatch = useAppDispatch();
  const showCallOut = (string: string) => {
    setCalloutState({
      value: string,
      isVisible: true,
    });
    setTimeout(() => {
      setCalloutState(initialCalloutState);
    }, 2000);
  };

  const onLogout = () => {
    dispatch(logout());
  };

  const onDeleteAccount = () => {
    dispatch(deleteAccount());
  };

  const forms = [
    <General showCallOut={showCallOut} />,
    <ChangePassword showCallOut={showCallOut} />,
    <ChangeEmail showCallOut={showCallOut} />,
  ];

  return (
    <>
      {calloutState.isVisible && (
        <EuiCallOut
          color="success"
          className={styles.callOut}
          title={calloutState.value}
        />
      )}
      {forms.map((el, index) => (
        <div key={index}>
          <div className={styles.formItem}>{el}</div>
          <EuiHorizontalRule className={styles.rule} />
        </div>
      ))}
      <EuiForm className={styles.logoutForm}>
        <EuiFormRow>
          <div className={styles.title}>{LOG_OUT_TITLE_TEXT}</div>
        </EuiFormRow>
        <EuiFormRow>
          <EuiButton
            type="submit"
            className={styles.dangerButton}
            color="danger"
            onClick={onLogout}
          >
            {LOG_OUT_BUTTON_TEXT}
          </EuiButton>
        </EuiFormRow>
      </EuiForm>
      <EuiHorizontalRule className={styles.rule} />
      <EuiForm className={styles.deleteAccountForm}>
        <EuiFormRow>
          <EuiButtonEmpty
            type="submit"
            className={styles.deleteAccountButton}
            color="danger"
            onClick={onDeleteAccount}
          >
            {DELETE_ACCOUNT_BUTTON}
          </EuiButtonEmpty>
        </EuiFormRow>
        <EuiFormRow>
          <p className={styles.description}>{DELETE_ACCOUNT_DESCRIPTION}</p>
        </EuiFormRow>
      </EuiForm>
    </>
  );
};

export default Details;
