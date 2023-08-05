import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const FlashOffIconSvg = ({
  fill = 'black',
  size = {width: '100%', height: '100%'},
}) => {
  return (
    <View View style={{aspectRatio: 1, ...size}}>
      <Svg
        width={size.width}
        height={size.height}
        viewBox="0 0 18 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M9.88889 1L1 12.4H9L8.11111 20L17 8.6H9L9.88889 1Z"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default FlashOffIconSvg;
