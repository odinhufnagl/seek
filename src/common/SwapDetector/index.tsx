import React from 'react';
import {useRef} from 'react';
import {View, PanResponder} from 'react-native';
const SwapDetector = ({children, onSwipeLeft, onSwipeRight}) => {
  const panResponder = useRef(
    PanResponder.create({
      onPanResponderRelease: (event, gestureState) => {
        console.log('gesture', gestureState);
        if (gestureState.dx > 100) {
          // Swiped from left to right (swap right)
          onSwipeRight();
        } else if (gestureState.dx < -100) {
          // Swiped from right to left (swap left)
          onSwipeLeft();
        }
      },
    }),
  ).current;

  return (
    <View style={{flex: 1}} {...panResponder.panHandlers}>
      {children}
    </View>
  );
};

export default SwapDetector;
