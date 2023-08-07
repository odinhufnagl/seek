import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import useTheme from '../../hooks/useTheme';

import { slideHorizontallyDefaultOptions } from '../constants/options';
import { ProfileStack } from '../constants/stacks/ProfileStack';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
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
      {ProfileStack.map((screen) => (
        <Stack.Screen key={screen.name} name={screen.name} component={screen.component} />
      ))}
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
