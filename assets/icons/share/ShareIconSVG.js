import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ShareIconSVG = ({ fill = 'black', size = { width: '100%', height: '100%' } }) => {
  return (
    <View style={{ aspectRatio: 1, ...size }}>
      <Svg
        width={size.width}
        height={size.height}
        viewBox='0 0 18 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <Path
          d='M14 6.66666C15.3807 6.66666 16.5 5.54738 16.5 4.16666C16.5 2.78595 15.3807 1.66666 14 1.66666C12.6193 1.66666 11.5 2.78595 11.5 4.16666C11.5 5.54738 12.6193 6.66666 14 6.66666Z'
          stroke={fill}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <Path
          d='M4 12.5C5.38071 12.5 6.5 11.3807 6.5 10C6.5 8.61929 5.38071 7.5 4 7.5C2.61929 7.5 1.5 8.61929 1.5 10C1.5 11.3807 2.61929 12.5 4 12.5Z'
          stroke={fill}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <Path
          d='M14 18.3333C15.3807 18.3333 16.5 17.214 16.5 15.8333C16.5 14.4526 15.3807 13.3333 14 13.3333C12.6193 13.3333 11.5 14.4526 11.5 15.8333C11.5 17.214 12.6193 18.3333 14 18.3333Z'
          stroke={fill}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <Path
          d='M6.1582 11.2583L11.8499 14.575'
          stroke={fill}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <Path
          d='M11.8415 5.425L6.1582 8.74167'
          stroke={fill}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </Svg>
    </View>
  );
};

export default ShareIconSVG;
