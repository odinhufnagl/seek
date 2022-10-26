import React from 'react';
import { StyleSheet, Text as RNText, TextStyle } from 'react-native';

import useTheme from '../../hooks/useTheme';

type Props = {
  type?: 'largeHeader' | 'header' | 'subHeader' | 'body' | 'small';
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
  emphasis?: 'high' | 'medium' | 'low';
  color?: string;
  style?: TextStyle | TextStyle[];
  children: string;
};

const Text: React.FC<Props> = ({
  type = 'body',
  weight,
  emphasis = 'high',
  color,
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  const getColor = () => {
    if (color) {
      return color;
    }
    return { high: theme.textHighColor, medium: theme.textMediumColor, low: theme.textLowColor }[
      emphasis
    ];
  };

  const getDefaultStyle = () => {
    if (!weight) {
      return { color: getColor() };
    }
    return { color: getColor(), fontFamily: FONT_FAMILY[weight] };
  };
  return (
    <RNText style={[styles()[type], getDefaultStyle(), style]} {...props}>
      {children}
    </RNText>
  );
};

export const FONT_FAMILY = {
  bold: 'Poppins-Bold',
  semiBold: 'Poppins-SemiBold',
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
};

const styles = () =>
  StyleSheet.create({
    largeHeader: {
      fontSize: 25,
      fontFamily: FONT_FAMILY.bold,
    },
    header: {
      fontSize: 22,
      fontFamily: FONT_FAMILY.bold,
    },
    subHeader: {
      fontSize: 18,
      fontFamily: FONT_FAMILY.medium,
    },
    body: {
      fontSize: 14,
      fontFamily: FONT_FAMILY.regular,
    },
    small: {
      fontSize: 10,
      fontFamily: FONT_FAMILY.semiBold,
    },
  });

export default Text;
