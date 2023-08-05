import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const PlusIconSVG = ({
  fill = 'black',
  size = {width: '100%', height: '100%'},
}) => {
  return (
    <View style={{aspectRatio: 1, ...size}}>
      <Svg
        width={size.width}
        height={size.height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M12 5V19"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M5 12H19"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default PlusIconSVG;
