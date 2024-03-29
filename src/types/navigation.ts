import { StackNavigationProp } from '@react-navigation/stack';
import { NAVIGATOR_STACKS, SCREENS } from '../constants';
const {
  LOGIN_SCREEN,
  WELCOME_SCREEN,
  ONBOARD_SCREEN,
  CHATS_SCREEN,
  CHAT_SCREEN,
  QUESTION_SCREEN,
  PROFILE_SCREEN,
  DIARY_ENTRY_SCREEN,
  SEARCH_SCREEN,
  NEW_CONNECTION_SCREEN,
  EDIT_PROFILE_SCREEN,
  SETTINGS_SCREEN,
  PRIVACY_POLICY_SCREEN,
  UPDATE_PASSWORD_SCREEN,
  FORGOT_PASSWORD_SCREEN,
} = SCREENS;
type StackParamList = {
  [LOGIN_SCREEN]: any;
  [WELCOME_SCREEN]: any;
  [ONBOARD_SCREEN]: any;
  [CHATS_SCREEN]: any;
  [CHAT_SCREEN]: any;
  [NAVIGATOR_STACKS.CHATS_STACK]: any;
  [NAVIGATOR_STACKS.SETTINGS_STACK]: any;
  [QUESTION_SCREEN]: any;
  [PROFILE_SCREEN]: any;
  [DIARY_ENTRY_SCREEN]: any;
  [SEARCH_SCREEN]: any;
  [NEW_CONNECTION_SCREEN]: any;
  [EDIT_PROFILE_SCREEN]: any;
  [SETTINGS_SCREEN]: any;
  [PRIVACY_POLICY_SCREEN]: any;
  [UPDATE_PASSWORD_SCREEN]: any;
  [FORGOT_PASSWORD_SCREEN]: any;
};

export type NavigationProps = StackNavigationProp<StackParamList>;
export type Stack = {
  name: string;
  component: (...args: any[]) => React.JSX.Element;
  options?: Record<any, any>;
}[];
