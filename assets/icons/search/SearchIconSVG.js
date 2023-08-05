import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const SearchIconSVG = ({
  fill = 'black',
  size = {width: '100%', height: '100%'},
}) => {
  return (
    <View style={{aspectRatio: 1, ...size}}>
      <Svg
        width={size.width}
        height={size.height}
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M11.5996 19C16.0179 19 19.5996 15.4183 19.5996 11C19.5996 6.58172 16.0179 3 11.5996 3C7.18133 3 3.59961 6.58172 3.59961 11C3.59961 15.4183 7.18133 19 11.5996 19Z"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M21.6 21.0004L17.25 16.6504"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default SearchIconSVG;
