// import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import useTheme from '../../hooks/useTheme';
import { NavigationProps } from '../../types';
import { MainStack } from '../constants/stacks/MainStack';

// import { BottomTabBar } from '../../components';

const Stack = createStackNavigator();
// const Tab = createTabNavigator();

const MainNavigator = ({ navigation }: { navigation: NavigationProps }) => {
  // const tabBar = (props: BottomTabBarProps) => <BottomTabBar {...props} />;
  const { theme } = useTheme();
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
