import { StackNavigationProp } from '@react-navigation/stack';
import { HOME_SCREEN, ONBOARD_SCREEN, WELCOME_SCREEN } from '../navigation';

type StackParamList = {
  [ONBOARD_SCREEN]: undefined;
  [WELCOME_SCREEN]: undefined;
  [HOME_SCREEN]: undefined;
};

export type NavigationProps = StackNavigationProp<StackParamList>;
