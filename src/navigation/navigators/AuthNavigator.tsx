import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import SplashScreen from 'react-native-splash-screen';
import useTheme from '../../hooks/useTheme';
import { AuthStack } from '../constants/stacks/AuthStack';
const Stack = createStackNavigator();

const AuthNavigator = () => {
  const { theme } = useTheme();
  useEffect(() => {
    SplashScreen.hide();
    (async () => await BootSplash.hide({ fade: true }))();
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => undefined,
        headerMode: 'float',
        cardStyle: { backgroundColor: theme.background.primary },
      }}
    >
      {AuthStack.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
