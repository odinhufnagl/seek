import React, { Dispatch } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Container, Icon, Modal, Spacer, Text } from '../../common';
import { ButtonProps } from '../../common/Button/Button';
import { DIMENS, SPACING } from '../../constants';
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
  iconSize: IconSize;
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
          <View style={styles(theme).upperContainer}>
            {image && <Image style={styles(theme).image} source={{ uri: image }} />}
            <Spacer />
            {header && <Text weight='bold'>{header}</Text>}

            {subHeader && (
              <>
                <View style={styles(theme).subHeaderContainer}>
                  {subHeaderIcon && (
                    <>
                      <Icon icon={subHeaderIcon} fill={theme.base.low} variant='third' size={13} />
                      <Spacer spacing='tiny' orientation='horizontal' />
                    </>
                  )}
                  <Text type='small' emphasis='medium'>
                    {subHeader}
                  </Text>
                </View>
                <Spacer spacing='medium' />
              </>
            )}
            {body && (
              <Text type='caption' emphasis='primary'>
                {body}
              </Text>
            )}
          </View>
          {button && (
            <>
              <Spacer spacing='large' />
              <Button {...button} />
            </>
          )}
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
    container: { justifyContent: 'flex-end', paddingBottom: SPACING.extraLarge },
    upperContainer: {
      alignSelf: 'center',
      alignItems: 'center',
    },
    subHeaderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 110,
      height: 110,
      borderRadius: DIMENS.common.borderRadiusRound,
    },
  });

export default ModalList;
