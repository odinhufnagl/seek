import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const LogOutIconSvg = ({ fill = 'black', size = { width: '100%', height: '100%' } }) => {
  return (
    <View View style={{ aspectRatio: 1, ...size }}>
      <Svg
        viewBox='0 0 16 16'
        xmlns='http://www.w3.org/2000/svg'
        width={size.width}
        height={size.height}
        fill='none'
      >
        <Path
          d='M5.675 4.66999C5.9075 1.96999 7.295 0.867493 10.3325 0.867493H10.43C13.7825 0.867493 15.125 2.20999 15.125 5.56249V10.4525C15.125 13.805 13.7825 15.1475 10.43 15.1475H10.3325C7.3175 15.1475 5.93 14.06 5.6825 11.405M10.25 7.99999H1.715M3.3875 5.48749L0.875 7.99999L3.3875 10.5125'
          stroke={fill}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </Svg>
    </View>
  );
};

export default LogOutIconSvg;
