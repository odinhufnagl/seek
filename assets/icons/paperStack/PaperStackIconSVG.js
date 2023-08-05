import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const PaperStackIconSVG = ({
  fill = 'black',
  size = {width: '100%', height: '100%'},
}) => {
  return (
    <View style={{aspectRatio: 1, ...size}}>
      <Svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M11 1L1 6L11 11L21 6L11 1Z"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M1 16L11 21L21 16"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M1 11L11 16L21 11"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default PaperStackIconSVG;
