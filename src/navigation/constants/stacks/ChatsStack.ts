import { SCREENS } from '../../../constants';
import { ChatScreen, ChatsScreen } from '../../../screens';
import { Stack } from '../../../types';

export const ChatsStack: Stack = [
  {
    name: SCREENS.CHATS_SCREEN,
    component: ChatsScreen,
  },
  { name: SCREENS.CHAT_SCREEN, component: ChatScreen },
];
