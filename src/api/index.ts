import AuthAPI from "./auth";
import ProfileAPI from "./profile";
import BotAPI from "./botApi";

const Api: {
  [key: string]: any;
} = {
  auth: AuthAPI,
  profile: ProfileAPI,
  bot: BotAPI,
};

export default Api;
