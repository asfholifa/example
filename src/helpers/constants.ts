export const AUTH = "/auth";
export const PROFILE = "/profile";
export const DASHBOARD = "/dashboard";

export const AUTH_ROUTER = {
  SIGN_IN: `${AUTH}/sign-in`,
  SIGN_UP: `${AUTH}/sign-up`,
  PASSWORD_RECOVERY: `${AUTH}/password-recovery`,
};

export const DASHBOARD_ROUTER = {
  HOME: `${DASHBOARD}/home`,
  BOTS: `${DASHBOARD}/bots`,
};

export const PROFILE_ROUTER = {
  SETTINGS: `${PROFILE}/settings`,
};

export const SETTINGS_ROUTER = {
  DETAILS: `${PROFILE_ROUTER.SETTINGS}/details`,
};

export const ACCEPT_ERROR_TEXT = "Please, agree with the Terms to use EasyBot";

export const ERROR_TEXTS: {
  [key: string]: {
    nonValid: string;
    isEmpty?: string;
  };
} = {
  name: {
    nonValid: "Name, should be valid",
    isEmpty: "Please, enter your name",
  },
  email: {
    nonValid: "Email, should be valid",
    isEmpty: "Please, enter your email",
  },
  password: {
    nonValid:
      "Password, should contain at least one number and uppercase letter",
    isEmpty: "Please, enter your password",
  },
  accept: {
    nonValid: "Please, agree with the Terms to use EasyBot",
  },
};

export const LOGO_TITLE = "EasyBot";

export const GO_TO_SIGN_UP_TEXT = "Don't have an account? ";
export const GO_TO_SIGN_IN_TEXT = "Already have an account? ";

export const SIGN_UP_DESCRIPTION_TITLE = "Check your Email";
export const SIGN_UP_DESCRIPTION =
  "We have sent a confirmation link to {EMAIL}. Follow the instructions from the email to complete registration.";

export const FORGOT_PASSWORD_TEXT = "Forgot password?";

export const ARTICLE_TEXT = {
  SIGN_IN: "Sign In",
  SIGN_UP: "Sign Up",
  PASSWORD_RECOVERY: "Password Recovery",
};

export const PASSWORD_RECOVERY_DESCRIPTION = [
  "Type the email you used when registering and we will send instructions to reset your password.",
  "Instructions to reset your password will be sent to {EMAIL}. Please check the email.",
  "Enter new password for account {EMAIL}. Make sure to use a strong password.",
];

export const PASSWORD_RECOVERY_BUTTON_TEXT = [
  "Send Instructions",
  "Back to Sign In",
  "Set new password",
];

export const SIGN_UP_DESCRIPTION_TIMER = "You can get a new link in ";

export const GENERAL_TITLE = "General";
export const GENERAL_BUTTON_TEXT = "Change name";

export const LOG_OUT_TITLE_TEXT = "Log out";
export const LOG_OUT_BUTTON_TEXT = "Log out from account";
export const DELETE_ACCOUNT_DESCRIPTION =
  "You will receive an email to confirm your decision. Please note, that all boats you have created will be permanently deleted.";
export const DELETE_ACCOUNT_BUTTON = "Delete account";

export const CHANGE_EMAIL_TITLE = "Change email";
export const CHANGE_EMAIL_DESCRIPTION = "Current email ";
export const CHANGE_EMAIL_BUTTON_TEXT = "Change email";
export const CHANGE_EMAIL_INSTRUCTIONS = [
  "We have sent a confirmation link to {OLD_EMAIL}.",
  "Please use the old address {NEW_EMAIL} before confirmation.",
];

export const CHANNEL_LOGO: { [key: string]: string } = {
  facebook: "/logo-facebook.png",
  api: "/logo-api.png",
  email: "/logo-email.png",
  sms: "/logo-sms.png",
  telegram: "/logo-telegram.png",
  webchat: "logo-webchat.png",
};

export const NO_CHANNELS_TEXT = "No channels connected";
