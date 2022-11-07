import React, { Dispatch } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Input, Spacer, Text } from '../../../common';
import { translate } from '../../../i18n';

const Name = ({
  name,
  updateName,
  maxLength,
  ...props
}: {
  name: string;
  updateName: Dispatch<string>;
  maxLength?: number;
}) => {
  const translateKey = 'onboardName.';
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
          placeholder={translate(translateKey + 'header')}
          value={name}
          updateValue={updateName}
          {...(maxLength !== undefined ? { maxLength } : {})}
          showLength={Boolean(maxLength)}
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
export default Name;
