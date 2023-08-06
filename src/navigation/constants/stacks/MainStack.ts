import { NAVIGATOR_STACKS, SCREENS } from '../../../constants';
import { QuestionScreen } from '../../../screens';
import { Stack } from '../../../types';
import ChatsNavigator from '../../navigators/ChatsNavigator';
import { slideVerticallyDefaultOptions } from '../options';

// TODO: maybe change this structure
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
];
