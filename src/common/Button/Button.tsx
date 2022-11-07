import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { DIMENS, SPACING } from '../../constants';
import useTheme from '../../hooks/useTheme';
import { ITheme } from '../../models/Theme';
import Text from '../Text/Text';

type Props = {
  title?: string;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'third';
  loading?: boolean;
  size?: 'large' | 'medium';
  width?: 'max' | 'standard';
  id?: string;
  textStyle?: ViewStyle | ViewStyle[];
};

const Button: React.FC<Props> = ({
  title,
  onPress,
  style,
  disabled,
  variant,
  loading,
  size = 'medium',
  id,
  textStyle,
  width = 'standard',
  ...props
}) => {
  const { theme } = useTheme();

  const getViewStyle = () => {
    switch (variant) {
      case 'primary':
        return styles(theme).primaryButton;
      case 'secondary':
        return styles(theme).secondaryButton;
      case 'third':
        return styles(theme).thirdButton;
      default:
        return styles(theme).primaryButton;
    }
  };

  const getSize = () => {
    switch (size) {
      case 'large':
        return styles(theme).sizeLarge;
      case 'medium':
        return styles(theme).sizeMedium;
      default:
        return styles(theme).sizeMedium;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return theme.primaryColor;
      case 'secondary':
        return theme.brandColor;
      case 'third':
        return theme.brandColor;
      default:
        return theme.primaryColor;
    }
  };

  const getTextWeight = () => {
    switch (size) {
      case 'medium':
        return 'medium';
      case 'large':
        return 'semiBold';
    }
  };

  const getWidth = () => {
    switch (width) {
      case 'max':
        return styles(theme).maxWidth;
      case 'standard':
        return styles(theme).standardWidth;
      default:
        return styles(theme).standardWidth;
    }
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.7}
        onPress={disabled ? () => undefined : onPress}
        disabled={loading ?? disabled}
        key={id}
        {...props}
      >
        <View style={[styles(theme).defaultStyle, getViewStyle(), getWidth(), getSize(), style]}>
          {loading ? (
            <ActivityIndicator color='white' />
          ) : (
            <View style={styles(theme).contentContainer}>
              <Text type='body' style={textStyle} color={getTextColor()} weight={getTextWeight()}>
                {title || ''}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = (theme: ITheme) =>
  StyleSheet.create({
    defaultStyle: {
      borderRadius: DIMENS.common.borderRadiusRound,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    primaryButton: {
      backgroundColor: theme.brandColor,
    },
    secondaryButton: {
      backgroundColor: theme.primaryColor,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.transparent,
    },
    thirdButton: {
      backgroundColor: theme.transparent,
    },
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    sizeMedium: {
      height: 34,
    },
    sizeLarge: {
      height: 42,
    },
    maxWidth: {
      width: '100%',
    },
    standardWidth: {
      paddingHorizontal: 40,
    },
  });

export default Button;
