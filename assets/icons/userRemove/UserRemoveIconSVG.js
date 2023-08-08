import * as React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
const UserRemoveIconSVG = ({ fill = 'black', size = { width: '100%', height: '100%' } }) => {
  return (
    <View style={{ aspectRatio: 1, ...size }}>
      <Svg
        width={size.width}
        height={size.height}
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <G clipPath='url(#clip0_508_5473)'>
          <Path
            d='M13.334 17.5V15.8333C13.334 14.9493 12.9828 14.1014 12.3577 13.4763C11.7326 12.8512 10.8847 12.5 10.0007 12.5H4.16732C3.28326 12.5 2.43542 12.8512 1.8103 13.4763C1.18517 14.1014 0.833984 14.9493 0.833984 15.8333V17.5'
            stroke={fill}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <Path
            d='M7.08333 9.16667C8.92428 9.16667 10.4167 7.67428 10.4167 5.83333C10.4167 3.99238 8.92428 2.5 7.08333 2.5C5.24238 2.5 3.75 3.99238 3.75 5.83333C3.75 7.67428 5.24238 9.16667 7.08333 9.16667Z'
            stroke={fill}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <Path
            d='M15 6.66667L19.1667 10.8333'
            stroke={fill}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <Path
            d='M19.1667 6.66667L15 10.8333'
            stroke={fill}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </G>
      </Svg>
    </View>
  );
};

export default UserRemoveIconSVG;