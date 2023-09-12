import React, { Dispatch, MutableRefObject, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import AutoGrowingTextInput from 'react-native-autogrow-textinput-ts';
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
  variant?: 'primary' | 'secondary' | 'third' | 'fourth';
  rightIcon?: IconProps;
  inputRef?: MutableRefObject<TextInput | null>;
  disabled?: boolean;
  dropdown?: boolean;
  dropdownItems?: { title: string; value: any }[];
  dropdownValue?: any;
  updateDropdownValue?: any;
  autoGrow?: boolean;
  maxHeightAutoGrow?: number;
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
  inputRef,
  disabled,
  dropdown,
  dropdownItems,
  dropdownValue,
  updateDropdownValue,
  autoGrow,
  maxHeightAutoGrow = 100,
  variant = 'primary',
  ...props
}) => {
  const { theme } = useTheme();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const ref = useRef<TextInput>(null);

  const getInputStyle = () => {
    switch (variant) {
      case 'primary':
        return styles(theme).primaryInput;
      case 'secondary':
        return styles(theme).secondaryInput;
      case 'third':
        return styles(theme).thirdInput;
      case 'fourth':
        return styles(theme).fourthInput;
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
      case 'fourth':
        return styles(theme).fourthContainer;
      default:
        break;
    }
  };

  const handleDropdownItemPress = ({ title, value }) => {
    setIsDropdownVisible(false);
    inputRef && inputRef?.current?.blur();
    ref && ref?.current?.blur();
    updateValue(title);
    updateDropdownValue(value);
  };
  return (
    <>
      {title && (
        <>
          <Text emphasis='primary' type='small' weight='semiBold'>
            {title}
          </Text>
          <Spacer spacing='tiny' />
        </>
      )}
      <View
        style={[
          styles(theme).defaultContainer,
          getContainerStyle(),
          multiline && { height: 130, paddingTop: 10 },
          style,
        ]}
      >
        {autoGrow ? (
          <AutoGrowingTextInput
            allowFontScaling={false}
            editable={!disabled}
            ref={inputRef || ref}
            selectionColor={theme.base.primary}
            placeholderTextColor={theme.base.low}
            style={[getInputStyle(), style, { paddingTop: 5, paddingBottom: 5 }]}
            multiline={multiline || autoGrow}
            textAlignVertical={multiline ? 'top' : 'center'}
            value={value}
            placeholder={placeholder}
            maxLength={maxLength}
            onChangeText={updateValue}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
            onFocus={() => setIsDropdownVisible(true)}
            maxHeight={maxHeightAutoGrow}
            {...props}
          />
        ) : (
          <TextInput
            editable={!disabled}
            ref={inputRef || ref}
            selectionColor={theme.base.primary}
            placeholderTextColor={theme.base.low}
            style={[getInputStyle(), style]}
            multiline={multiline || autoGrow}
            textAlignVertical={multiline ? 'top' : 'center'}
            value={value}
            placeholder={placeholder}
            maxLength={maxLength}
            onChangeText={updateValue}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
            onFocus={() => setIsDropdownVisible(true)}
            {...props}
          />
        )}

        {rightIcon && (
          <>
            <Icon variant='third' fill={rightIcon.fill || theme.base.low} {...rightIcon} />
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
      {dropdown && isDropdownVisible && dropdownItems && dropdownItems?.length > 0 && (
        <FlatList
          keyboardShouldPersistTaps='always'
          style={styles(theme).dropdown}
          data={dropdownItems}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleDropdownItemPress(item)}
              style={styles(theme).dropdownItem}
            >
              <Text emphasis='high' weight='medium' type='caption'>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
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
    dropdown: {
      marginTop: SPACING.small,
      borderRadius: DIMENS.common.borderRadiusMedium,
      backgroundColor: theme.background.secondary,
      paddingHorizontal: SPACING.medium,
      paddingVertical: SPACING.small,
      flexGrow: 0,
      top: 0,
      zIndex: 1000,
    },
    dropdownItem: {
      paddingVertical: 12,
    },
    primaryContainer: {
      minHeight: 40,
      borderRadius: 20,
      backgroundColor: theme.background.third,
    },
    secondaryContainer: {
      minHeight: 60,
      backgroundColor: 'transparent',
    },
    thirdContainer: {
      minHeight: 60,
      backgroundColor: 'transparent',
    },
    fourthContainer: {
      minHeight: 50,
      backgroundColor: theme.background.third,
      borderRadius: DIMENS.common.borderRadiusMedium,
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
    fourthInput: {
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
    bottomContainer: {
      width: '100%',
      alignItems: 'flex-end',
    },
  });

export default Input;
