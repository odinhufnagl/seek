import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from '../../common';
import useTheme from '../../hooks/useTheme';
import { Theme } from '../../types';

type Props = {
  value?: string;
  updateValue: React.Dispatch<string>;
  handleOnSendPress: () => void;
};

const WriteMessage = ({ value, updateValue, handleOnSendPress }: Props) => {
  const { theme } = useTheme();

  return (
    <View style={styles(theme).container}>
      <Input
        rightIcon={{ icon: 'send', size: 20, onPress: handleOnSendPress }}
        value={value || ''}
        updateValue={updateValue}
        autoGrow
        style={styles(theme).input}
        onSubmitEditing={handleOnSendPress}
      />
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',

      // borderTopWidth: DIMENS.common.borderWidth,
      // borderTopColor: theme.borderColor,
    },
    input: {},
  });

export default WriteMessage;
