import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Logo } from '../../common';
import useTheme from '../../hooks/useTheme';
import { Theme } from '../../types';

const WelcomeView = () => {
  const { theme } = useTheme();

  return (
    <View style={styles(theme).container}>
      <Logo size='large' />
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: theme.background.primary,
    },
  });

export default WelcomeView;
