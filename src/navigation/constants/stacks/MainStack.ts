import { NAVIGATOR_STACKS, SCREENS } from '../../../constants';
import { QuestionScreen } from '../../../screens';
import { Stack } from '../../../types';
import ChatsNavigator from '../../navigators/ChatsNavigator';
import ProfileNavigator from '../../navigators/ProfileNavigator';
import { slideVerticallyDefaultOptions } from '../options';

// TODO: maybe change this structure, look through all stackstructure
export const MainStack: Stack = [
  {
    name: NAVIGATOR_STACKS.CHATS_STACK,
    component: ChatsNavigator,
  },
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
];
