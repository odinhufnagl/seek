import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { SPACING } from '../../constants';
import { useTheme } from '../../hooks';
import { ITheme } from '../../types';

type Props = {
  children?: JSX.Element;
  adjustToContentHeight?: boolean;
  modalHeight?: number;
  snapPoint?: number;
  childrenStyle?: ViewStyle | ViewStyle[];
};

const BottomModal = React.forwardRef(
  ({ children, adjustToContentHeight = true, childrenStyle, ...props }: Props, ref) => {
    const { theme } = useTheme();
    return (
      <Modalize
        ref={ref}
        adjustToContentHeight={adjustToContentHeight}
        childrenStyle={[styles(theme).children, childrenStyle]}
        {...props}
        overlayStyle={styles(theme).overlay}
      >
        {children}
      </Modalize>
    );
  },
);
BottomModal.displayName = 'BottomDisplay';

const styles = (theme: ITheme) =>
  StyleSheet.create({
    children: {
      backgroundColor: theme.backgroundColor,
      borderTopLeftRadius: SPACING.medium,
      borderTopRightRadius: SPACING.medium,
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
  });

export default BottomModal;
