import React, { Dispatch } from 'react';
import { Modal as RNModal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useTheme from '../../hooks/useTheme';
import { Theme } from '../../types';

type Props = {
  visible: boolean;
  setVisible: Dispatch<boolean>;
  children: JSX.Element;
};

const linearGradientColors = [
  'rgba(0, 0, 0, 0.0)',
  'rgba(0, 0, 0, 0.8)',
  'rgba(0, 0, 0, 0.83)',
  'rgba(0, 0, 0, 0.84)',
  'rgba(0, 0, 0, 0.85)',
  'rgba(0, 0, 0, 0.86)',
  'rgba(0, 0, 0, 0.87)',
  'rgba(0, 0, 0, 0.88)',
  'rgba(0, 0, 0, 0.89)',
  'rgba(0, 0, 0, 0.9)',
  'rgba(0, 0, 0, 0.94)',
  'rgba(0, 0, 0, 0.94)',
  'rgba(0, 0, 0, 0.94)',
  'rgba(0, 0, 0, 0.94)',
  'rgba(0, 0, 0, 0.95)',
  'rgba(0, 0, 0, 0.96)',
  'rgba(0, 0, 0, 0.97)',
  'rgba(0, 0, 0, 0.98)',
  'rgba(0, 0, 0, 0.98)',
  'rgba(0, 0, 0, 1)',
  'rgba(0, 0, 0, 1)',
  'rgba(0, 0, 0, 1)',
];

const Modal = ({ visible, setVisible, children }: Props) => {
  const { theme } = useTheme();
  return (
    <RNModal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      animationType='slide'
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={styles(theme).root}>
          <LinearGradient colors={linearGradientColors} style={styles(theme).linearGradient} />
          <View style={styles(theme).childrenContainer}>
            <View>{children}</View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    root: {
      width: '100%',
      height: '100%',
    },
    childrenContainer: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'flex-end',
    },
    linearGradient: {
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
  });
export default Modal;
