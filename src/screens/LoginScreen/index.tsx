import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Container, Icon, Input, Spacer, Text } from '../../common';
import { Header } from '../../components';
import { translate } from '../../i18n';
import { useAuth } from '../../providers/AuthProvider';
import { ScreenProps } from '../../types';
import { showSnackbar } from '../../utils';

const LoginScreen = ({ navigation }: ScreenProps) => {
  const translateKey = 'loginScreen.';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { logIn } = useAuth();

  const handleLoginPress = async () => {
    try {
      setLoading(true);
      await logIn({ email, password });
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
            icon='chevronDown'
            onPress={() => navigation.goBack()}
            size={18}
            variant='third'
            key='down'
          />,
        ]}
      />
      <Container>
        <>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text type='header' weight='bold'>
              {translate(translateKey + 'title')}
            </Text>
            <Spacer spacing='small' />
            <Text emphasis='medium' type='body' weight='regular'>
              {translate(translateKey + 'subTitle')}
            </Text>
            <Spacer spacing='extraLarge' />
            <Input
              placeholder={translate(translateKey + 'emailPlaceholder')}
              value={email}
              updateValue={(val) => setEmail(val.trim())}
              variant='third'
              autoCapitalize='none'
              autoFocus
            />
            <Spacer />
            <Input
              placeholder={translate(translateKey + 'passwordPlaceholder')}
              value={password}
              updateValue={setPassword}
              secureTextEntry
              variant='third'
              autoCapitalize='none'
            />
          </View>
          <Button title='Log in' onPress={handleLoginPress} loading={loading} />
        </>
      </Container>
    </>
  );
};

export default LoginScreen;
