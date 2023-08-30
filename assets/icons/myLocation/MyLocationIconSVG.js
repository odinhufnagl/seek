import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const MyLocationIconSvg = ({ fill = 'black', size = { width: '100%', height: '100%' } }) => {
  return (
    <View View style={{ aspectRatio: 1, ...size }}>
      <Svg
        width={size.width}
        height={size.height}
        viewBox='0 0 88 88'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <Path
          d='M44 28C35.16 28 28 35.16 28 44C28 52.84 35.16 60 44 60C52.84 60 60 52.84 60 44C60 35.16 52.84 28 44 28ZM79.76 40C77.92 23.32 64.68 10.08 48 8.24V0H40V8.24C23.32 10.08 10.08 23.32 8.24 40H0V48H8.24C10.08 64.68 23.32 77.92 40 79.76V88H48V79.76C64.68 77.92 77.92 64.68 79.76 48H88V40H79.76ZM44 72C28.52 72 16 59.48 16 44C16 28.52 28.52 16 44 16C59.48 16 72 28.52 72 44C72 59.48 59.48 72 44 72Z'
          fill={fill}
        />
      </Svg>
    </View>
  );
};

export default MyLocationIconSvg;
