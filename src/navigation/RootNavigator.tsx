import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../hooks';
import { useAuth } from '../providers/AuthProvider';
import { NotificationProvider } from '../providers/NotificationProvider';
import { SocketProvider } from '../providers/SocketProvider';
import AuthNavigator from './navigators/AuthNavigator';
import HomeNavigator from './navigators/HomeNavigator';

const RootNavigator = () => {
  const { theme } = useTheme();
  const { currentUser, token } = useAuth();

  return (
    <View style={styles().root}>
      {currentUser && token ? (
        <NotificationProvider>
          <SocketProvider token={token}>
            <HomeNavigator />
          </SocketProvider>
        </NotificationProvider>
      ) : (
        <AuthNavigator />
      )}
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    root: {
      width: '100%',
      height: '100%',
    },
  });

export default RootNavigator;
