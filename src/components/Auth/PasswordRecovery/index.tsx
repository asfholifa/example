import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  EuiFormRow,
  EuiForm,
  EuiFieldText,
  EuiButton,
  EuiLink,
  EuiFieldPassword,
  EuiIcon,
} from "@elastic/eui";
import classNames from "classnames";
import Helpers from "@helpers/utils";
import {
  ARTICLE_TEXT,
  AUTH_ROUTER,
  PASSWORD_RECOVERY_BUTTON_TEXT,
  PASSWORD_RECOVERY_DESCRIPTION,
} from "@helpers/constants";
import { FormErrors } from "src/@types/formErrors";
import styles from "./PasswordRecovery.module.scss";

interface PasswordRecoveryProps {
  showCallOut: () => void;
}

const BACKTO_SIGN_IN_TEXT = "Back to Sign In";

const PasswordRecovery: React.FC<PasswordRecoveryProps> = ({ showCallOut }) => {
  const [step, setStep] = useState(0);
  const [formItems, setFormItems] = useState<{ [key: string]: string }>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: {
      id: "email",
      isInvalid: false,
    },
    password: {
      id: "password",
      isInvalid: false,
    },
  });
  const history = useHistory();

  useEffect(() => {
    console.log(step);
  }, [step]);

  const onFormItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormItems({
      ...formItems,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: {
        ...formErrors[name],
        isInvalid: false,
      },
    });
  };

  const onFormItemBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    if (!formItems[name]) {
      setFormErrors(Helpers.validation.single(name, formItems, formErrors));
    }
  };

  // TODO: Add recovery password when api was added on backend
  const onNextStepClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = formItems;
    const validatedInputs = Helpers.validation.full(formItems, formErrors);

    setFormErrors(validatedInputs);

    const invalidInputs = Object.values(validatedInputs).reduce(
      (prev: string[], curr) => {
        if (curr.isInvalid) {
          return [...prev, curr.id];
        }
        return prev;
      },
      []
    );

    switch (step) {
      case 0:
        if (!invalidInputs.includes("email")) {
          console.log(email);
          setStep(step + 1);
        }
        break;
      case 2:
        if (!invalidInputs.includes("password")) {
          console.log(password);
          history.push(AUTH_ROUTER.SIGN_IN);
          showCallOut();
        }
        break;
      default:
        history.push(AUTH_ROUTER.SIGN_IN);
        break;
    }
  };

  const renderFormItems = () => {
    const { email, password } = formItems;
    const { errorText: passwordErrorText, isInvalid: passwordIsInvalid } =
      formErrors.password;
    const { errorText: emailErrorText, isInvalid: emailIsInvalid } =
      formErrors.email;
    switch (step) {
      case 0:
        return (
          <EuiFormRow
            isInvalid={emailIsInvalid}
            error={emailErrorText}
            className={styles.formRow}
            label="Email"
          >
            <EuiFieldText
              name="email"
              value={email}
              isInvalid={emailIsInvalid}
              append={
                emailIsInvalid ? (
                  <EuiIcon className={styles.appendIcon} type="alert" />
                ) : undefined
              }
              onBlur={(e) => onFormItemBlur(e)}
              onChange={(e) => onFormItemChange(e)}
              className={styles.input}
            />
          </EuiFormRow>
        );
      case 2:
        return (
          <EuiFormRow
            isInvalid={passwordIsInvalid}
            error={passwordErrorText}
            className={styles.formRow}
            label="Password"
          >
            <EuiFieldPassword
              type="dual"
              name="password"
              value={password}
              isInvalid={passwordIsInvalid}
              append={
                passwordIsInvalid ? (
                  <EuiIcon className={styles.appendIcon} type="alert" />
                ) : undefined
              }
              onBlur={(e) => onFormItemBlur(e)}
              onChange={(e) => onFormItemChange(e)}
              className={styles.passwordInput}
            />
          </EuiFormRow>
        );
      default:
        return null;
    }
  };

  return (
    <EuiForm
      onSubmit={onNextStepClick}
      component="form"
      className={styles.form}
    >
      <EuiFormRow>
        <div className={styles.passwordRecoveryText}>
          {ARTICLE_TEXT.PASSWORD_RECOVERY}
        </div>
      </EuiFormRow>
      <EuiFormRow className={styles.descriptionRow}>
        <div className={styles.passRecoveryDescription}>
          {step !== 0
            ? PASSWORD_RECOVERY_DESCRIPTION[step].replace(
                "{EMAIL}",
                formItems.email && ""
              )
            : PASSWORD_RECOVERY_DESCRIPTION[step]}
        </div>
      </EuiFormRow>
      {renderFormItems()}
      <EuiFormRow
        className={classNames({ [styles.formButtonRow]: step !== 2 })}
      >
        <EuiButton type="submit" className={styles.button} fill>
          {PASSWORD_RECOVERY_BUTTON_TEXT[step]}
        </EuiButton>
      </EuiFormRow>
      {!step && (
        <EuiFormRow>
          <EuiLink color="primary">
            <Link to={AUTH_ROUTER.SIGN_IN}>{BACKTO_SIGN_IN_TEXT}</Link>
          </EuiLink>
        </EuiFormRow>
      )}
    </EuiForm>
  );
};

export default PasswordRecovery;
