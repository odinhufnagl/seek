import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import useTheme from '../../hooks/useTheme';
import { slideVerticallyDefaultOptions } from '../constants/options';
import { AuthStack } from '../constants/stacks/AuthStack';
const Stack = createStackNavigator();

const AuthNavigator = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => undefined,
        headerMode: 'float',
        cardStyle: { backgroundColor: theme.background.primary },
        ...slideVerticallyDefaultOptions,
      }}
    >
      {AuthStack.map((screen) => (
        <Stack.Screen key={screen.name} name={screen.name} component={screen.component} />
      ))}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
