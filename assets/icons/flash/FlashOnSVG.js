import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const FlashOnIconSvg = ({
  fill = 'black',
  size = {width: '100%', height: '100%'},
}) => {
  return (
    <View View style={{aspectRatio: 1, ...size}}>
      <Svg
        width={size.width}
        height={size.height}
        viewBox="0 0 16 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M8.88889 0L0 11.4H8L7.11111 19L16 7.6H8L8.88889 0Z"
          fill={fill}
        />
      </Svg>
    </View>
  );
};

export default FlashOnIconSvg;
