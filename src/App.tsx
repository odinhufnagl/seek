import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from './hooks';
import RootNavigator from './navigation';
import { AuthProvider } from './providers/AuthProvider';
import { ThemeProvider, darkTheme } from './theme';
import { Theme } from './types';

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={darkTheme}>
          <AuthProvider>
            <AppInternal />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
};

const AppInternal = (): JSX.Element => {
  const { theme } = useTheme();

  useEffect(() => {
    // set transparent status bar
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setBarStyle('light-content');
    StatusBar.setTranslucent(true);
  }, []);
  return (
    <View style={styles(theme).root}>
      <SafeAreaView style={styles(theme).safeArea}>
        <RootNavigator />
      </SafeAreaView>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    root: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      backgroundColor: theme.background.primary,
    },
    safeArea: {
      width: '100%',
    },
  });

export default App;
