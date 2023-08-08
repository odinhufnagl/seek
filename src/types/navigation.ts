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
} = SCREENS;
type StackParamList = {
  [LOGIN_SCREEN]: any;
  [WELCOME_SCREEN]: any;
  [ONBOARD_SCREEN]: any;
  [CHATS_SCREEN]: any;
  [CHAT_SCREEN]: any;
  [NAVIGATOR_STACKS.CHATS_STACK]: any;
  [QUESTION_SCREEN]: any;
  [PROFILE_SCREEN]: any;
  [DIARY_ENTRY_SCREEN]: any;
  [SEARCH_SCREEN]: any;
};

export type NavigationProps = StackNavigationProp<StackParamList>;
export type Stack = {
  name: string;
  component: (...args: any[]) => React.JSX.Element;
  options?: Record<any, any>;
}[];
