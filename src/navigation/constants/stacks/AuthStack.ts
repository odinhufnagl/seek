import { SCREENS } from '../../../constants';
import {
  ForgotPasswordScreen,
  LoginScreen,
  OnboardScreen,
  PrivacyPolicyScreen,
  UpdatePasswordScreen,
  WelcomeScreen,
} from '../../../screens';
import { Stack } from '../../../types';
import {
  fadeDefaultOptions,
  slideHorizontallyDefaultOptions,
  slideVerticallyDefaultOptions,
} from '../options';

const { WELCOME_SCREEN, LOGIN_SCREEN, ONBOARD_SCREEN } = SCREENS;

export const AuthStack: Stack = [
  {
    name: WELCOME_SCREEN,
    component: WelcomeScreen,
  },
  {
    name: LOGIN_SCREEN,
    component: LoginScreen,
    options: slideVerticallyDefaultOptions,
  },
  {
    name: ONBOARD_SCREEN,
    component: OnboardScreen,
    options: slideVerticallyDefaultOptions,
  },
  {
    name: SCREENS.PRIVACY_POLICY_SCREEN,
    component: PrivacyPolicyScreen,
    options: fadeDefaultOptions,
  },
  {
    name: SCREENS.FORGOT_PASSWORD_SCREEN,
    component: ForgotPasswordScreen,
    options: slideHorizontallyDefaultOptions,
  },
  { name: SCREENS.UPDATE_PASSWORD_SCREEN, component: UpdatePasswordScreen },
];
