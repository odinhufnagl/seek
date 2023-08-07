import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ChatIconSVG = ({ fill = 'black', size = { width: '100%', height: '100%' } }) => {
  return (
    <View style={{ aspectRatio: 1, ...size }}>
      <Svg
        width={size.width}
        height={size.height}
        viewBox='0 0 21 21'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <Path
          d='M20 9.97224C20.0036 11.3654 19.6781 12.7398 19.05 13.9833C18.3052 15.4735 17.1603 16.7269 15.7434 17.6031C14.3265 18.4794 12.6937 18.9438 11.0278 18.9444C9.63457 18.9481 8.26022 18.6226 7.01666 17.9944L1 20L3.00555 13.9833C2.37743 12.7398 2.05192 11.3654 2.05555 9.97224C2.0562 8.30632 2.52064 6.67348 3.39687 5.2566C4.27309 3.83973 5.52648 2.69479 7.01666 1.95003C8.26022 1.3219 9.63457 0.996398 11.0278 1.00003H11.5555C13.7557 1.12141 15.8337 2.05005 17.3918 3.60815C18.9499 5.16626 19.8786 7.24432 20 9.44446V9.97224Z'
          stroke={fill}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </Svg>
    </View>
  );
};

export default ChatIconSVG;
