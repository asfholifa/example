import React, { useState } from "react";
import {
  EuiFormRow,
  EuiFieldText,
  EuiForm,
  EuiButton,
  EuiText,
  EuiLink,
  EuiFieldPassword,
  EuiIcon,
} from "@elastic/eui";
import { useAppDispatch } from "@redux/hooks";
import { signIn } from "@redux/slices/authSlice";
import Helpers from "@helpers/utils";
import { Link, useHistory } from "react-router-dom";
import {
  AUTH_ROUTER,
  ARTICLE_TEXT,
  FORGOT_PASSWORD_TEXT,
  GO_TO_SIGN_UP_TEXT,
  DASHBOARD,
} from "@helpers/constants";
import classNames from "classnames";
import { FormErrors } from "src/@types/formErrors";
import styles from "./SignIn.module.scss";

const SignIn = () => {
  const history = useHistory();
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
  const dispatch = useAppDispatch();

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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { password, email } = formItems;

    const data = {
      email,
      password,
    };

    const validatedInputs = Helpers.validation.full(formItems, formErrors);

    setFormErrors(validatedInputs);

    const invalidInputs = Object.values(validatedInputs).filter(
      (el) => el.isInvalid
    );

    if (invalidInputs.length === 0) {
      const res = await dispatch(signIn(data));
      if (res.payload) {
        history.push(DASHBOARD);
      }
    }
  };

  return (
    <EuiForm onSubmit={onSubmit} component="form" className={styles.form}>
      <EuiFormRow>
        <div className={styles.authText}>{ARTICLE_TEXT.SIGN_IN}</div>
      </EuiFormRow>
      <EuiFormRow
        isInvalid={formErrors.email.isInvalid}
        error={formErrors.email.errorText}
        className={classNames(styles.formRow, styles.emailFormRow)}
        label="Email"
      >
        <EuiFieldText
          name="email"
          value={formItems.email}
          isInvalid={formErrors.email.isInvalid}
          append={
            formErrors.email.isInvalid ? (
              <EuiIcon className={styles.appendIcon} type="alert" />
            ) : undefined
          }
          onBlur={(e) => onFormItemBlur(e)}
          onChange={(e) => onFormItemChange(e)}
          className={styles.input}
        />
      </EuiFormRow>
      <EuiFormRow
        isInvalid={formErrors.password.isInvalid}
        error={formErrors.password.errorText}
        className={styles.formRow}
        label="Password"
      >
        <EuiFieldPassword
          type="dual"
          name="password"
          value={formItems.password}
          isInvalid={formErrors.password.isInvalid}
          append={
            formErrors.password.isInvalid ? (
              <EuiIcon className={styles.appendIcon} type="alert" />
            ) : undefined
          }
          onBlur={(e) => onFormItemBlur(e)}
          onChange={(e) => onFormItemChange(e)}
          className={styles.passwordInput}
        />
      </EuiFormRow>
      <EuiFormRow className={styles.forgotPasswordRow}>
        <EuiText size="xs">
          <EuiLink color="subdued">
            <Link to={AUTH_ROUTER.PASSWORD_RECOVERY}>
              {FORGOT_PASSWORD_TEXT}
            </Link>
          </EuiLink>
        </EuiText>
      </EuiFormRow>
      <EuiFormRow className={styles.buttonFormRow}>
        <EuiButton type="submit" className={styles.button} fill>
          {ARTICLE_TEXT.SIGN_IN}
        </EuiButton>
      </EuiFormRow>
      <EuiFormRow>
        <div>
          {GO_TO_SIGN_UP_TEXT}
          <EuiLink color="primary">
            <Link to={AUTH_ROUTER.SIGN_UP}>{ARTICLE_TEXT.SIGN_UP}</Link>
          </EuiLink>
        </div>
      </EuiFormRow>
    </EuiForm>
  );
};

export default SignIn;
