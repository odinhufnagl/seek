import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SPACING } from '../../constants';

type Props = {
  style?: ViewStyle | ViewStyle[];
  children: JSX.Element;
};

const Container: React.FC<Props> = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    paddingHorizontal: SPACING.large,
    paddingBottom: SPACING.large,
  },
});

export default Container;
