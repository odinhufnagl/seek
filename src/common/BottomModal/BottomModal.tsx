import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Modalize } from 'react-native-modalize';

type Props = {
  children?: JSX.Element;
  adjustToContentHeight?: boolean;
  modalHeight?: number;
  snapPoint?: number;
  childrenStyle?: ViewStyle | ViewStyle[];
};

const BottomModal = React.forwardRef(
  ({ children, adjustToContentHeight = true, childrenStyle, ...props }: Props, ref) => {
    return (
      <Modalize
        ref={ref}
        adjustToContentHeight={adjustToContentHeight}
        childrenStyle={[styles.children, childrenStyle]}
        {...props}
        overlayStyle={styles.overlay}
      >
        {children}
      </Modalize>
    );
  },
);
BottomModal.displayName = 'BottomDisplay';

const styles = StyleSheet.create({
  children: {
    paddingBottom: 60,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});

export default BottomModal;
