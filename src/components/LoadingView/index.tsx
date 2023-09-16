import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Loading } from '../../common';
import { useTheme } from '../../hooks';
import { Theme } from '../../types';

type Props = {
  orientation?: 'vertical' | 'horizontal';
  spacing?: 'tiny' | 'small' | 'medium' | 'large' | 'extraLarge' | number;
};

const LoadingView: React.FC<Props> = () => {
  const { theme } = useTheme();
  return (
    <View style={styles(theme).container}>
      <Loading />
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default LoadingView;
