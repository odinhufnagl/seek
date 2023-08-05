import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {DIMENS, SPACING} from '../../constants';
import useTheme from '../../hooks/useTheme';
import {Theme} from '../../types/theme';
import Icon, {IconProps} from '../Icon/Icon';
import Spacer from '../Spacer/Spacer';
import Text from '../Text/Text';
export type ButtonProps = {
  title?: string;
  onPress?: () => void;
  onLongPress?: () => void;
  onPressOut?: () => void;
  style?: ViewStyle | ViewStyle[];
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'third' | 'fourth';
  loading?: boolean;
  size?: 'large' | 'medium';
  width?: 'max' | 'standard';
  id?: string;
  textStyle?: ViewStyle | ViewStyle[];
  leftIcon?: IconProps;
  rightIcon?: IconProps;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  disabled,
  variant,
  loading,
  size = 'medium',
  leftIcon,
  rightIcon,
  id,
  textStyle,
  width = 'standard',
  onLongPress,
  onPressOut,
  ...props
}) => {
  const {theme} = useTheme();

  const getViewStyle = () => {
    switch (variant) {
      case 'primary':
        return styles(theme).primaryButton;
      case 'secondary':
        return styles(theme).secondaryButton;
      case 'third':
        return styles(theme).thirdButton;
      case 'fourth':
        return styles(theme).fourthButton;
      default:
        return styles(theme).primaryButton;
    }
  };

  const getTextColor = () => {
    if (disabled) {
      return theme.base.low;
    }
    switch (variant) {
      case 'primary':
        return theme.base.primary;
      case 'secondary':
        return theme.base.primary;
      case 'third':
        return theme.base.primary;
      case 'fourth':
        return theme.black;
      default:
        return theme.base.primary;
    }
  };

  const getTextType = () => {
    switch (variant) {
      case 'primary':
        return 'body';
      case 'secondary':
        return 'body';
      case 'third':
        return 'body';
      case 'fourth':
        return 'caption';
      default:
        return 'body';
    }
  };

  const getWidth = () => {
    switch (width) {
      case 'max':
        return styles(theme).maxWidth;
      default:
        return {};
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.7}
      onPress={disabled ? () => undefined : onPress}
      disabled={loading ?? disabled}
      onLongPress={onLongPress}
      onPressOut={onPressOut}
      key={id}
      style={[
        styles(theme).defaultStyle,
        getViewStyle(),
        getWidth(),
        style,
        disabled && styles(theme).disabledButton,
      ]}
      {...props}>
      <View>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <View style={styles(theme).contentContainer}>
            {rightIcon && (
              <>
                <Icon variant="third" {...rightIcon} />
                <Spacer orientation="horizontal" spacing="small" />
              </>
            )}
            <Text type={getTextType()} style={textStyle} color={getTextColor()}>
              {title || ''}
            </Text>
            {leftIcon && (
              <>
                <Spacer orientation="horizontal" spacing="medium" />
                <Icon variant="third" {...leftIcon} />
              </>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
const styles = (theme: Theme) =>
  StyleSheet.create({
    defaultStyle: {
      borderRadius: DIMENS.common.borderRadiusMedium,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    primaryButton: {
      backgroundColor: theme.brand,
      height: 48,
      width: '100%',
    },
    secondaryButton: {
      backgroundColor: theme.brand,
      borderRadius: DIMENS.common.borderRadiusRound,
      height: 40,
      minWidth: 130,
      paddingHorizontal: SPACING.medium,
    },
    thirdButton: {
      backgroundColor: theme.background.secondary,
      borderRadius: DIMENS.common.borderRadiusRound,
      height: 40,
      minWidth: 130,
      paddingHorizontal: SPACING.medium,
    },
    fourthButton: {
      backgroundColor: theme.base.low,
      paddingHorizontal: SPACING.medium,
      borderRadius: DIMENS.common.borderRadiusRound,
      height: 35,
    },
    disabledButton: {
      backgroundColor: theme.disabled,
    },
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    sizeMedium: {
      height: 38,
      paddingHorizontal: 37,
    },
    sizeLarge: {
      height: 48,
      paddingHorizontal: 45,
    },
    maxWidth: {
      width: '100%',
    },
  });

export default Button;
