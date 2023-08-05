import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';

import useTheme from '../../hooks/useTheme';

import { AppState, AppStateStatus } from 'react-native';
import { useAuth } from '../../providers/AuthProvider';
import { useSocket } from '../../providers/SocketProvider';
import { sendIsActiveEvent } from '../../services';
import { HomeStack } from '../constants/stacks/HomeStack';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  const { theme } = useTheme();
  const { currentUser, token } = useAuth();
  const { socket } = useSocket();
  useEffect(() => {
    console.log('token', token);
  }, [token]);
  // TODO: all this active stuff could be moved into a provider
  const handleAppStateChange = (state: AppStateStatus) => {
    console.log('kotnro');
    if (!currentUser) {
      return;
    }
    if (state === 'background') {
      sendIsActiveEvent(socket, { isActive: false, senderId: currentUser?.id });
    }
    if (state === 'active') {
      sendIsActiveEvent(socket, { isActive: true, senderId: currentUser?.id });
    }
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    sendIsActiveEvent(socket, { isActive: true, senderId: currentUser?.id });
    const listener = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      listener.remove();
      sendIsActiveEvent(socket, { isActive: false, senderId: currentUser?.id });
    };
  }, [currentUser]);
  if (!token) {
    return <></>;
  }
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => undefined,
        headerMode: 'float',
        cardStyle: { backgroundColor: theme.background.primary },
      }}
    >
      {HomeStack.map((screen) => (
        <Stack.Screen key={screen.name} name={screen.name} component={screen.component} />
      ))}
    </Stack.Navigator>
  );
};

export default HomeNavigator;
