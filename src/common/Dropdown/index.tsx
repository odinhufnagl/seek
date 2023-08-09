import React, { Dispatch, SetStateAction } from 'react';

import { StyleSheet, View, ViewStyle } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from '../../common';
import { FONT_FAMILY, FONT_SIZE } from '../../common/Text/Text';
import { DIMENS, SPACING } from '../../constants';
import { useTheme } from '../../hooks';
import { Theme } from '../../types';

type Props = {
  value: any;
  setValue: Dispatch<any>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  items: {
    label: string;
    value: any;
  }[];
  style: ViewStyle;
};

const Dropdown = ({ value, setOpen, setValue, open, items, style }: Props) => {
  const { theme } = useTheme();

  return (
    <View style={style}>
      <DropDownPicker
        containerStyle={{
          display: 'flex',
          width: 100,
        }}
        items={items}
        value={value}
        setValue={setValue}
        setOpen={setOpen}
        open={open}
        style={styles(theme).dropdown}
        textStyle={styles(theme).dropdownText}
        dropDownContainerStyle={styles(theme).dropdownContainer}
        TickIconComponent={() => <View style={styles(theme).markedValueIndicator} />}
        disableBorderRadius={false}
        ArrowDownIconComponent={() => <Icon icon='chevronDown' variant='third' size={9} />}
        ArrowUpIconComponent={() => <Icon icon='chevronDown' variant='third' size={9} />}
      />
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    dropdown: {
      minHeight: 35,
      width: '100%',
      borderRadius: DIMENS.common.borderRadiusRound,
      backgroundColor: theme.brand,
      paddingHorizontal: SPACING.medium,
    },
    dropdownText: {
      color: theme.base.high,
      fontFamily: FONT_FAMILY.medium,
      fontSize: FONT_SIZE.CAPTION,
    },
    dropdownContainer: {
      backgroundColor: theme.background.third,
      borderWidth: 0,
      marginTop: SPACING.small,
      zIndex: 1000,
      position: 'absolute',
    },
    markedValueIndicator: {
      width: 7,
      height: 7,
      borderRadius: DIMENS.common.borderRadiusRound,
      backgroundColor: theme.base.high,
    },
  });

export default Dropdown;
