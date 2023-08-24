import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const MessageQuestionIconSvg = ({ fill = 'black', size = { width: '100%', height: '100%' } }) => {
  return (
    <View View style={{ aspectRatio: 1, ...size }}>
      <Svg
        width={size.width}
        height={size.height}
        viewBox='0 0 18 18'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <Path
          d='M12.75 13.8225H9.75L6.4125 16.0425C6.29987 16.1176 6.16896 16.1607 6.03375 16.1672C5.89854 16.1737 5.7641 16.1434 5.64476 16.0795C5.52543 16.0156 5.42568 15.9205 5.35616 15.8044C5.28663 15.6882 5.24994 15.5554 5.25 15.42V13.8225C3 13.8225 1.5 12.3225 1.5 10.0725V5.57251C1.5 3.32251 3 1.82251 5.25 1.82251H12.75C15 1.82251 16.5 3.32251 16.5 5.57251V10.0725C16.5 12.3225 15 13.8225 12.75 13.8225Z'
          stroke={fill}
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <Path
          d='M9.00086 8.51999V8.36249C9.00086 7.85249 9.31586 7.58249 9.63086 7.36499C9.93836 7.15499 10.2459 6.88499 10.2459 6.38999C10.2459 5.69999 9.69086 5.14499 9.00086 5.14499C8.31086 5.14499 7.75586 5.69999 7.75586 6.38999M8.99711 10.3125H9.00461'
          stroke={fill}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </Svg>
    </View>
  );
};

export default MessageQuestionIconSvg;
