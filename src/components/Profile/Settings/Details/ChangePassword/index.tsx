import React, { FormEvent, useState } from "react";
import {
  EuiFormRow,
  EuiFieldPassword,
  EuiForm,
  EuiButton,
  EuiIcon,
} from "@elastic/eui";
import { changePassword } from "@redux/slices/profileSlice";
import { loadingSelector } from "@redux/slices/appSlice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import Helpers from "@helpers/utils";
import { FormErrors } from "src/@types/formErrors";
import styles from "./ChangePassword.module.scss";

const TITLE = "Change password";
const DESCRIPTION = "Password changed ...";
const BUTTON_TEXT = "Change password";

interface ChangePasswordProps {
  showCallOut: (string: string) => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ showCallOut }) => {
  const [formItems, setFormItems] = useState<{ [key: string]: string }>({
    currentPassword: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    password: {
      id: "password",
      isInvalid: false,
    },
  });
  const { profile } = useAppSelector(loadingSelector);
  const dispatch = useAppDispatch();

  const onFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormItems({
      ...formItems,
      [name]: value,
    });
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: {
          ...formErrors[name],
          isInvalid: false,
        },
      });
    }
  };

  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { password, currentPassword } = formItems;

    const validatedInputs = Helpers.validation.single(
      "password",
      formItems,
      formErrors
    );

    setFormErrors(validatedInputs);

    const invalidInputs = Object.values(validatedInputs).filter(
      (el) => el.isInvalid
    );

    if (currentPassword && invalidInputs.length === 0) {
      const response = await dispatch(changePassword(password));
      if (response.payload) {
        showCallOut("Password was successfully changed.");
      }
    }
  };

  return (
    <EuiForm
      onSubmit={(e) => onFormSubmit(e)}
      component="form"
      className={styles.form}
    >
      <EuiFormRow>
        <div className={styles.title}>{TITLE}</div>
      </EuiFormRow>
      <EuiFormRow>
        {/* TODO: Add date when was changed password last time */}
        <p className={styles.description}>{DESCRIPTION}</p>
      </EuiFormRow>
      <EuiFormRow className={styles.passwordFormRow} label="Current password">
        <EuiFieldPassword
          type="dual"
          name="currentPassword"
          className={styles.passwordInput}
          value={formItems.currentPassword}
          disabled={profile?.changePassword}
          onChange={(e) => onFormChange(e)}
        />
      </EuiFormRow>
      <EuiFormRow
        className={styles.passwordFormRow}
        isInvalid={formErrors.password.isInvalid}
        error={formErrors.password.errorText}
        label="New password"
      >
        <EuiFieldPassword
          name="password"
          isInvalid={formErrors.password.isInvalid}
          append={
            formErrors.password.isInvalid ? (
              <EuiIcon className={styles.appendIcon} type="alert" />
            ) : undefined
          }
          className={styles.passwordInput}
          value={formItems.password}
          disabled={profile?.changePassword}
          onChange={(e) => onFormChange(e)}
        />
      </EuiFormRow>
      <EuiFormRow>
        <EuiButton isLoading={profile?.changePassword} type="submit">
          {BUTTON_TEXT}
        </EuiButton>
      </EuiFormRow>
    </EuiForm>
  );
};

export default ChangePassword;
