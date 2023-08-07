import { SCREENS } from '../../../constants';
import { ChatScreen, DiaryEntryScreen, ProfileScreen } from '../../../screens';
import { Stack } from '../../../types';
import { slideHorizontallyDefaultOptions } from '../options';

export const ProfileStack: Stack = [
  {
    name: SCREENS.PROFILE_SCREEN,
    component: ProfileScreen,
  },
  { name: SCREENS.DIARY_ENTRY_SCREEN, component: DiaryEntryScreen },
  // TODO: THIS SEEMS BAAAD
  {
    name: SCREENS.CHAT_SCREEN,
    component: ChatScreen,
    options: slideHorizontallyDefaultOptions,
  },
];
