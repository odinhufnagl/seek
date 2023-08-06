import React, { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Spacer, Text } from '../../common';
import { Theme } from '../../types';

import { DIMENS, SPACING } from '../../constants';
import { useTheme } from '../../hooks';

type ChatMessageProps = {
  message: string;
  createdAt: Date | string;
  isUser: boolean;
  image?: string;
  showImage?: boolean;
  isRead?: boolean;
};

const ChatMessage = ({
  message,
  createdAt,
  isUser,
  image,
  showImage = true,
  isRead = false,
}: ChatMessageProps) => {
  const { theme } = useTheme();

  return (
    <View>
      {isUser && (
        <View style={{ alignSelf: 'flex-end', alignItems: 'flex-end' }}>
          <View style={[styles(theme).container, styles(theme).containerRight]}>
            <Text style={styles(theme).messageTextRight} type='caption'>
              {message}
            </Text>
          </View>

          {isRead && (
            <>
              <Spacer spacing='tiny' />
              <Text type='small'>Seen</Text>
            </>
          )}
        </View>
      )}
      {!isUser && image && (
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          {showImage ? (
            <Image source={{ uri: image }} style={styles(theme).profileImage} />
          ) : (
            <View style={styles(theme).profileImage} />
          )}
          <Spacer orientation='horizontal' spacing='small' />
          <View style={[styles(theme).container, styles(theme).containerLeft]}>
            <Text style={styles(theme).messageTextLeft} type='caption'>
              {message}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = (theme: Theme) =>
  StyleSheet.create({
    containerRight: {
      backgroundColor: theme.brand,
      borderBottomLeftRadius: 16,
      alignSelf: 'flex-end',
    },

    containerLeft: {
      backgroundColor: theme.background.third,
      alignSelf: 'flex-start',
      borderBottomRightRadius: 16,
    },
    container: {
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      maxWidth: '60%',
      minWidth: 60,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: SPACING.small,
      paddingHorizontal: SPACING.medium,
    },
    profileImage: {
      width: 30,
      height: 30,
      borderRadius: DIMENS.common.borderRadiusRound,
    },

    messageTextLeft: {
      color: theme.base.high,
    },
    messageTextRight: {
      color: theme.white,
    },
  });

export default memo(ChatMessage);
