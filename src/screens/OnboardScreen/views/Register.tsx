import React, { Dispatch, useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
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
  onSubmit,
  ...props
}: {
  email: string;
  updateEmail: Dispatch<string>;
  password: string;
  updatePassword: Dispatch<string>;
  confirmedPassword: string;
  updateConfirmedPassword: Dispatch<string>;
  maxLength?: number;
  onSubmit?: () => void;
}) => {
  const inputRef2 = useRef<TextInput>(null);
  const inputRef3 = useRef<TextInput>(null);
  const translateKey = 'onboardRegister.';
  return (
    <Container style={styles.center} {...props}>
      <View>
        <Text type='header' weight='bold'>
          {translate(translateKey + 'header')}
        </Text>
        <Spacer spacing='small' />
        <Text emphasis='medium' type='body' weight='regular'>
          {translate(translateKey + 'subTitle')}
        </Text>
        <Spacer spacing='extraLarge' />
        <Input
          autoCapitalize='none'
          autoFocus
          variant='third'
          placeholder={translate(translateKey + 'emailPlaceholder')}
          value={email}
          updateValue={(val) => updateEmail(val.trim())}
          {...(maxLength !== undefined ? { maxLength } : {})}
          showLength={Boolean(maxLength)}
          onSubmitEditing={() => inputRef2.current?.focus()}
        />
        <Spacer />
        <Input
          inputRef={inputRef2}
          variant='third'
          placeholder={translate(translateKey + 'passwordPlaceholder')}
          value={password}
          updateValue={updatePassword}
          {...(maxLength !== undefined ? { maxLength } : {})}
          showLength={Boolean(maxLength)}
          secureTextEntry={true}
          onSubmitEditing={() => inputRef3.current?.focus()}
          autoCapitalize='none'
        />
        <Spacer />
        <Input
          autoCapitalize='none'
          inputRef={inputRef3}
          onSubmitEditing={onSubmit}
          variant='third'
          placeholder={translate(translateKey + 'confirmPasswordPlaceholder')}
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
  },
});
export default Register;
