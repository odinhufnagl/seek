import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Input, Text } from '../../../common';
import { translate } from '../../../i18n';

const About = ({
  about,
  setAbout,
  ...props
}: {
  about: string;
  setAbout: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const translateKey = 'onboardAbout.';
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
        <Input value={about} updateValue={setAbout} multiline={true} />
      </View>
    </Container>
  );
};

export default About;
