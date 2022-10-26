import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RootNavigator from './navigation';
import { lightTheme, ThemeProvider } from './theme';

const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider theme={lightTheme}>
        <SafeAreaProvider>
          <SafeAreaView>
            <RootNavigator />
          </SafeAreaView>
        </SafeAreaProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
