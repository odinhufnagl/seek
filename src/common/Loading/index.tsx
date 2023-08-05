import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from '../../hooks';

type Props = {
  orientation?: 'vertical' | 'horizontal';
  spacing?: 'tiny' | 'small' | 'medium' | 'large' | 'extraLarge' | number;
};

const Loading: React.FC<Props> = ({}) => {
  const {theme} = useTheme();
  return <ActivityIndicator color={theme.brand} size={30} />;
};

export default Loading;
