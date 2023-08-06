import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';

import useTheme from '../../hooks/useTheme';

import { firebase } from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { AppState, AppStateStatus } from 'react-native';
import { NAVIGATOR_STACKS, SCREENS } from '../../constants';
import { useAuth } from '../../providers/AuthProvider';
import { useSocket } from '../../providers/SocketProvider';
import { createNotificationToken, sendIsActiveEvent } from '../../services';
import { HomeStack } from '../constants/stacks/HomeStack';

const Stack = createStackNavigator();

const linking = {
  prefixes: ['seek://'],
  config: {
    initialRouteName: NAVIGATOR_STACKS.MAIN_STACK,
    screens: {
      MainStack: {
        screens: {
          [NAVIGATOR_STACKS.CHATS_STACK]: {
            screens: {
              [SCREENS.CHAT_SCREEN]: {
                path: 'chat/:id',
              },
            },
          },
        },
      },
    },
  },
};

const HomeNavigator = () => {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const { socket } = useSocket();

  // TODO: all this active stuff could be moved into a provider
  const handleAppStateChange = (state: AppStateStatus) => {
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

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    (async () => {
      // TODO: should not happen each time right
      const fcmToken = await firebase.messaging().getToken();
      console.log('fcmToken', fcmToken);
      createNotificationToken({ name: fcmToken, userId: currentUser?.id });
    })();
  }, [currentUser]);

  return (
    <NavigationContainer independent linking={linking}>
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
    </NavigationContainer>
  );
};

export default HomeNavigator;
