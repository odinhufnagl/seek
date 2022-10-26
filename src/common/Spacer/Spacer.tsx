import React from 'react';
import { View } from 'react-native';
import { SPACING } from '../../constants';

type Props = {
  orientation?: 'vertical' | 'horizontal';
  spacing?: 'tiny' | 'small' | 'medium' | 'large' | 'extraLarge' | number;
};

const Spacer: React.FC<Props> = ({ orientation = 'vertical', spacing = 'medium' }) => {
  return (
    <View
      style={{
        [orientation === 'vertical' ? 'height' : 'width']:
          typeof spacing === 'string' ? SPACING[spacing] : spacing,
      }}
    />
  );
};

export default Spacer;
