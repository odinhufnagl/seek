import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const WriteIconSVG = ({ fill = 'black', size = { width: '100%', height: '100%' } }) => {
  return (
    <View style={{ aspectRatio: 1, ...size }}>
      <Svg
        width={size.width}
        height={size.height}
        viewBox='0 0 25 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <Path
          d='M12.4004 20H21.4004'
          stroke={fill}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <Path
          d='M16.9004 3.5C17.2982 3.10217 17.8378 2.87868 18.4004 2.87868C18.679 2.87868 18.9548 2.93355 19.2122 3.04015C19.4696 3.14676 19.7034 3.30301 19.9004 3.5C20.0974 3.69698 20.2536 3.93083 20.3602 4.1882C20.4668 4.44557 20.5217 4.72142 20.5217 5C20.5217 5.27857 20.4668 5.55442 20.3602 5.81179C20.2536 6.06916 20.0974 6.30301 19.9004 6.5L7.40039 19L3.40039 20L4.40039 16L16.9004 3.5Z'
          stroke={fill}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </Svg>
    </View>
  );
};

export default WriteIconSVG;
