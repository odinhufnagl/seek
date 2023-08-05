import { TransitionPresets } from '@react-navigation/stack';

const slideVerticallyDefaultOptions = {
  ...TransitionPresets.ModalSlideFromBottomIOS,
};
const slideHorizontallyDefaultOptions = {
  ...TransitionPresets.SlideFromRightIOS,
};

export { slideVerticallyDefaultOptions, slideHorizontallyDefaultOptions };
