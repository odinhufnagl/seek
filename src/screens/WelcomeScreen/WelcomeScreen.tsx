import React from 'react';
import { View } from 'react-native';
import { Text } from '../../common';
import { Button } from '../../common';
import { ONBOARD_SCREEN } from '../../navigation';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
//https://reactnavigation.org/docs/typescript/#type-checking-screens
//Förstår inte vilka typer eller paket som ska användas.

const WelcomeScreen = ({ navigation }: { navigation: NavigationProp<ParamListBase> }) => {
  return (
    <View>
      <Text>WelcomeScreen</Text>
      <Button
        onPress={() => {
          navigation.navigate(ONBOARD_SCREEN);
        }}
        title='Sign Up'
        variant='primary'
      />
    </View>
  );
};

export default WelcomeScreen;
