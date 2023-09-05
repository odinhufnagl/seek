import { useNavigation } from '@react-navigation/native';
import React, { Dispatch, useRef } from 'react';
import {
  Text as RNText,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Container, Input, Spacer, Text } from '../../../common';
import { FONT_FAMILY } from '../../../common/Text/Text';
import { SCREENS, SPACING } from '../../../constants';
import { useTheme } from '../../../hooks';
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
  privacyPolicyChecked: boolean;
  updatePrivacyPolicyChecked: Dispatch<boolean>;
}) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const inputRef2 = useRef<TextInput>(null);
  const inputRef3 = useRef<TextInput>(null);

  const translateKey = 'onboardRegister.';
  return (
    <>
      <Container style={styles.center} {...props}>
        <KeyboardAwareScrollView>
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
          <Spacer />
        </KeyboardAwareScrollView>
      </Container>
      <View style={styles.privacyPolicyContainer}>
        <Spacer spacing='small' orientation='horizontal' />
        <RNText style={{ fontSize: 10, fontFamily: FONT_FAMILY.regular }}>
          {'By pressing register I agree that I have read and accepted the '}
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(SCREENS.PRIVACY_POLICY_SCREEN)}
          >
            <Text
              style={{
                color: theme.brand,
                fontSize: 10,
                textDecorationLine: 'underline',
              }}
            >
              Privacy Policy
            </Text>
          </TouchableWithoutFeedback>
        </RNText>
      </View>
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
export default Register;
