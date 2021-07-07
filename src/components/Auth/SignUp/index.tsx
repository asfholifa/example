import React, { useState } from "react";
import {
  EuiFormRow,
  EuiFieldText,
  EuiForm,
  EuiButton,
  EuiText,
  EuiLink,
  EuiCheckbox,
  EuiFieldPassword,
  EuiIcon,
} from "@elastic/eui";
import { Link } from "react-router-dom";
import { signUp } from "@redux/slices/authSlice";
import { useAppDispatch } from "@redux/hooks";
import { FormErrors } from "src/@types/formErrors";
import Helpers from "@helpers/utils";
import {
  ACCEPT_ERROR_TEXT,
  AUTH_ROUTER,
  ARTICLE_TEXT,
  SIGN_UP_DESCRIPTION,
  SIGN_UP_DESCRIPTION_TITLE,
  GO_TO_SIGN_IN_TEXT,
} from "@helpers/constants";
import classNames from "classnames";
import Timer from "./Timer";
import styles from "./SignUp.module.scss";

const SignUp = () => {
  const [formItems, setFormItems] = useState<{
    [key: string]: string | boolean;
  }>({
    name: "",
    email: "",
    password: "",
    accept: false,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: {
      id: "name",
      isInvalid: false,
    },
    email: {
      id: "email",
      isInvalid: false,
    },
    password: {
      id: "password",
      isInvalid: false,
    },
    accept: {
      id: "accept",
      isInvalid: false,
    },
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const dispatch = useAppDispatch();

  const acceptLabel = (
    <span>
      I agree with <EuiLink color="subdued">Terms</EuiLink> of use and{" "}
      <EuiLink color="subdued">Privacy policy</EuiLink>
    </span>
  );

  const onFormItemBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    if (!formItems[name]) {
      setFormErrors(Helpers.validation.single(name, formItems, formErrors));
    }
  };

  const onFormItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value, type } = event.target;
    const formItemValue = type === "checkbox" ? checked : value;
    setFormItems({
      ...formItems,
      [name]: formItemValue,
    });
    setFormErrors({
      ...formErrors,
      [name]: {
        ...formErrors[name],
        isInvalid: false,
      },
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name, email, password } = formItems;
    const validatedInputs = Helpers.validation.full(formItems, formErrors);

    setFormErrors(validatedInputs);

    const invalidInputs = Object.values(validatedInputs).filter(
      (el) => el.isInvalid
    );

    if (invalidInputs.length === 0) {
      const data = {
        country: "ru",
        firstName: (name as string).split(" ")[0],
        lastName: (name as string).split(" ")[1],
        email: email as string,
        password: password as string,
        phoneNumber: "1234-567-89-00",
        subscribe: false,
      };
      const res = await dispatch(signUp(data));
      if (res.payload) {
        setIsRegistered(true);
      }
    }
  };

  return (
    <EuiForm onSubmit={onSubmit} component="form" className={styles.form}>
      <EuiFormRow>
        <div className={styles.authText}>{ARTICLE_TEXT.SIGN_UP}</div>
      </EuiFormRow>
      {!isRegistered ? (
        <>
          <EuiFormRow
            isInvalid={formErrors.name.isInvalid}
            error={formErrors.name.errorText}
            className={classNames(styles.formRow, styles.nameFormRow)}
            label="Name"
          >
            <EuiFieldText
              name="name"
              value={formItems.name as string}
              isInvalid={formErrors.name.isInvalid}
              append={
                formErrors.name.isInvalid ? (
                  <EuiIcon className={styles.appendIcon} type="alert" />
                ) : undefined
              }
              onBlur={(e) => onFormItemBlur(e)}
              onChange={(e) => onFormItemChange(e)}
              className={styles.input}
            />
          </EuiFormRow>
          <EuiFormRow
            isInvalid={formErrors.email.isInvalid}
            error={formErrors.email.errorText}
            className={styles.formRow}
            label="Email"
          >
            <EuiFieldText
              name="email"
              value={formItems.email as string}
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
              value={formItems.password as string}
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
          <EuiFormRow
            isInvalid={formErrors.accept.isInvalid}
            error={ACCEPT_ERROR_TEXT}
            className={styles.forgotPasswordRow}
          >
            <EuiText size="xs">
              <EuiCheckbox
                id="accept"
                name="accept"
                label={acceptLabel}
                checked={formItems.accept as boolean}
                onChange={(e) => onFormItemChange(e)}
              />
            </EuiText>
          </EuiFormRow>
          <EuiFormRow className={styles.buttonFormRow}>
            <EuiButton type="submit" className={styles.button} fill>
              {ARTICLE_TEXT.SIGN_UP}
            </EuiButton>
          </EuiFormRow>
          <EuiFormRow>
            <div>
              {GO_TO_SIGN_IN_TEXT}
              <EuiLink color="primary">
                <Link to={AUTH_ROUTER.SIGN_IN}>{ARTICLE_TEXT.SIGN_IN}</Link>
              </EuiLink>
            </div>
          </EuiFormRow>
        </>
      ) : (
        <EuiFormRow>
          <div>
            <div className={styles.descriptionTitle}>
              {SIGN_UP_DESCRIPTION_TITLE}
            </div>
            <div className={styles.description}>
              {SIGN_UP_DESCRIPTION.replace(
                "{EMAIL}",
                formItems.email as string
              )}
            </div>
            <Timer />
          </div>
        </EuiFormRow>
      )}
    </EuiForm>
  );
};

export default SignUp;
