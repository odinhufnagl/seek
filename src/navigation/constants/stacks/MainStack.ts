import { NAVIGATOR_STACKS } from '../../../constants';
import { Stack } from '../../../types';
import ChatsNavigator from '../../navigators/ChatsNavigator';

export const MainStack: Stack = [
  {
    name: NAVIGATOR_STACKS.CHATS_STACK,
    component: ChatsNavigator,
  },
];
