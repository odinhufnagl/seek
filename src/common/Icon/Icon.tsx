import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {icons} from '../../../assets/icons/index';

import {DIMENS} from '../../constants';
import useTheme from '../../hooks/useTheme';
import {IconSize, IconVariant, Theme} from '../../types';
export type IconProps = {
  icon: IconVariant;
  variant?: 'primary' | 'secondary' | 'third';
  fill?: string;
  size?: IconSize | number;
  style?: ViewStyle;
  onPress?: () => void;
};

type IconViewProps = {fill: string; size: {width: any; height: any}};
const Icon: React.FC<IconProps> = props => {
  const {theme} = useTheme();
  const {icon, fill, size, style, variant, onPress} = props;

  const getViewStyle = (): ViewStyle => {
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
  const getIconSize = () => {
    if (size) {
      switch (size) {
        case 'small':
          return DIMENS.icon.small;
        case 'extraSmall':
          return DIMENS.icon.extraSmall;
        case 'medium':
          return DIMENS.icon.medium;
        case 'large':
          return DIMENS.icon.large;
        case 'extraLarge':
          return DIMENS.icon.extraLarge;
        default:
          return {width: size, height: size};
      }
    }
    switch (variant) {
      case 'primary':
        return DIMENS.icon.medium;
      case 'secondary':
        return DIMENS.icon.large;
      case 'third':
        return DIMENS.icon.extraLarge;
      default:
        return DIMENS.icon.medium;
    }
  };

  const IconView: React.FC<IconViewProps> = icons[icon];

  const getIconColor = () => {
    if (fill) {
      return fill;
    }
    switch (variant) {
      case 'primary':
        return theme.white;
      case 'secondary':
        return theme.black;
      case 'third':
        return theme.white;
      default:
        return theme.white;
    }
  };

  return IconView ? (
    onPress ? (
      <TouchableOpacity
        onPress={onPress}
        style={[styles(theme).defaultStyle, getViewStyle(), style]}>
        <IconView fill={getIconColor()} size={getIconSize()} />
      </TouchableOpacity>
    ) : (
      <View style={[styles(theme).defaultStyle, getViewStyle(), style]}>
        <IconView fill={getIconColor()} size={getIconSize()} />
      </View>
    )
  ) : (
    <Text>Missing icon</Text>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    defaultStyle: {
      borderRadius: DIMENS.common.borderRadiusRound,
      justifyContent: 'center',
      alignItems: 'center',
    },
    primaryButton: {
      backgroundColor: theme.brand,
      height: 60,
      width: 60,
    },
    secondaryButton: {
      backgroundColor: theme.glass,
      borderRadius: DIMENS.common.borderRadiusRound,
      height: 45,
      width: 45,
    },
    thirdButton: {},
  });

export default Icon;
