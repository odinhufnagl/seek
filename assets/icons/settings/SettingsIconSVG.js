import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const SettingsIconSVG = ({
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
          d="M12.5996 15C14.2565 15 15.5996 13.6569 15.5996 12C15.5996 10.3431 14.2565 9 12.5996 9C10.9428 9 9.59961 10.3431 9.59961 12C9.59961 13.6569 10.9428 15 12.5996 15Z"
          stroke={fill}
          strokeWidth="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M19.9996 15C19.8665 15.3016 19.8268 15.6362 19.8856 15.9606C19.9444 16.285 20.0991 16.5843 20.3296 16.82L20.3896 16.88C20.5756 17.0657 20.7231 17.2863 20.8237 17.5291C20.9244 17.7719 20.9762 18.0322 20.9762 18.295C20.9762 18.5578 20.9244 18.8181 20.8237 19.0609C20.7231 19.3037 20.5756 19.5243 20.3896 19.71C20.2039 19.896 19.9833 20.0435 19.7405 20.1441C19.4977 20.2448 19.2374 20.2966 18.9746 20.2966C18.7118 20.2966 18.4515 20.2448 18.2087 20.1441C17.9659 20.0435 17.7454 19.896 17.5596 19.71L17.4996 19.65C17.2639 19.4195 16.9646 19.2648 16.6402 19.206C16.3158 19.1472 15.9812 19.1869 15.6796 19.32C15.3838 19.4468 15.1316 19.6572 14.9539 19.9255C14.7762 20.1938 14.6809 20.5082 14.6796 20.83V21C14.6796 21.5304 14.4689 22.0391 14.0938 22.4142C13.7187 22.7893 13.21 23 12.6796 23C12.1492 23 11.6405 22.7893 11.2654 22.4142C10.8903 22.0391 10.6796 21.5304 10.6796 21V20.91C10.6719 20.579 10.5647 20.258 10.3721 19.9887C10.1795 19.7194 9.91034 19.5143 9.59961 19.4C9.29799 19.2669 8.96342 19.2272 8.63902 19.286C8.31463 19.3448 8.01529 19.4995 7.77961 19.73L7.71961 19.79C7.53386 19.976 7.31329 20.1235 7.07049 20.2241C6.82769 20.3248 6.56744 20.3766 6.30461 20.3766C6.04178 20.3766 5.78152 20.3248 5.53873 20.2241C5.29593 20.1235 5.07536 19.976 4.88961 19.79C4.70366 19.6043 4.55614 19.3837 4.45549 19.1409C4.35484 18.8981 4.30304 18.6378 4.30304 18.375C4.30304 18.1122 4.35484 17.8519 4.45549 17.6091C4.55614 17.3663 4.70366 17.1457 4.88961 16.96L4.94961 16.9C5.18015 16.6643 5.33479 16.365 5.39361 16.0406C5.45243 15.7162 5.41272 15.3816 5.27961 15.08C5.15285 14.7842 4.94236 14.532 4.67407 14.3543C4.40578 14.1766 4.0914 14.0813 3.76961 14.08H3.59961C3.06918 14.08 2.56047 13.8693 2.1854 13.4942C1.81032 13.1191 1.59961 12.6104 1.59961 12.08C1.59961 11.5496 1.81032 11.0409 2.1854 10.6658C2.56047 10.2907 3.06918 10.08 3.59961 10.08H3.68961C4.0206 10.0723 4.34161 9.96512 4.61091 9.77251C4.8802 9.5799 5.08533 9.31074 5.19961 9C5.33272 8.69838 5.37243 8.36381 5.31361 8.03941C5.25479 7.71502 5.10015 7.41568 4.86961 7.18L4.80961 7.12C4.62366 6.93425 4.47614 6.71368 4.37549 6.47088C4.27484 6.22808 4.22304 5.96783 4.22304 5.705C4.22304 5.44217 4.27484 5.18192 4.37549 4.93912C4.47614 4.69632 4.62366 4.47575 4.80961 4.29C4.99536 4.10405 5.21593 3.95653 5.45873 3.85588C5.70152 3.75523 5.96178 3.70343 6.22461 3.70343C6.48744 3.70343 6.74769 3.75523 6.99049 3.85588C7.23329 3.95653 7.45386 4.10405 7.63961 4.29L7.69961 4.35C7.93529 4.58054 8.23463 4.73519 8.55902 4.794C8.88342 4.85282 9.21799 4.81312 9.51961 4.68H9.59961C9.89538 4.55324 10.1476 4.34276 10.3253 4.07447C10.503 3.80618 10.5983 3.49179 10.5996 3.17V3C10.5996 2.46957 10.8103 1.96086 11.1854 1.58579C11.5605 1.21071 12.0692 1 12.5996 1C13.13 1 13.6387 1.21071 14.0138 1.58579C14.3889 1.96086 14.5996 2.46957 14.5996 3V3.09C14.6009 3.41179 14.6962 3.72618 14.8739 3.99447C15.0516 4.26276 15.3038 4.47324 15.5996 4.6C15.9012 4.73312 16.2358 4.77282 16.5602 4.714C16.8846 4.65519 17.1839 4.50054 17.4196 4.27L17.4796 4.21C17.6654 4.02405 17.8859 3.87653 18.1287 3.77588C18.3715 3.67523 18.6318 3.62343 18.8946 3.62343C19.1574 3.62343 19.4177 3.67523 19.6605 3.77588C19.9033 3.87653 20.1239 4.02405 20.3096 4.21C20.4956 4.39575 20.6431 4.61632 20.7437 4.85912C20.8444 5.10192 20.8962 5.36217 20.8962 5.625C20.8962 5.88783 20.8444 6.14808 20.7437 6.39088C20.6431 6.63368 20.4956 6.85425 20.3096 7.04L20.2496 7.1C20.0191 7.33568 19.8644 7.63502 19.8056 7.95941C19.7468 8.28381 19.7865 8.61838 19.9196 8.92V9C20.0464 9.29577 20.2569 9.54802 20.5251 9.72569C20.7934 9.90337 21.1078 9.99872 21.4296 10H21.5996C22.13 10 22.6387 10.2107 23.0138 10.5858C23.3889 10.9609 23.5996 11.4696 23.5996 12C23.5996 12.5304 23.3889 13.0391 23.0138 13.4142C22.6387 13.7893 22.13 14 21.5996 14H21.5096C21.1878 14.0013 20.8734 14.0966 20.6051 14.2743C20.3369 14.452 20.1264 14.7042 19.9996 15Z"
          stroke={fill}
          strokeWidth="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export default SettingsIconSVG;
