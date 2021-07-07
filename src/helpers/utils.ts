import { FormError, FormErrors } from "src/@types/formErrors";
import { DASHBOARD_ROUTER, ERROR_TEXTS } from "./constants";

namespace Helpers {
  interface IValidation {
    getValidatedInput: (
      name: string,
      value: string | boolean,
      formErrors: FormErrors
    ) => FormError;
    single: (
      name: string,
      formItems: { [key: string]: string | boolean },
      formErrors: FormErrors
    ) => FormErrors;
    full: (
      formItems: { [key: string]: string | boolean },
      formErrors: FormErrors
    ) => FormErrors;
  }

  export const validator: { [key: string]: RegExp } = {
    name: /^[a-z,A-Z, ,0-9]+$/gm,
    email:
      // eslint-disable-next-line no-useless-escape
      /(?!m)^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gm,
  };

  export const headerConfig: {
    [key: string]: { header: string; isVisible: boolean };
  } = {
    [DASHBOARD_ROUTER.BOTS]: {
      header: "default",
      isVisible: false,
    },
    default: {
      header: "default",
      isVisible: true,
    },
  };

  export const upperFirst = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  export const validation: IValidation = {
    getValidatedInput: (name, value, formErrors) => ({
      ...formErrors[name],
      isInvalid:
        typeof value === "string"
          ? !value.match(Helpers.validator[name])
          : !value,
      errorText: !value
        ? ERROR_TEXTS[name].isEmpty
        : ERROR_TEXTS[name].nonValid,
    }),
    single: (name, formItems, formErrors) => {
      const value = formItems[name];
      return {
        ...formErrors,
        [name]: validation.getValidatedInput(name, value, formErrors),
      };
    },
    full: (formItems, formErrors): FormErrors =>
      Object.values(formErrors).reduce((prev, curr) => {
        const value = formItems[curr.id];
        return {
          ...prev,
          [curr.id]: validation.getValidatedInput(curr.id, value, formErrors),
        };
      }, {}),
  };

  export const toKebabCase = (string: string) =>
    string
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_:;,.]+/g, "-")
      .toLowerCase();
}

export default Helpers;
