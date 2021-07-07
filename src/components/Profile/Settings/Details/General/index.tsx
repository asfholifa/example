import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { changeName } from "@redux/slices/profileSlice";
import { loadingSelector } from "@redux/slices/appSlice";
import { EuiFormRow, EuiFieldText, EuiForm, EuiButton } from "@elastic/eui";
import { GENERAL_BUTTON_TEXT, GENERAL_TITLE } from "@helpers/constants";
import styles from "./General.module.scss";

interface GeneralProps {
  showCallOut: (string: string) => void;
}

const General: React.FC<GeneralProps> = ({ showCallOut }) => {
  const [userName, setUserName] = useState("");
  const { profile } = useAppSelector(loadingSelector);
  const dispatch = useAppDispatch();

  const onUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserName(value);
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await dispatch(changeName(userName));
    if (response.payload) {
      setUserName("");
      showCallOut("Name was successfully changed.");
    }
  };

  return (
    <EuiForm
      onSubmit={(e) => onFormSubmit(e)}
      component="form"
      className={styles.form}
    >
      <EuiFormRow>
        <div className={styles.title}>{GENERAL_TITLE}</div>
      </EuiFormRow>
      <EuiFormRow label="Name">
        <EuiFieldText
          value={userName}
          disabled={profile?.changeName}
          onChange={onUserNameChange}
        />
      </EuiFormRow>
      <EuiFormRow>
        <EuiButton isLoading={profile?.changeName} type="submit">
          {GENERAL_BUTTON_TEXT}
        </EuiButton>
      </EuiFormRow>
    </EuiForm>
  );
};

export default General;
