import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const CameraIconSVG = ({
  fill = 'black',
  size = {width: '100%', height: '100%'},
}) => {
  return (
    <View style={{aspectRatio: 1, ...size}}>
      <Svg
        viewBox="0 0 27 22"
        xmlns="http://www.w3.org/2000/svg"
        fill="transparent">
        <Path
          d="M21.7589 4.75C22.4861 4.75 22.8504 4.75 23.15 4.82C23.6114 4.92813 24.033 5.15717 24.3686 5.48198C24.7043 5.80679 24.9409 6.21481 25.0527 6.66125C25.125 6.95 25.125 7.30375 25.125 8.0075V16C25.125 18.3575 25.125 19.535 24.3681 20.2675C23.6112 21 22.3944 21 19.9583 21H7.04167C4.60558 21 3.38883 21 2.63192 20.2675C1.875 19.535 1.875 18.3575 1.875 16V8.0075C1.875 7.30375 1.875 6.95125 1.94733 6.66125C2.05917 6.21465 2.29604 5.80652 2.63192 5.4817C2.9678 5.15688 3.38969 4.92793 3.85125 4.82C4.14833 4.75 4.51387 4.75 5.24108 4.75C5.64796 4.75 5.85204 4.75 6.04192 4.7225C6.63131 4.6371 7.17207 4.35712 7.57254 3.93C7.70171 3.7925 7.81538 3.6275 8.04142 3.3L8.33333 2.875C8.84483 2.13125 9.10187 1.76 9.45062 1.505C9.66431 1.34876 9.9018 1.22562 10.1546 1.14C10.5679 1 11.0303 1 11.9539 1H15.0461C15.9697 1 16.4308 1 16.8454 1.14C17.0973 1.225 17.3362 1.34875 17.5481 1.505C17.8981 1.76 18.1552 2.13125 18.6667 2.875L18.9599 3.3C19.1846 3.6275 19.2983 3.79125 19.4275 3.93C19.8279 4.35712 20.3687 4.6371 20.9581 4.7225C21.148 4.75 21.352 4.75 21.7589 4.75Z"
          stroke={fill}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M17.375 12.25C17.375 13.2446 16.9667 14.1984 16.24 14.9017C15.5133 15.6049 14.5277 16 13.5 16C12.4723 16 11.4867 15.6049 10.76 14.9017C10.0333 14.1984 9.625 13.2446 9.625 12.25C9.625 11.2554 10.0333 10.3016 10.76 9.59835C11.4867 8.89509 12.4723 8.5 13.5 8.5C14.5277 8.5 15.5133 8.89509 16.24 9.59835C16.9667 10.3016 17.375 11.2554 17.375 12.25Z"
          stroke={fill}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default CameraIconSVG;