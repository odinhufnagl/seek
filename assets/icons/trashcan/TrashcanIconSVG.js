import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const TrashcanIconSvg = ({ fill = 'black', size = { width: '100%', height: '100%' } }) => {
  return (
    <View View style={{ aspectRatio: 1, ...size }}>
      <Svg
        width={size.width}
        height={size.height}
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <Path
          d='M19 4.582C15.67 4.285 12.32 4.132 8.98 4.132C7 4.132 5.02 4.222 3.04 4.402L1 4.582M6.5 3.673L6.72 2.494C6.88 1.639 7 1 8.69 1H11.31C13 1 13.13 1.675 13.28 2.503L13.5 3.673M16.85 7.426L16.2 16.489C16.09 17.902 16 19 13.21 19H6.79C4 19 3.91 17.902 3.8 16.489L3.15 7.426M8.33 14.05H11.66M7.5 10.45H12.5'
          stroke={fill}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </Svg>
    </View>
  );
};

export default TrashcanIconSvg;
