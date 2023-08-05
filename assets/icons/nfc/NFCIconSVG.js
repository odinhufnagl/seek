import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const NFCIconSVG = ({
  fill = 'black',
  size = {width: '100%', height: '100%'},
}) => {
  return (
    <View style={{aspectRatio: 1, ...size}}>
      <Svg
        width={size.width}
        height={size.height}
        viewBox="0 0 47 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M29 9C31.3869 9 33.6761 9.94821 35.364 11.636C37.0518 13.3239 38 15.6131 38 18"
          stroke={fill}
          strokeOpacity="0.9"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M29 2C33.2435 2 37.3131 3.68571 40.3137 6.68629C43.3143 9.68687 45 13.7565 45 18"
          stroke={fill}
          strokeOpacity="0.9"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M28.334 15.666H11.6673C9.82637 15.666 8.33398 17.3076 8.33398 19.3327V48.666C8.33398 50.6911 9.82637 52.3327 11.6673 52.3327H28.334C30.1749 52.3327 31.6673 50.6911 31.6673 48.666V19.3327C31.6673 17.3076 30.1749 15.666 28.334 15.666Z"
          stroke={fill}
          strokeOpacity="0.9"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M20 45H20.0163"
          stroke={fill}
          strokeOpacity="0.9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default NFCIconSVG;
