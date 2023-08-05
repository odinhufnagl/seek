import React, { Dispatch } from 'react';
import { StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { Spacer, Text } from '..';
import { DIMENS, SPACING } from '../../constants';
import useTheme from '../../hooks/useTheme';
import { Theme } from '../../types/theme';
import Icon, { IconProps } from '../Icon/Icon';
import { FONT_FAMILY, FONT_SIZE } from '../Text/Text';

interface Props extends TextInputProps {
  multiline?: boolean;
  value: string;
  updateValue: Dispatch<string>;
  showLength?: boolean;
  maxLength?: number;
  placeholder?: string;
  title?: string;
  style?: ViewStyle | ViewStyle[];
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  variant?: 'primary' | 'secondary' | 'third';
  rightIcon?: IconProps;
}

const Input: React.FC<Props> = ({
  style,
  multiline,
  value,
  updateValue,
  title,
  placeholder,
  showLength,
  maxLength,
  secureTextEntry,
  autoCapitalize,
  rightIcon,
  variant = 'primary',
  ...props
}) => {
  const { theme } = useTheme();

  const getInputStyle = () => {
    switch (variant) {
      case 'primary':
        return styles(theme).primaryInput;
      case 'secondary':
        return styles(theme).secondaryInput;
      case 'third':
        return styles(theme).thirdInput;
      default:
        break;
    }
  };
  const getContainerStyle = () => {
    switch (variant) {
      case 'primary':
        return styles(theme).primaryContainer;
      case 'secondary':
        return styles(theme).secondaryContainer;
      case 'third':
        return styles(theme).thirdContainer;
      default:
        break;
    }
  };
  return (
    <>
      {title && (
        <Text style={{ color: theme.base.high }} type='small' weight='semiBold'>
          {title}
        </Text>
      )}
      <View
        style={[
          styles(theme).defaultContainer,
          getContainerStyle(),
          multiline && { height: 130 },
          style,
        ]}
      >
        <TextInput
          selectionColor={theme.base.primary}
          placeholderTextColor={theme.base.low}
          style={[getInputStyle(), style]}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          onChangeText={updateValue}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          {...props}
        />
        {rightIcon && (
          <>
            <Icon variant='third' fill={theme.base.low} {...rightIcon} />
            <Spacer spacing='medium' orientation='horizontal' />
          </>
        )}
      </View>

      {showLength && (
        <View style={styles(theme).bottomContainer}>
          <Spacer spacing='tiny' />
          <Text type='small' emphasis='low'>{`${value.length}/${maxLength}`}</Text>
        </View>
      )}
    </>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    defaultContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    primaryContainer: {
      height: 40,
      borderRadius: DIMENS.common.borderRadiusRound,
      backgroundColor: theme.background.third,
    },
    secondaryContainer: {
      height: 60,
      backgroundColor: 'transparent',
    },
    thirdContainer: {
      height: 60,
      backgroundColor: 'transparent',
    },
    primaryInput: {
      paddingLeft: SPACING.medium,
      height: '100%',
      flex: 1,
      textAlign: 'left',
      color: theme.base.high,
      fontFamily: FONT_FAMILY.medium,
      fontSize: FONT_SIZE.BODY,
      paddingTop: 0,
      paddingBottom: 0,
    },
    secondaryInput: {
      height: '100%',
      flex: 1,
      color: theme.base.high,
      fontFamily: FONT_FAMILY.medium,
      fontSize: FONT_SIZE.LARGE_HEADER,
      textAlign: 'center',
    },
    thirdInput: {
      height: '100%',
      flex: 1,
      color: theme.base.high,
      fontFamily: FONT_FAMILY.medium,
      fontSize: FONT_SIZE.SUBHEADER,
      textAlign: 'left',
    },
    bottomContainer: {
      width: '100%',
      alignItems: 'flex-end',
    },
  });

export default Input;
