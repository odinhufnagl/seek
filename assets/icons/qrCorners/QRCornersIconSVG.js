import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path, Rect, Defs, Mask} from 'react-native-svg';

const QRCornersIconSVG = ({
  fill = 'black',
  size = {width: '100%', height: '100%'},
}) => {
  return (
    <View style={{aspectRatio: 1, ...size}}>
      <Svg
        xmlns="http://www.w3.org/2000/Svg"
        width={size.width}
        height={size.height}
        viewBox="0 0 200 200">
        <Defs>
          <Mask id="cornerMask">
            <Rect width="100%" height="100%" fill="white" />

            <Rect width="80" height="120" fill="black" x="0" y="40" />
            <Rect width="120" height="80" fill="black" x="40" y="0" />
            <Rect width="80" height="120" fill="black" x="180" y="40" />
            <Rect width="120" height="80" fill="black" x="40" y="180" />
          </Mask>
        </Defs>
        <Rect
          width="190"
          height="190"
          x="5"
          y="5"
          fill="none"
          stroke={fill}
          strokeWidth="7"
          rx="30"
          ry="30"
          mask="url(#cornerMask)"
        />
        <Rect
          width="200"
          height="200"
          fill="none"
          stroke="none"
          rx="30"
          ry="30"
          mask="url(#cornerMask)"
        />
      </Svg>
    </View>
  );
};

export default QRCornersIconSVG;
