import React, { Dispatch } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Modal, Spacer } from '../../common';
import { ButtonProps } from '../../common/Button/Button';
import { SPACING } from '../../constants';
import { useTheme } from '../../hooks';
import { IconSize, IconVariant, Theme } from '../../types';
import List from '../List';

// TODO: Dont know if this should be generic. Should exist a List that ModalList can use, and then ProfileModalList also can use the List. Dont know what the list should be called but...This could just be ProfileModal, which doesnt take as many params

type ModalListProps = {
  visible: boolean;
  setVisible: Dispatch<boolean>;
  items: ModalListItemProps[];
  header?: string;
  subHeader?: string;
  subHeaderIcon?: IconVariant;
  body?: string;
  image?: string;
  button?: ButtonProps;
};
type ModalListItemProps = {
  title: string;
  icon: IconVariant;
  iconSize?: IconSize;
  onPress?: () => void;
};

const itemStyles = (theme: Theme) =>
  StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center' },
    iconContainer: {
      width: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

const ModalList = ({
  visible,
  setVisible,
  items,
  header,
  subHeader,
  image,
  button,
  body,
  subHeaderIcon,
}: ModalListProps) => {
  const { theme } = useTheme();
  return (
    <Modal visible={visible} setVisible={setVisible}>
      <Container style={styles(theme).container}>
        <>
          <Spacer spacing='large' />
          <List items={items} />
          <Spacer spacing='small' />
        </>
      </Container>
    </Modal>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: { justifyContent: 'flex-end', paddingBottom: SPACING.extraLarge, flex: 0 },
  });

export default ModalList;
