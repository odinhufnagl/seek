import React, { Dispatch } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Input, Text } from '../../../common';
import { translate } from '../../../i18n';

const About = ({
  about,
  updateAbout,
  maxLength = 0,
  ...props
}: {
  about: string;
  updateAbout: Dispatch<string>;
  maxLength?: number;
}) => {
  const translateKey = 'onboardAbout.';
  return (
    <Container style={styles.center} {...props}>
      <View>
        <Text type='header' weight='bold'>
          {translate(translateKey + 'header')}
        </Text>
        <Text type='body' weight='medium'>
          {translate(translateKey + 'subTitle')}
        </Text>
        <Input
          placeholder={translate(translateKey + 'header')}
          value={about}
          updateValue={updateAbout}
          multiline={true}
          {...(maxLength ? { maxLength } : {})}
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

export default About;
