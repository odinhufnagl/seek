import React, { useState } from 'react';

import { StyleSheet, View } from 'react-native';

import { Button, Container, Icon, Input, Spacer, Text } from '../../common';
import { Header } from '../../components';
import { SCREENS } from '../../constants';
import { useTheme } from '../../hooks';
import { translate } from '../../i18n';
import { resetPassword } from '../../services';
import { NavigationProps, Theme } from '../../types';
import { showSnackbar } from '../../utils';
type Props = {
  navigation: NavigationProps;
};

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCodePress = async () => {
    try {
      setLoading(true);
      const r = await resetPassword(email);
      if (r) {
        showSnackbar('Check your inbox for the code', 'success');
        navigation.navigate(SCREENS.UPDATE_PASSWORD_SCREEN);
      }
      setLoading(false);
    } catch (e) {
      showSnackbar(translate('snackbar.defaultError'), 'error');
      setLoading(false);
    }
  };
  return (
    <>
      <Header
        leftItems={[
          <Icon
            icon='back'
            onPress={() => navigation.goBack()}
            size={18}
            variant='third'
            key='down'
          />,
        ]}
      />
      <Container>
        <>
          <View style={styles(theme).container}>
            <Text type='header' weight='bold'>
              Forgot password
            </Text>
            <Spacer spacing='small' />
            <Text emphasis='medium' type='body' weight='regular'>
              We will send you a code to your email
            </Text>
            <Spacer spacing='extraLarge' />
            <Input
              value={email}
              autoCapitalize='none'
              updateValue={(v) => setEmail(v.trim())}
              autoFocus
              variant='third'
              placeholder='Email'
            />
          </View>
          <Button title='Send Code' onPress={handleSendCodePress} loading={loading} />
        </>
      </Container>
    </>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: { justifyContent: 'center', flex: 1 },
  });

export default ForgotPasswordScreen;
