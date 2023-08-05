import { NAVIGATOR_STACKS } from '../../../constants';
import { Stack } from '../../../types';
import MainNavigator from '../../navigators/MainNavigator';

export const HomeStack: Stack = [{ name: NAVIGATOR_STACKS.MAIN_STACK, component: MainNavigator }];
