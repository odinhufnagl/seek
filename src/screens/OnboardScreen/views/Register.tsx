import React, { Dispatch } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Input, Spacer, Text } from '../../../common';
import { translate } from '../../../i18n';

const Register = ({
  email,
  updateEmail,
  password,
  updatePassword,
  confirmedPassword,
  updateConfirmedPassword,
  maxLength,
  ...props
}: {
  email: string;
  updateEmail: Dispatch<string>;
  password: string;
  updatePassword: Dispatch<string>;
  confirmedPassword: string;
  updateConfirmedPassword: Dispatch<string>;
  maxLength?: number;
}) => {
  const translateKey = 'onboardRegister.';
  return (
    <Container style={styles.center} {...props}>
      <View>
        <Text type='header' weight='bold'>
          {translate(translateKey + 'header')}
        </Text>
        <Text emphasis='medium' type='body' weight='medium'>
          {translate(translateKey + 'subTitle')}
        </Text>
        <Spacer />
        <Input
          placeholder={translate(translateKey + 'email')}
          value={email}
          updateValue={updateEmail}
          {...(maxLength !== undefined ? { maxLength } : {})}
          showLength={Boolean(maxLength)}
        />
        <Spacer />
        <Input
          placeholder={translate(translateKey + 'password')}
          value={password}
          updateValue={updatePassword}
          {...(maxLength !== undefined ? { maxLength } : {})}
          showLength={Boolean(maxLength)}
          secureTextEntry={true}
        />
        <Spacer />
        <Input
          placeholder={translate(translateKey + 'confirmPassword')}
          value={confirmedPassword}
          updateValue={updateConfirmedPassword}
          {...(maxLength !== undefined ? { maxLength } : {})}
          showLength={Boolean(maxLength)}
          secureTextEntry={true}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    overflow: 'visible',
  },
});
export default Register;
