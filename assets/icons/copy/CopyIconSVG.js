import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const CopyIconSVG = ({ fill = 'black', size = { width: '100%', height: '100%' } }) => {
  return (
    <View style={{ aspectRatio: 1, ...size }}>
      <Svg
        width={size.width}
        height={size.height}
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <Path
          d='M17.3077 8H9.69231C8.75767 8 8 8.75767 8 9.69231V17.3077C8 18.2423 8.75767 19 9.69231 19H17.3077C18.2423 19 19 18.2423 19 17.3077V9.69231C19 8.75767 18.2423 8 17.3077 8Z'
          stroke={fill}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <Path
          d='M3.53846 12H2.69231C2.24348 12 1.81303 11.8217 1.49567 11.5043C1.1783 11.187 1 10.7565 1 10.3077V2.69231C1 2.24348 1.1783 1.81303 1.49567 1.49567C1.81303 1.1783 2.24348 1 2.69231 1H10.3077C10.7565 1 11.187 1.1783 11.5043 1.49567C11.8217 1.81303 12 2.24348 12 2.69231V3.53846'
          stroke={fill}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </Svg>
    </View>
  );
};

export default CopyIconSVG;
