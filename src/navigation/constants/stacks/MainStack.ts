import { NAVIGATOR_STACKS, SCREENS } from '../../../constants';
import {
  ChatScreen,
  ChatsScreen,
  NewConnectionScreen,
  QuestionScreen,
  SearchScreen,
  SettingsScreen,
} from '../../../screens';
import { Stack } from '../../../types';
import ProfileNavigator from '../../navigators/ProfileNavigator';
import {
  fadeDefaultOptions,
  slideHorizontallyDefaultOptions,
  slideVerticallyDefaultOptions,
} from '../options';

// TODO: maybe change this structure, look through all stackstructure
export const MainStack: Stack = [
  { name: SCREENS.CHATS_SCREEN, component: ChatsScreen },
  { name: SCREENS.CHAT_SCREEN, component: ChatScreen, options: slideHorizontallyDefaultOptions },
  {
    name: SCREENS.QUESTION_SCREEN,
    component: QuestionScreen,
    options: slideVerticallyDefaultOptions,
  },
  {
    name: NAVIGATOR_STACKS.PROFILE_STACK,
    component: ProfileNavigator,
    options: slideVerticallyDefaultOptions,
  },
  { name: SCREENS.SEARCH_SCREEN, component: SearchScreen, options: fadeDefaultOptions },
  {
    name: SCREENS.SETTINGS_SCREEN,
    component: SettingsScreen,
    options: slideHorizontallyDefaultOptions,
  },
  {
    name: SCREENS.NEW_CONNECTION_SCREEN,
    component: NewConnectionScreen,
    options: {
      cardStyle: { backgroundColor: 'transparent' },
      presentation: 'transparentModal',
    },
  },
];
