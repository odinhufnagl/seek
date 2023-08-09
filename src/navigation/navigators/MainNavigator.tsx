// import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { SCREENS } from '../../constants';
import { useFetchNewChat } from '../../hooks';
import useTheme from '../../hooks/useTheme';
import { useAuth } from '../../providers/AuthProvider';
import { useNotification } from '../../providers/NotificationProvider';
import { NavigationProps, NotificationMessageServerNewChatData } from '../../types';
import { MainStack } from '../constants/stacks/MainStack';

// import { BottomTabBar } from '../../components';

const Stack = createStackNavigator();
// const Tab = createTabNavigator();

const MainNavigator = ({ navigation }: { navigation: NavigationProps }) => {
  const { currentUser } = useAuth();
  const { addNotificationHandler, removeNotificationHandler } = useNotification();
  const { data: newChat, isLoading } = useFetchNewChat(currentUser?.id);

  // const tabBar = (props: BottomTabBarProps) => <BottomTabBar {...props} />;
  const { theme } = useTheme();

  const handleNewChatNotification = async (data: NotificationMessageServerNewChatData) => {
    // TODO: the parsing should be elsewhere aka Number(data.chatId)
    navigation.navigate(SCREENS.NEW_CONNECTION_SCREEN, { chatId: Number(data.chatId) });
  };
  const handleQuestionOpenedApp = async (data: NotificationMessageServerDailyQuestionData) => {
    navigation.navigate(SCREENS.QUESTION_SCREEN);
  };

  useEffect(() => {
    addNotificationHandler('openedApp', 'newChat', handleNewChatNotification);
    addNotificationHandler('openedApp', 'dailyQuestion', handleQuestionOpenedApp);

    addNotificationHandler('inApp', 'newChat', handleNewChatNotification);
    return () => {
      removeNotificationHandler(handleNewChatNotification);
      removeNotificationHandler(handleQuestionOpenedApp);
    };
  }, []);

  useEffect(() => {
    if (newChat) {
      navigation.navigate(SCREENS.NEW_CONNECTION_SCREEN, { chatId: newChat.id });
    }
  }, [newChat]);

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
