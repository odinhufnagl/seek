import { SCREENS } from '../../../constants';
import { ChatScreen, ChatsScreen } from '../../../screens';
import { Stack } from '../../../types';
import { slideHorizontallyDefaultOptions } from '../options';

export const ChatsStack: Stack = [
  {
    name: SCREENS.CHATS_SCREEN,
    component: ChatsScreen,
  },
  { name: SCREENS.CHAT_SCREEN, component: ChatScreen, options: slideHorizontallyDefaultOptions },
];
