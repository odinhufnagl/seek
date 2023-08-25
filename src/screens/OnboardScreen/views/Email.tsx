import { useNavigation } from '@react-navigation/native';
import React, { Dispatch } from 'react';
import { Text as RNText, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Container, Input, Spacer, Text } from '../../../common';
import { FONT_FAMILY } from '../../../common/Text/Text';
import { SCREENS, SPACING } from '../../../constants';
import { useTheme } from '../../../hooks';
import { translate } from '../../../i18n';
const Email = ({
  email,
  updateEmail,
  maxLength,
  onSubmit,
  ...props
}: {
  email: string;
  updateEmail: Dispatch<string>;
  maxLength?: number;
  onSubmit?: () => void;
}) => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const translateKey = 'onboardEmail.';
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
            autoCapitalize='none'
            autoFocus
            variant='third'
            placeholder={translate(translateKey + 'emailPlaceholder')}
            value={email}
            updateValue={(val) => updateEmail(val.trim())}
            {...(maxLength !== undefined ? { maxLength } : {})}
            showLength={Boolean(maxLength)}
            onSubmitEditing={onSubmit}
          />
        </>
      </Container>
      <View style={styles.privacyPolicyContainer}>
        <Spacer spacing='small' orientation='horizontal' />
        <RNText style={{ fontSize: 10, fontFamily: FONT_FAMILY.regular, color: theme.base.medium }}>
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
export default Email;
