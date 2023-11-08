// import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import SplashScreen from 'react-native-splash-screen';
import { SCREENS } from '../../constants';
import useTheme from '../../hooks/useTheme';
import { useAuth } from '../../providers/AuthProvider';
import { useNotification } from '../../providers/NotificationProvider';
import { fetchNewChat } from '../../services';
import {
  NavigationProps,
  NotificationMessageServerNewChatData,
  NotificationMessageServerUserMessageData,
} from '../../types';
import { MainStack } from '../constants/stacks/MainStack';
// import { BottomTabBar } from '../../components';

const Stack = createStackNavigator();
// const Tab = createTabNavigator();

const MainNavigator = ({ navigation }: { navigation: NavigationProps }) => {
  const { currentUser } = useAuth();

  const { addNotificationHandler, removeNotificationHandler, onNotificationOpenedAppFromClose } =
    useNotification();

  // const tabBar = (props: BottomTabBarProps) => <BottomTabBar {...props} />;
  const { theme } = useTheme();

  const navigateToChat = (chatId: number) => {
    navigation.navigate(SCREENS.CHAT_SCREEN, { id: chatId });
  };
  const handleNewChatNotification = async (data: NotificationMessageServerNewChatData) => {
    // TODO: the parsing should be elsewhere aka Number(data.chatId)
    navigation.navigate(SCREENS.NEW_CONNECTION_SCREEN, { chatId: Number(data.chatId) });
  };
  const handleQuestionOpenedApp = async (data: NotificationMessageServerDailyQuestionData) => {
    console.log('navigation', navigation);
    navigation.navigate(SCREENS.QUESTION_SCREEN);
  };
  const handleUserMessageOpenedApp = async (data: NotificationMessageServerUserMessageData) => {
    navigateToChat(data.chatId);
  };

  const init = async () => {
    await onNotificationOpenedAppFromClose([
      { handler: handleQuestionOpenedApp, type: 'dailyQuestion' },
      { handler: handleNewChatNotification, type: 'newChat' },
      { handler: handleUserMessageOpenedApp, type: 'message' },
    ]);
  };

  useEffect(() => {
    init().finally(async () => {
      (async () => await BootSplash.hide({ fade: true }))();
      SplashScreen.hide();
    });
    addNotificationHandler('openedApp', 'dailyQuestion', handleQuestionOpenedApp);
    addNotificationHandler('openedApp', 'newChat', handleNewChatNotification);
    addNotificationHandler('inApp', 'newChat', handleNewChatNotification);
    addNotificationHandler('openedApp', 'message', handleUserMessageOpenedApp);
    return () => {
      removeNotificationHandler(handleQuestionOpenedApp, 'dailyQuestion', 'openedApp');
      removeNotificationHandler(handleNewChatNotification, 'newChat', 'openedApp');
      removeNotificationHandler(handleNewChatNotification, 'newChat', 'inApp');
      removeNotificationHandler(handleUserMessageOpenedApp, 'message', 'openedApp');
    };
  }, []);

  useEffect(() => {
    (async () => {
      const newChat = await fetchNewChat(currentUser?.id);
      console.log('newChat', newChat);
      if (newChat) {
        navigation.navigate(SCREENS.NEW_CONNECTION_SCREEN, { chatId: newChat.id });
      }
    })();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        header: () => undefined,
        cardStyle: { backgroundColor: theme.background.primary },
        /*  tabBarStyle: {
          backgroundColor: theme.background.primary,
          borderTopColor: theme.background.secondary,
          borderTopWidth: 1.5,
          height: 55,
        },
        tabBarActiveTintColor: theme.brand,
        tabBarInactiveTintColor: theme.base.low,
        tabBarLabel: () => null,*/
      }}
      // tabBar={tabBar}
      // sceneContainerStyle={{ backgroundColor: theme.background.primary }}
    >
      {MainStack.map((screen) => (
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

export default MainNavigator;
