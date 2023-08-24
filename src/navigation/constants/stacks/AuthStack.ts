import { SCREENS } from '../../../constants';
import { LoginScreen, OnboardScreen, PrivacyPolicyScreen, WelcomeScreen } from '../../../screens';
import { Stack } from '../../../types';
import { fadeDefaultOptions } from '../options';

const { WELCOME_SCREEN, LOGIN_SCREEN, ONBOARD_SCREEN } = SCREENS;

export const AuthStack: Stack = [
  {
    name: WELCOME_SCREEN,
    component: WelcomeScreen,
  },
  {
    name: LOGIN_SCREEN,
    component: LoginScreen,
  },
  {
    name: ONBOARD_SCREEN,
    component: OnboardScreen,
  },
  {
    name: SCREENS.PRIVACY_POLICY_SCREEN,
    component: PrivacyPolicyScreen,
    options: fadeDefaultOptions,
  },
];
