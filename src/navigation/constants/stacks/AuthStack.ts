import { WelcomeScreen } from '../../../screens';
import {OnboardScreen} from '../../../screens';
import { WELCOME_SCREEN } from '../routes';
import { ONBOARD_SCREEN } from '../routes';

export const AuthStack = [
  {
    name: WELCOME_SCREEN,
    component: WelcomeScreen,
  },
  {
    name: ONBOARD_SCREEN,
    component: OnboardScreen
  }
];
