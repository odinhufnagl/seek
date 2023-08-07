import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ChevronDownIconSVG = ({ fill = 'black', size = { width: '100%', height: '100%' } }) => {
  return (
    <View style={{ aspectRatio: 1, ...size }}>
      <Svg
        width={size.width}
        height={size.height}
        viewBox='0 0 19 9'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <Path
          d='M1 1L9.5 8L18 1'
          stroke={fill}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </Svg>
    </View>
  );
};

export default ChevronDownIconSVG;
