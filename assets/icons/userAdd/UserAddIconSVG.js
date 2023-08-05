import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const UserAddIconSVG = ({
  fill = 'black',
  size = { width: '100%', height: '100%' }
}) => {
  return (
    <View style={{ aspectRatio: 1, ...size }}>
      <Svg
        width={size.width}
        height={size.height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M3 19C3 16.7909 5.68629 15 9 15C12.3137 15 15 16.7909 15 19"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M18 16C18 16.5523 18.4477 17 19 17C19.5523 17 20 16.5523 20 16H18ZM20 10C20 9.44772 19.5523 9 19 9C18.4477 9 18 9.44772 18 10H20ZM20 16V10H18V16H20Z"
          fill="white"
        />
        <Path
          d="M16 12C15.4477 12 15 12.4477 15 13C15 13.5523 15.4477 14 16 14L16 12ZM22 14C22.5523 14 23 13.5523 23 13C23 12.4477 22.5523 12 22 12V14ZM16 14L22 14V12L16 12L16 14Z"
          fill="white"
        />
        <Path
          d="M9 12C11.2091 12 13 10.2091 13 8C13 5.79086 11.2091 4 9 4C6.79086 4 5 5.79086 5 8C5 10.2091 6.79086 12 9 12Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default UserAddIconSVG;
