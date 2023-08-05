import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Spacer, Text } from '../../common';
import { DIMENS, SPACING } from '../../constants';
import { useTheme } from '../../hooks';
import { NavigationProps, Theme } from '../../types';
import { formatRelativeDate } from '../../utils';

export interface ChatCardProps {
  isActive: boolean;
  isTyping: boolean;
  lastMessage: string;
  currentUserWroteLastMessage: boolean;
  unreadMessagesCount: number;
  chatId: number;
  lastActive: Date;
  profileImage: string;
  userName: string;
  onPress: () => void;
}

const ChatCard = ({
  isActive,
  isTyping,
  lastMessage,
  unreadMessagesCount,
  userName,
  profileImage,
  chatId,
  currentUserWroteLastMessage,
  lastActive,
  onPress,
}: ChatCardProps) => {
  const navigation = useNavigation() as NavigationProps;

  const { theme } = useTheme();
  const translateKey = 'components.chatCard.';

  return (
    <>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles(theme).container}>
          <View style={styles(theme).leftContainer}>
            <Image style={styles(theme).profileImage} source={{ uri: profileImage }} />
            <Spacer spacing='medium' orientation='horizontal' />
            <View>
              <Text emphasis='high' weight='semiBold' numberOfLines={1}>
                {userName}
              </Text>
              {isTyping && (
                <Text
                  type='small'
                  emphasis='medium'
                  weight='medium'
                  numberOfLines={1}
                  typeWriter
                  typeWriterNumberOfLetters={3}
                >
                  {' ...'}
                </Text>
              )}

              {!isTyping && (
                <Text
                  type='small'
                  emphasis={unreadMessagesCount > 0 ? 'high' : 'medium'}
                  weight={unreadMessagesCount > 0 ? 'bold' : 'medium'}
                  numberOfLines={1}
                  typeWriter={isTyping}
                  typeWriterNumberOfLetters={3}
                >
                  {`${currentUserWroteLastMessage ? 'You: ' : ''}${lastMessage}`}
                </Text>
              )}
            </View>
          </View>
          <View style={styles(theme).rightContainer}>
            <Text type='extraSmall' weight='bold' emphasis='medium'>
              {isActive ? 'Active Now' : formatRelativeDate(lastActive)}
            </Text>
            {/* <View style={styles(theme).countContainer}>
              {
                <Text type='extraSmall' weight='bold'>
                  {String(unreadMessagesCount)}
                </Text>
              }
            </View>*/}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      borderRadius: DIMENS.common.borderRadiusMedium,
      backgroundColor: theme.background.secondary,
      flexDirection: 'row',
      justifyContent: 'space-between',
      display: 'flex',
    },
    profileImage: {
      borderRadius: DIMENS.common.borderRadiusRound,
      width: 50,
      height: 50,
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SPACING.medium,
      paddingVertical: SPACING.medium,
      display: 'flex',
      width: '60%',
    },
    rightContainer: {
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      paddingRight: SPACING.medium,
      paddingVertical: 12,
      width: '40%',
    },
    countContainer: {
      borderRadius: DIMENS.common.borderRadiusRound,
      width: 19,
      height: 19,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.brand,
    },
  });

export default ChatCard;
