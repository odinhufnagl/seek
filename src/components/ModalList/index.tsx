import React from 'react';
import {Dispatch} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {IconSize, IconVariant, Theme} from '../../types';
import {Button, Container, Icon, Modal, Spacer, Text} from '../../common';
import {useTheme} from '../../hooks';
import {SPACING} from '../../constants';
import {ButtonProps} from '../../common/Button/Button';

type ModalListProps = {
  visible: boolean;
  setVisible: Dispatch<boolean>;
  items: ModalListItemProps[];
  header?: string;
  subHeader?: string;
  image?: string;
  button?: ButtonProps;
};
type ModalListItemProps = {
  title: string;
  icon: IconVariant;
  iconSize: IconSize;
  onPress?: () => void;
};

const ModalListItem = ({title, icon, iconSize}: ModalListItemProps) => {
  const {theme} = useTheme();
  return (
    <View style={itemStyles(theme).container}>
      <View style={itemStyles(theme).iconContainer}>
        <Icon
          icon={icon}
          variant="third"
          size={iconSize}
          fill={theme.base.low}
        />
      </View>
      <Spacer spacing="large" orientation="horizontal" />
      <Text type="body" weight="semiBold" emphasis="primary">
        {title}
      </Text>
    </View>
  );
};

const itemStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {flexDirection: 'row', alignItems: 'center'},
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
}: ModalListProps) => {
  const {theme} = useTheme();
  return (
    <Modal visible={visible} setVisible={setVisible}>
      <Container style={styles(theme).container}>
        <>
          <View style={styles(theme).upperContainer}>
            {image && (
              <Image style={styles(theme).image} source={{uri: image}} />
            )}
            <Spacer />
            {header && <Text weight="bold">{header}</Text>}
            <Spacer spacing="tiny" />
            {subHeader && (
              <Text type="small" emphasis="medium">
                {subHeader}
              </Text>
            )}
          </View>
          {button && (
            <>
              <Spacer spacing="large" />
              <Button {...button} />
            </>
          )}
          <Spacer spacing="large" />
          {items.map(data => (
            <>
              <Spacer spacing="large" />
              <ModalListItem {...data} />
            </>
          ))}
        </>
      </Container>
    </Modal>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {justifyContent: 'flex-end', paddingBottom: SPACING.extraLarge},
    upperContainer: {
      alignSelf: 'center',
      alignItems: 'center',
    },
    image: {
      width: 150,
      height: 150,
    },
  });

export default ModalList;
