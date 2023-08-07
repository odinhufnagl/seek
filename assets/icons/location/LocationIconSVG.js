import * as React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const LocationIconSvg = ({ fill = 'black', size = { width: '100%', height: '100%' } }) => {
  return (
    <View View style={{ aspectRatio: 1, ...size }}>
      <Svg
        width={size.width}
        height={size.height}
        viewBox='0 0 5 10'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <Path
          d='M2 5H3V9.5C3 9.77614 2.77614 10 2.5 10C2.22386 10 2 9.77614 2 9.5V5Z'
          fill={fill}
        />
        <Circle cx='2.5' cy='2.5' r='2.5' fill={fill} />
      </Svg>
    </View>
  );
};

export default LocationIconSvg;
