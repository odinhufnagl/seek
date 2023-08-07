import React from 'react';
import { Animated, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Spacer, Text, TextProps } from '../../common';
import { SPACING } from '../../constants';

type Item = React.ReactNode;
type Items = Item[];
type Props = {
  style?:
    | Animated.AnimatedProps<StyleProp<ViewStyle>>[]
    | Animated.AnimatedProps<StyleProp<ViewStyle>>;
  header?: string;
  subHeader?: string;
  headerLeft?: boolean;
  leftItems?: Items;
  rightItems?: Items;
  headerTitleProps?: TextProps;
};

const Header = ({
  leftItems = [],
  rightItems = [],
  style,
  header,
  subHeader,
  headerLeft,
  headerTitleProps,
}: Props) => {
  const renderAllItems = (directionOfItems: Items) =>
    directionOfItems?.map((Component, index: number) => (
      <>
        {Component}
        {index !== directionOfItems.length - 1 && <Spacer orientation='horizontal' spacing={24} />}
      </>
    ));

  return (
    <Animated.View style={[styles.container, style]}>
      <View style={styles.upperContainer}>
        <View style={styles.leftContainer}>
          {renderAllItems(leftItems)}
          <Spacer spacing='medium' orientation='horizontal' />
          {headerLeft && (
            <View>
              {header && (
                <Text {...headerTitleProps} {...{ type: subHeader ? 'body' : 'header' }}>
                  {header}
                </Text>
              )}
              {subHeader && (
                <Text type='small' emphasis='medium'>
                  {subHeader}
                </Text>
              )}
            </View>
          )}
        </View>

        {header && !headerLeft && !subHeader && (
          <View style={styles.centerContainer}>
            <Text type='subHeader' emphasis='high'>
              {header}
            </Text>
          </View>
        )}
        <View style={styles.rightContainer}>{renderAllItems(rightItems)}</View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.large,
    backgroundColor: 'transparent',
    width: '100%',
    paddingVertical: SPACING.large,
  },
  upperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconButtonsLeft: {
    marginRight: SPACING.medium,
  },
  iconButtonsRight: {
    marginLeft: SPACING.medium,
  },
});

export default Header;
