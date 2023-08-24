import { SCREENS } from '../../../constants';
import { PrivacyPolicyScreen, SettingsScreen } from '../../../screens';
import { Stack } from '../../../types';
import { slideHorizontallyDefaultOptions } from '../options';

export const SettingsStack: Stack = [
  {
    name: SCREENS.SETTINGS_SCREEN,
    component: SettingsScreen,
  },
  {
    name: SCREENS.PRIVACY_POLICY_SCREEN,
    component: PrivacyPolicyScreen,
    options: slideHorizontallyDefaultOptions,
  },
];
