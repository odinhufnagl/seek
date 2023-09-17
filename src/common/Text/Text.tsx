import React, { useEffect, useState } from 'react';
import { ColorValue, Text as RNText, StyleSheet, TextStyle, TouchableOpacity } from 'react-native';

import useTheme from '../../hooks/useTheme';
import { Theme } from '../../types';

export type TextProps = {
  type?: 'largeHeader' | 'header' | 'subHeader' | 'body' | 'caption' | 'small' | 'extraSmall';
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
  emphasis?: 'high' | 'medium' | 'low' | 'primary';
  color?: string;
  style?: TextStyle | TextStyle[];
  onPress?: () => void;
  numberOfLines?: number;
  children?: string;
  typeWriter?: boolean;
  typeWriterNumberOfLetters?: number;
  readMore?: boolean;
};

const Text: React.FC<TextProps> = ({
  type = 'body',
  weight,
  emphasis,
  color,
  style,
  children,
  onPress,
  typeWriter = false,
  typeWriterNumberOfLetters = 0,
  readMore,
  numberOfLines,
  ...props
}) => {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTextOverflown, setIsTextOverflown] = useState(false);
  const [totalNumberOfLines, setTotalNumberOfLines] = useState(0);
  const [typeWriterText, setTypeWriterText] = useState(
    children?.substring(0, children.length - typeWriterNumberOfLetters),
  );

  const toggleTextExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const [currentTypeWriterIndex, setCurrentTypeWriterIndex] = useState(
    (children?.length || 0) - typeWriterNumberOfLetters,
  );
  const typeWriterDelay = 300;
  useEffect(() => {
    if (!typeWriter || !children) {
      return;
    }
    if (currentTypeWriterIndex <= children.length) {
      const timeout = setTimeout(() => {
        setTypeWriterText((prevText) => prevText + children[currentTypeWriterIndex]);
        setCurrentTypeWriterIndex((prevIndex) => prevIndex + 1);
      }, typeWriterDelay);

      return () => clearTimeout(timeout);
    }
    setTypeWriterText(children?.substring(0, children.length - typeWriterNumberOfLetters));
    setCurrentTypeWriterIndex(children.length - typeWriterNumberOfLetters);
  }, [typeWriterText, typeWriterDelay, currentTypeWriterIndex]);

  const handleTextLayout = (e) => {
    const { lines } = e.nativeEvent;
    if (readMore && totalNumberOfLines === 0) {
      setTotalNumberOfLines(lines.length);
      if (numberOfLines && lines.length > numberOfLines) {
        setIsTextOverflown(true);
      } else {
        setIsTextOverflown(false);
      }
    }
  };

  const getColor = (): ColorValue | undefined => {
    if (color) {
      return color;
    }
    if (!emphasis) {
      return;
    }
    return {
      high: theme.base.high,
      medium: theme.base.medium,
      low: theme.base.low,
      primary: theme.base.primary,
    }[emphasis];
  };
  const textStyles = [
    styles(theme)[type],
    style,
    weight ? { fontFamily: FONT_FAMILY[weight] } : {},
    getColor() ? { color: getColor() } : {},
  ];

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <RNText style={textStyles} {...props}>
          {typeWriter ? typeWriterText : children}
        </RNText>
      </TouchableOpacity>
    );
  }
  return (
    <>
      <RNText
        style={textStyles}
        {...props}
        onTextLayout={handleTextLayout}
        numberOfLines={
          readMore ? (isExpanded || !totalNumberOfLines ? undefined : numberOfLines) : numberOfLines
        }
      >
        {typeWriter ? typeWriterText : children}
      </RNText>
      {readMore && isTextOverflown && (
        <RNText style={[textStyles, { opacity: 0.7 }]} onPress={toggleTextExpansion}>
          {isExpanded ? 'Read less' : 'Read more'}
        </RNText>
      )}
    </>
  );
};

export const FONT_FAMILY = {
  bold: 'Poppins-Bold',
  semiBold: 'Poppins-SemiBold',
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
};
export const FONT_SIZE = {
  BODY: 14,
  SUBHEADER: 16,
  HEADER: 22,
  LARGE_HEADER: 25,
  CAPTION: 12,
  SMALL: 10,
  EXTRA_SMALL: 8,
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    largeHeader: {
      fontSize: FONT_SIZE.LARGE_HEADER,
      fontFamily: FONT_FAMILY.bold,
    },
    header: {
      fontSize: FONT_SIZE.HEADER,
      fontFamily: FONT_FAMILY.semiBold,
      color: theme.base.primary,
    },
    subHeader: {
      fontSize: FONT_SIZE.SUBHEADER,
      fontFamily: FONT_FAMILY.medium,
      color: theme.base.medium,
    },
    body: {
      fontSize: FONT_SIZE.BODY,
      fontFamily: FONT_FAMILY.medium,
      color: theme.base.primary,
    },
    caption: {
      fontSize: FONT_SIZE.CAPTION,
      fontFamily: FONT_FAMILY.medium,
      color: theme.base.medium,
    },
    small: {
      fontSize: FONT_SIZE.SMALL,
      fontFamily: FONT_FAMILY.medium,
      color: theme.base.low,
    },
    extraSmall: {
      fontSize: FONT_SIZE.EXTRA_SMALL,
      fontFamily: FONT_FAMILY.semiBold,
      color: theme.base.high,
    },
  });

export default Text;
