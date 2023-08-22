import React, { Dispatch } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Input, Text } from '../../../common';
import { translate } from '../../../i18n';
import Spacer from './../../../common/Spacer/Spacer';

const About = ({
  about,
  updateAbout,
  maxLength = 0,
  onSubmit,
  ...props
}: {
  about: string;
  updateAbout: Dispatch<string>;
  maxLength?: number;
  onSubmit?: () => void;
}) => {
  const translateKey = 'onboardAbout.';
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
          value={about}
          updateValue={updateAbout}
          multiline
          autoFocus
          variant='third'
          // {...(maxLength ? { maxLength } : {})}
          //  showLength={Boolean(maxLength)}
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

export default About;
