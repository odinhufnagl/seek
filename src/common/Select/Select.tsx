import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Spacer, Text } from '..';
import { DIMENS, SPACING } from '../../constants';
import useTheme from '../../hooks/useTheme';
import { ITheme } from '../../types/theme';
import { FONT_FAMILY } from '../Text/Text';
import SelectDropdown, { SelectDropdownProps } from 'react-native-select-dropdown';
type Props = {
  data: any[];
  onSelect: (selectedItem: any, index: number) => void;
  buttonTextAfterSelection: (selectedItem: any, index: number) => string;
  rowTextForSelection: (item: any, index: number) => string;
  variant?: 'primary' | 'secondary';
};

const Select: React.FC<Props> = ({
  data,
  onSelect,
  buttonTextAfterSelection,
  rowTextForSelection,
  variant,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <View>
      <SelectDropdown
        buttonStyle={styles(theme).defaultSelect}
        buttonTextStyle={styles(theme).defaultText}
        searchPlaceHolderColor={theme.textLowColor}
        data={data}
        onSelect={onSelect}
        buttonTextAfterSelection={buttonTextAfterSelection}
        rowTextForSelection={rowTextForSelection}
        {...props}
      />
    </View>
  );
};

const styles = (theme: ITheme) =>
  StyleSheet.create({
    defaultSelect: {
      width: '100%',
      borderRadius: DIMENS.common.borderRadiusMedium,
      height: 48,
      backgroundColor: theme.primaryColor,
    },
    defaultText: {
      fontSize: DIMENS.font.body,
      fontFamily: FONT_FAMILY.regular,
      color: theme.textHighColor,
    },
  });

export default Select;
