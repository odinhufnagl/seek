import React from 'react';

import {
  ImageBackground,
  Text as RNText,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import wallpaper from '../../../assets/images/wallpapers/peopleSittingOnWall.jpg';
import { Button, Container, Logo, Spacer, Text } from '../../common';
import { FONT_FAMILY } from '../../common/Text/Text';
import { SCREENS } from '../../constants';
import { useTheme } from '../../hooks';
import { translate } from '../../i18n';
import { NavigationProps, Theme } from '../../types';
type Props = {
  navigation: NavigationProps;
};

const WelcomeScreen = ({ navigation }: Props) => {
  const { theme } = useTheme();
  const translateKey = 'welcomeScreen.';

  const handleSignUpPressed = () => {
    navigation.navigate(SCREENS.ONBOARD_SCREEN);
  };
  const handleLogInPressed = () => {
    navigation.navigate(SCREENS.LOGIN_SCREEN);
  };

  return (
    <ImageBackground source={wallpaper} style={styles(theme).imageBackground}>
      <View style={styles(theme).overlay}>
        <Container style={styles(theme).container}>
          <>
            <View style={styles(theme).upperContainer}>
              <Logo size='extraLarge' />
              <Spacer spacing='large' />
              <Text emphasis='medium' weight='medium'>
                {translate(translateKey + 'subHeader')}
              </Text>
            </View>
            <View style={styles(theme).lowerContainer}>
              <Button
                title={translate(translateKey + 'signUpButton')}
                onPress={handleSignUpPressed}
              />
              <Spacer spacing='large' />
              <TouchableWithoutFeedback onPress={() => navigation.navigate(SCREENS.LOGIN_SCREEN)}>
                <RNText
                  style={{
                    fontSize: 10,
                    fontFamily: FONT_FAMILY.regular,
                    color: theme.base.medium,
                  }}
                >
                  {'Already have an account?  '}
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate(SCREENS.LOGIN_SCREEN)}
                  >
                    <Text
                      style={{
                        color: theme.brand,
                        fontSize: 10,
                        textDecorationLine: 'underline',
                      }}
                    >
                      Log in
                    </Text>
                  </TouchableWithoutFeedback>
                </RNText>
              </TouchableWithoutFeedback>
            </View>
          </>
        </Container>
      </View>
    </ImageBackground>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    imageBackground: { width: '100%', height: '100%' },
    overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1 },
    container: { alignItems: 'center' },
    upperContainer: {
      height: '40%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    lowerContainer: {
      height: '60%',
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  });

export default WelcomeScreen;
