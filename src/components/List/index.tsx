import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Icon, Spacer, Text } from '../../common';
import { useTheme } from '../../hooks';
import { IconSize, IconVariant, Theme } from '../../types';

// TODO: Dont know if this shuold be generic. Should exist a List that ModalList can use, and then ProfileModalList also can use the List. Dont know what the list should be called but...

type ListProps = {
  items: ListItemProps[];
};
type ListItemProps = {
  title: string;
  icon: IconVariant;
  iconSize?: IconSize;
  onPress?: () => void;
};

const ListItem = ({ title, icon, iconSize, onPress }: ListItemProps) => {
  const { theme } = useTheme();
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={itemStyles(theme).container}>
        <View style={itemStyles(theme).iconContainer}>
          <Icon icon={icon} variant='third' size={iconSize} fill={theme.base.low} />
        </View>
        <Spacer spacing='large' orientation='horizontal' />
        <Text type='body' weight='semiBold' emphasis='high'>
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
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

const List = ({ items }: ListProps) => {
  const { theme } = useTheme();
  return (
    <View>
      {items.map((data) => (
        <>
          <Spacer spacing='large' />
          <ListItem {...data} />
        </>
      ))}
    </View>
  );
};

export default List;
