import React, { Dispatch } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Input, Spacer, Text } from '../../../common';
import { translate } from '../../../i18n';

const Name = ({
  name,
  updateName,
  maxLength,
  onSubmit,
  ...props
}: {
  name: string;
  updateName: Dispatch<string>;
  maxLength?: number;
  onSubmit?: () => void;
}) => {
  const translateKey = 'onboardName.';
  return (
    <Container style={styles.center} {...props}>
      <>
        <Spacer spacing={100} />
        <Text type='header' weight='bold' style={{ textAlign: 'center' }}>
          {translate(translateKey + 'header')}
        </Text>
        <Spacer spacing='small' />

        <Text
          emphasis='medium'
          type='body'
          weight='regular'
          style={{ textAlign: 'center', width: '60%' }}
        >
          {translate(translateKey + 'subTitle')}
        </Text>

        <Spacer spacing='extraLarge' />
        <Input
          variant='secondary'
          autoFocus
          value={name}
          updateValue={updateName}
          autoCapitalize='words'
          onSubmitEditing={onSubmit}
          // {...(maxLength !== undefined ? { maxLength } : {})}
          // showLength={Boolean(maxLength)}
        />
      </>
    </Container>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
});
export default Name;
