import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import {useTheme} from '../../hooks';
import {Theme} from '../../types';
import {DIMENS, SPACING} from '../../constants';
import Text from '../Text/Text';

export type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  curValue?: string;
  initial?: number;
  onToggle: (value: string) => void;
};

const ToggleSwitch = ({options, onToggle, curValue}: Props) => {
  const containerPosition = useState(new Animated.Value(0))[0];
  const [containerWidth, setContainerWidth] = useState();
  const {theme} = useTheme();

  const handleToggleSwitch = () => {
    Animated.timing(containerPosition, {
      toValue: curValue === options[0].value ? 0 : containerWidth / 2,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    containerWidth && handleToggleSwitch();
  }, [curValue]);

  const handleLayout = event => {
    const {width} = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  return (
    <View style={styles(theme).container} onLayout={handleLayout}>
      <TouchableOpacity
        style={styles(theme).option}
        onPress={() => onToggle(options[0].value)}>
        <Text color={theme.black} weight="medium" type="caption">
          {options[0].label}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles(theme).option}
        onPress={() => onToggle(options[1].value)}>
        <Text color={theme.black} weight="medium" type="caption">
          {options[1].label}
        </Text>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles(theme).containerIndicator,
          {transform: [{translateX: containerPosition}]},
        ]}>
        <View style={styles(theme).indicator} />
      </Animated.View>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      height: 35,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.glass,
      borderRadius: DIMENS.common.borderRadiusRound,
    },
    option: {
      flex: 1,
      alignItems: 'center',
    },

    containerIndicator: {
      position: 'absolute',
      height: '100%',
      width: '50%',
      padding: SPACING.tiny,
      zIndex: -1,
    },
    indicator: {
      backgroundColor: theme.white,
      width: '100%',
      height: '100%',
      borderRadius: DIMENS.common.borderRadiusRound,
    },
  });

export default ToggleSwitch;
