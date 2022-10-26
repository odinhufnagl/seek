import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import useTheme from '../../hooks/useTheme';

import { HomeStack } from '../constants/stacks/HomeStack';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        header: () => undefined,
        headerMode: 'float',
        cardStyle: { backgroundColor: theme.backgroundColor },
      }}
    >
      {HomeStack.map((screen) => (
        <Stack.Screen key={screen.name} name={screen.name} component={screen.component} />
      ))}
    </Stack.Navigator>
  );
};

export default HomeNavigator;
