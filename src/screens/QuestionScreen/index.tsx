import React from 'react';

import { StyleSheet, View } from 'react-native';
import { Text } from '../../common';
import { useTheme } from '../../hooks';
import { NavigationProps, Theme } from '../../types';

type Props = {
  navigation: NavigationProps;
};

const QuestionScreen = ({ navigation }: Props) => {
  const { theme } = useTheme();
  const translateKey = 'QuestionScreen.';

  return (
    <View>
      <Text>QuestionScreen</Text>
    </View>
  );
};

const styles = (theme: Theme) => StyleSheet.create({});

export default QuestionScreen;
