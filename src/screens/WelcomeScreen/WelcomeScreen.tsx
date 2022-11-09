import React, { Dispatch, useRef, useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { BottomModal, Button, Container, Input, Logo, Spacer, Text } from '../../common';
import { useTheme } from '../../hooks';
import { translate } from '../../i18n';
import { ONBOARD_SCREEN } from '../../navigation';
import { useAuthContext } from '../../providers/AuthProvider';
import { ITheme, NavigationProps } from '../../types';
import { showSnackbar } from '../../utils';

type LoginModalProps = {
  email: string;
  updateEmail: Dispatch<string>;
  password: string;
  updatePassword: Dispatch<string>;
  onForgotPassword: () => void;
  onLogin: () => void;
  loading: boolean;
  isButtonDisabled: boolean;
};

const BACKGROUND_IMAGE_PATH =
  '../../../assets/images/welcomeScreenBackground/welcomeScreenBackgroundImage.jpg';

const LogInModal = ({
  email,
  updateEmail,
  password,
  updatePassword,
  onForgotPassword,
  onLogin,
  loading,
  isButtonDisabled,
}: LoginModalProps) => {
  const translateKey = 'welcomeScreen.loginModal.';

  return (
    <Container>
      <>
        <Spacer spacing='large' />
        <Text type='header' weight='bold'>
          {translate(translateKey + 'header')}
        </Text>

        <Text emphasis='medium' type='body' weight='medium'>
          {translate(translateKey + 'subHeader')}
        </Text>
        <Spacer />
        <Input
          value={email}
          updateValue={updateEmail}
          placeholder={translate(translateKey + 'emailPlaceholder')}
          autoCapitalize='none'
        />
        <Spacer />
        <Input
          value={password}
          updateValue={updatePassword}
          placeholder={translate(translateKey + 'passwordPlaceholder')}
          secureTextEntry
          autoCapitalize='none'
        />
        <Spacer spacing='extraLarge' />

        <View style={{ alignItems: 'center' }}>
          <Button
            title={translate(translateKey + 'button')}
            onPress={onLogin}
            loading={loading}
            disabled={isButtonDisabled}
          />
          <Spacer />
          <Text type='small' emphasis='low' weight='medium' onPress={onForgotPassword}>
            {translate(translateKey + 'forgotPassword')}
          </Text>
        </View>
      </>
    </Container>
  );
};

type Props = {
  navigation: NavigationProps;
};

const WelcomeScreen = ({ navigation }: Props) => {
  const translateKey = 'welcomeScreen.';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { theme } = useTheme();
  const { logIn } = useAuthContext();
  const [loadingLogin, setLoadingLogin] = useState(false);

  const bottomModalRef = useRef<Modalize>(null);

  const handleNavigateToOnboarding = () => {
    navigation.navigate(ONBOARD_SCREEN);
  };

  const handleOpenModal = () => {
    bottomModalRef?.current?.open();
  };

  const handleForgotPassword = () => {
    // TODO: handle forgot password flow
    console.log('forgot password');
  };
  const handleLogin = async () => {
    setLoadingLogin(true);

    const res = await logIn(email, password);
    if (res.isError) {
      setLoadingLogin(false);
      showSnackbar(translate('snackbar.error'), 'error');
      return;
    }
    setLoadingLogin(false);
  };

  return (
    <View style={styles(theme).root}>
      <BottomModal ref={bottomModalRef}>
        <LogInModal
          email={email}
          updateEmail={setEmail}
          password={password}
          updatePassword={setPassword}
          onLogin={handleLogin}
          onForgotPassword={handleForgotPassword}
          loading={loadingLogin}
          isButtonDisabled={email.length === 0 || password.length === 0}
        />
      </BottomModal>
      <ImageBackground
        source={require(BACKGROUND_IMAGE_PATH)}
        style={styles(theme).imageBackground}
      />
      <Container style={styles(theme).container}>
        <>
          <View>
            <Spacer />
            <Logo style={styles(theme).logo} />
          </View>

          <View style={styles(theme).bottomContainer}>
            <Button
              width='max'
              title={translate(translateKey + 'signupButton')}
              variant='primary'
              size='large'
              onPress={handleNavigateToOnboarding}
            />
            <Spacer spacing='large' />
            <Text
              color={theme.textGreyColor}
              weight='semiBold'
              type='caption'
              onPress={handleOpenModal}
            >
              {translate(translateKey + 'loginButton')}
            </Text>
          </View>
        </>
      </Container>
    </View>
  );
};

const styles = (theme: ITheme) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.black,
      flex: 1,
    },
    imageBackground: {
      width: '100%',
      height: '100%',
      opacity: 0.4,
      position: 'absolute',
    },
    logo: {
      alignSelf: 'center',
    },
    container: {
      justifyContent: 'space-between',
      flex: 1,
      alignItems: 'center',
    },
    bottomContainer: {
      width: '100%',
      alignItems: 'center',
    },
  });

export default WelcomeScreen;
