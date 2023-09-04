import React, { useState } from 'react';

import { StyleSheet, View } from 'react-native';

import { Button, Container, Icon, Input, Spacer, Text } from '../../common';
import { Header } from '../../components';
import { SCREENS } from '../../constants';
import { useTheme } from '../../hooks';
import { translate } from '../../i18n';
import { updatePassword } from '../../services';
import { NavigationProps, Theme } from '../../types';
import { showSnackbar } from '../../utils';
type Props = {
  navigation: NavigationProps;
};

const UpdatePasswordScreen = ({ navigation }: Props) => {
  const { theme } = useTheme();
  const [newPassword, setNewPassword] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdatePasswordPress = async () => {
    try {
      setLoading(true);
      const r = await updatePassword(newPassword, code);
      if (r) {
        showSnackbar('Password updated!', 'success');
        navigation.navigate(SCREENS.LOGIN_SCREEN);
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
              Update password
            </Text>
            <Spacer spacing='small' />
            <Text emphasis='medium' type='body' weight='regular'>
              Enter the code we sent to you
            </Text>
            <Spacer spacing='extraLarge' />
            <Input
              value={code}
              autoCapitalize='none'
              updateValue={setCode}
              autoFocus
              variant='third'
              placeholder='Code'
            />
            <Spacer />
            <Input
              value={newPassword}
              autoCapitalize='none'
              updateValue={setNewPassword}
              autoFocus
              variant='third'
              placeholder='New password'
            />
          </View>
          <Button title='Update Password' onPress={handleUpdatePasswordPress} loading={loading} />
        </>
      </Container>
    </>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: { justifyContent: 'center', flex: 1 },
  });

export default UpdatePasswordScreen;
