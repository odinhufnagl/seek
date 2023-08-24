import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import useTheme from '../../hooks/useTheme';

import { slideHorizontallyDefaultOptions } from '../constants/options';
import { SettingsStack } from '../constants/stacks/SettingsStack';

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        header: () => undefined,
        headerMode: 'float',
        cardStyle: { backgroundColor: theme.background.primary },
        ...slideHorizontallyDefaultOptions,
      }}
    >
      {SettingsStack.map((screen) => (
        <Stack.Screen key={screen.name} name={screen.name} component={screen.component} />
      ))}
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
