import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { queryClient } from './api/seekApi';

import RootNavigator from './navigation';
import { lightTheme, ThemeProvider } from './theme';
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <ThemeProvider theme={lightTheme}>
          <SafeAreaProvider>
            <SafeAreaView>
              <RootNavigator />
            </SafeAreaView>
          </SafeAreaProvider>
        </ThemeProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
