import Snackbar from 'react-native-snackbar';
import {FONT_FAMILY} from '../common/Text/Text';
import {defaultTheme} from '../theme';

const DURATION = 3000;

const ERROR_COLOR = defaultTheme.error;
const SUCCESS_COLOR = defaultTheme.success;
const NEUTRAL_COLOR = 'black';

type Variant = 'neutral' | 'error' | 'success';

export const showSnackbar = (
  text: string,
  variant?: Variant,
  duration: number = DURATION,
): void => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'success':
        return SUCCESS_COLOR;
      case 'error':
        return ERROR_COLOR;
      case 'neutral':
        return NEUTRAL_COLOR;
      default:
        return NEUTRAL_COLOR;
    }
  };
  Snackbar.show({
    text: text,
    duration: duration,
    fontFamily: FONT_FAMILY.semiBold,
    backgroundColor: getBackgroundColor(),
  });
};
