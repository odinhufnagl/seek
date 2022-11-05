import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { queryClient } from './api/seekApi';

import RootNavigator from './navigation';
import { AuthProvider } from './providers/AuthProvider';
import { lightTheme, ThemeProvider } from './theme';
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer>
          <ThemeProvider theme={lightTheme}>
            <SafeAreaProvider>
              <SafeAreaView>
                <RootNavigator />
              </SafeAreaView>
            </SafeAreaProvider>
          </ThemeProvider>
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
