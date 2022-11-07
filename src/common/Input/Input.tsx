import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import { Spacer, Text } from '..';
import { DIMENS, SPACING } from '../../constants';
import useTheme from '../../hooks/useTheme';
import { ITheme } from '../../types/theme';
import { FONT_FAMILY } from '../Text/Text';

type Props = {
  multiline?: boolean;
  value: string;
  updateValue: Dispatch<string>;
  showLength?: boolean;
  maxLength?: number;
  placeholder?: string;
  title?: string;
  style?: ViewStyle | ViewStyle[];
  secureTextEntry?: boolean;
};

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
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <>
      {title && (
        <Text style={{ color: theme.textHighColor }} type='small' weight='semiBold'>
          {title}
        </Text>
      )}
      <View style={[styles(theme).defaultContainer, multiline && { height: 130 }, style]}>
        <TextInput
          placeholderTextColor={theme.textLowColor}
          style={[styles(theme).input, style]}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          onChangeText={updateValue}
          secureTextEntry={secureTextEntry}
          {...props}
        />
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

const styles = (theme: ITheme) =>
  StyleSheet.create({
    defaultContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.primaryColor,
      height: 48,
      borderRadius: DIMENS.common.borderRadiusMedium,
    },
    input: {
      paddingLeft: SPACING.medium,
      height: '100%',
      flex: 1,
      textAlign: 'left',
      color: theme.textHighColor,
      fontFamily: FONT_FAMILY.regular,
    },
    bottomContainer: {
      width: '100%',
      alignItems: 'flex-end',
    },
  });

export default Input;
