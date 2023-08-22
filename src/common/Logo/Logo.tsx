import React from 'react';
import { Image, ImageStyle, StyleSheet } from 'react-native';
import { DIMENS } from '../../constants';

const Logo = ({
  size = 'medium',
  style,
  ...props
}: {
  size?: 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';
  style?: ImageStyle;
}) => {
  const baseUrl = '../../../assets/images/logo/';

  return (
    <Image
      style={[styles[size], style]}
      source={require(baseUrl + './logo.png')}
      resizeMode='cover'
      {...props}
    />
  );
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
