import React, {ComponentType} from 'react';
import {Animated} from 'react-native';

export const withAnimated = (
  WrappedComponent: React.ComponentType<any>,
): ComponentType => {
  class WithAnimated extends React.Component {
    render(): React.ReactNode {
      return <WrappedComponent {...this.props} />;
    }
  }
  return Animated.createAnimatedComponent(WithAnimated);
};
