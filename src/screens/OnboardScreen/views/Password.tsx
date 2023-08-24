import { useNavigation } from '@react-navigation/native';
import React, { Dispatch, useRef } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Container, Input, Spacer, Text } from '../../../common';
import { SPACING } from '../../../constants';
import { useTheme } from '../../../hooks';
import { translate } from '../../../i18n';
const Password = ({
  password,
  updatePassword,
  confirmedPassword,
  updateConfirmedPassword,
  maxLength,
  onSubmit,
  ...props
}: {
  password: string;
  updatePassword: Dispatch<string>;
  confirmedPassword: string;
  updateConfirmedPassword: Dispatch<string>;
  maxLength?: number;
  onSubmit?: () => void;
}) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const inputRef2 = useRef<TextInput>(null);

  const translateKey = 'onboardPassword.';
  return (
    <>
      <Container style={styles.center} {...props}>
        <>
          <Text type='header' weight='bold'>
            {translate(translateKey + 'header')}
          </Text>
          <Spacer spacing='small' />
          <Text emphasis='medium' type='body' weight='regular'>
            {translate(translateKey + 'subTitle')}
          </Text>
          <Spacer spacing='extraLarge' />

          <Input
            autoFocus
            variant='third'
            placeholder={translate(translateKey + 'passwordPlaceholder')}
            value={password}
            updateValue={updatePassword}
            {...(maxLength !== undefined ? { maxLength } : {})}
            showLength={Boolean(maxLength)}
            secureTextEntry={true}
            onSubmitEditing={() => inputRef2.current?.focus()}
            autoCapitalize='none'
          />
          <Spacer />
          <Input
            autoCapitalize='none'
            inputRef={inputRef2}
            onSubmitEditing={onSubmit}
            variant='third'
            placeholder={translate(translateKey + 'confirmPasswordPlaceholder')}
            value={confirmedPassword}
            updateValue={updateConfirmedPassword}
            {...(maxLength !== undefined ? { maxLength } : {})}
            showLength={Boolean(maxLength)}
            secureTextEntry={true}
          />
        </>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
  },
  privacyPolicyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.medium,
    paddingBottom: SPACING.medium,
    width: '80%',
  },
});
export default Password;
