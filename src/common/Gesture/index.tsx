import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
type Props = {
  style?: ViewStyle | ViewStyle[];
  children: JSX.Element;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
};

const Gesture: React.FC<Props> = ({
  children,
  style,
  onSwipeLeft,
  onSwipeRight,
}) => {
  return (
    <GestureRecognizer
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      style={{flex: 1}}>
      <View style={[styles.container, style]}>{children}</View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Gesture;
