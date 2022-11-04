import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Input, Text } from '../../../common';
import { translate } from '../../../i18n';

const Name = ({
  name,
  setName,
  ...props
}: {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const translateKey = 'onboardName.';
  return (
    <Container
      style={{
        justifyContent: 'center',
      }}
      {...props}
    >
      <View>
        <Text type='header' weight='bold'>
          {translate(translateKey + 'header')}
        </Text>
        <Text type='body' weight='medium'>
          {translate(translateKey + 'subTitle')}
        </Text>
        <Input value={name} updateValue={setName} maxLength={20} showLength={true} />
      </View>
    </Container>
  );
};

export default Name;
