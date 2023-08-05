import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const LogOutIconSvg = ({
  fill = 'black',
  size = { width: '100%', height: '100%' }
}) => {
  return (
    <View View style={{ aspectRatio: 1, ...size }}>
      <Svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M11.2929 14.2929C10.9024 14.6834 10.9024 15.3166 11.2929 15.7071C11.6834 16.0976 12.3166 16.0976 12.7071 15.7071L11.2929 14.2929ZM15 12L15.7071 12.7071C15.8946 12.5196 16 12.2652 16 12C16 11.7348 15.8946 11.4804 15.7071 11.2929L15 12ZM12.7071 8.29289C12.3166 7.90237 11.6834 7.90237 11.2929 8.29289C10.9024 8.68342 10.9024 9.31658 11.2929 9.70711L12.7071 8.29289ZM4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13L4 11ZM12.7071 15.7071L15.7071 12.7071L14.2929 11.2929L11.2929 14.2929L12.7071 15.7071ZM15.7071 11.2929L12.7071 8.29289L11.2929 9.70711L14.2929 12.7071L15.7071 11.2929ZM4 13L15 13V11L4 11L4 13Z"
          fill={fill}
        />
        <Path
          d="M9 7V5C9 4.44772 9.44772 4 10 4H19C19.5523 4 20 4.44772 20 5V19C20 19.5523 19.5523 20 19 20H10C9.44771 20 9 19.5523 9 19V17"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default LogOutIconSvg;
