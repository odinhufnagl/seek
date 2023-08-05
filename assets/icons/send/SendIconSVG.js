import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SendIconSVG = ({ fill = 'black', size = { width: '100%', height: '100%' } }) => {
  return (
    <View style={{ aspectRatio: 1, ...size }}>
      <Svg
        width={size.width}
        height={size.height}
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <Path
          d='M3.39046 9.99867H8.79046M7.46046 2.22867L16.0205 6.50867C19.8605 8.42867 19.8605 11.5687 16.0205 13.4887L7.46046 17.7687C1.70046 20.6487 -0.649541 18.2887 2.23046 12.5387L3.10046 10.8087C3.32046 10.3687 3.32046 9.63867 3.10046 9.19867L2.23046 7.45867C-0.649541 1.70867 1.71046 -0.65133 7.46046 2.22867Z'
          stroke={fill}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </Svg>
    </View>
  );
};

export default SendIconSVG;
