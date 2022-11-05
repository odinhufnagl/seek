import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../hooks';
import { useAuthContext } from '../providers/AuthProvider';
import AuthNavigator from './navigators/AuthNavigator';
import HomeNavigator from './navigators/HomeNavigator';

const RootNavigator = () => {
  const { theme } = useTheme();
  const { currentUser } = useAuthContext();
  return <View style={styles().root}>{currentUser ? <HomeNavigator /> : <AuthNavigator />}</View>;
};

const styles = () =>
  StyleSheet.create({
    root: {
      width: '100%',
      height: '100%',
    },
  });

export default RootNavigator;
