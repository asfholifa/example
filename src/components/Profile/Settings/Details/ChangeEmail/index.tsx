import React, { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { changeEmail, userDataSelector } from "@redux/slices/profileSlice";
import {
  EuiFormRow,
  EuiFieldText,
  EuiFieldPassword,
  EuiForm,
  EuiButton,
  EuiIcon,
} from "@elastic/eui";
import {
  CHANGE_EMAIL_BUTTON_TEXT,
  CHANGE_EMAIL_DESCRIPTION,
  CHANGE_EMAIL_INSTRUCTIONS,
  CHANGE_EMAIL_TITLE,
} from "@helpers/constants";
import { loadingSelector } from "@redux/slices/appSlice";
import Helpers from "@helpers/utils";
import { FormErrors } from "src/@types/formErrors";
import styles from "./ChangeEmail.module.scss";

interface ChangeEmailProps {
  showCallOut: (string: string) => void;
}

const ChangeEmail: React.FC<ChangeEmailProps> = ({ showCallOut }) => {
  const [formItems, setFormItems] = useState<{ [key: string]: string }>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: {
      id: "email",
      isInvalid: false,
    },
  });
  const [showInstructions, setShowInstructions] = useState(false);
  const oldEmail = useRef("");
  const dispatch = useAppDispatch();
  const userData = useAppSelector(userDataSelector);
  const { profile } = useAppSelector(loadingSelector);

  const onFormItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = formItems;

    const validatedInputs = Helpers.validation.single(
      "email",
      formItems,
      formErrors
    );

    setFormErrors(validatedInputs);

    const invalidInputs = Object.values(validatedInputs).filter(
      (el) => el.isInvalid
    );

    // TODO: add password check when api will add on backend
    if (password && invalidInputs.length === 0) {
      const response = await dispatch(changeEmail(email));
      if (response.payload) {
        oldEmail.current = email;
        showCallOut(
          `We have sent a confirmation link to ${email}. Please use the old address ${userData.firstName} before confirmation.`
        );
        setShowInstructions(true);
        setTimeout(() => {
          setShowInstructions(false);
        }, 2000);
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
        <div className={styles.title}>{CHANGE_EMAIL_TITLE}</div>
      </EuiFormRow>
      {showInstructions && (
        <EuiFormRow>
          <p className={styles.instructions}>
            {CHANGE_EMAIL_INSTRUCTIONS[0].replace(
              "{OLD_EMAIL}",
              oldEmail.current
            )}
            {CHANGE_EMAIL_INSTRUCTIONS[1].replace(
              "{NEW_EMAIL}",
              userData.firstName ? userData.firstName : ""
            )}
          </p>
        </EuiFormRow>
      )}
      <EuiFormRow label={CHANGE_EMAIL_DESCRIPTION}>
        {/* TODO: Add string when was changed password last time */}
        <p className={styles.description}>{userData.firstName}</p>
      </EuiFormRow>
      <EuiFormRow
        isInvalid={formErrors.email.isInvalid}
        error={formErrors.email.errorText}
        className={styles.formRow}
        label="New email"
      >
        <EuiFieldText
          name="email"
          value={formItems.email}
          isInvalid={formErrors.email.isInvalid}
          disabled={profile?.changeEmail}
          append={
            formErrors.email.isInvalid ? (
              <EuiIcon className={styles.appendIcon} type="alert" />
            ) : undefined
          }
          onChange={(e) => onFormItemChange(e)}
        />
      </EuiFormRow>
      <EuiFormRow className={styles.formRow} label="Current password">
        <EuiFieldPassword
          type="dual"
          name="password"
          value={formItems.password}
          disabled={profile?.changeEmail}
          className={styles.passwordInput}
          onChange={(e) => onFormItemChange(e)}
        />
      </EuiFormRow>
      <EuiFormRow>
        <EuiButton isLoading={profile?.changeEmail} type="submit">
          {CHANGE_EMAIL_BUTTON_TEXT}
        </EuiButton>
      </EuiFormRow>
    </EuiForm>
  );
};

export default ChangeEmail;
