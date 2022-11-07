import React, { Dispatch } from 'react';
import { Modal as RNModal, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { DIMENS, SPACING } from '../../constants';
import useTheme from '../../hooks/useTheme';
import { ITheme } from '../../types';

type Props = {
  visible: boolean;
  setVisible: Dispatch<boolean>;
  children: JSX.Element;
};

const Modal = ({ visible, setVisible, children }: Props) => {
  const { theme } = useTheme();
  return (
    <RNModal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      animationType='fade'
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={styles.container()}>
          <TouchableWithoutFeedback>
            <View style={styles.innerContainer(theme)}>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = {
  container: (): ViewStyle => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  }),
  innerContainer: (theme: ITheme): ViewStyle => ({
    backgroundColor: theme.backgroundColor,
    borderRadius: DIMENS.common.borderRadiusMedium,
    padding: SPACING.medium,
    justifyContent: 'center',
  }),
};
export default Modal;
