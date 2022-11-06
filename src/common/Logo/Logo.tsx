import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { DIMENS } from '../../constants';

const Logo = ({
  size = 'medium',
}: {
  size?: 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';
}) => {
  const baseUrl = '../../../assets/images/logo/';

  return <Image style={styles[size]} source={require(baseUrl + './logo3x.png')} />;
};

const { extraSmall, small, medium, large, extraLarge } = DIMENS.logo;

const styles = StyleSheet.create({
  extraSmall,
  small,
  medium,
  large,
  extraLarge,
});

export default Logo;
