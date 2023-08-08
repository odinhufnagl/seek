import { TransitionPresets } from '@react-navigation/stack';

const slideVerticallyDefaultOptions = {
  ...TransitionPresets.ModalSlideFromBottomIOS,
};
const slideHorizontallyDefaultOptions = {
  ...TransitionPresets.SlideFromRightIOS,
};
const fadeDefaultOptions = {
  ...TransitionPresets.ModalFadeTransition,
};

export { fadeDefaultOptions, slideHorizontallyDefaultOptions, slideVerticallyDefaultOptions };
