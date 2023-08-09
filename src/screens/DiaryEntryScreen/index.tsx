import React from 'react';

import Clipboard from '@react-native-clipboard/clipboard';
import { useRoute } from '@react-navigation/native';
import { ImageBackground, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon, Loading, Spacer, Text } from '../../common';
import { Header } from '../../components';
import { SCREENS, SPACING } from '../../constants';
import { useFetchAnswer, useTheme } from '../../hooks';
import { useAuth } from '../../providers/AuthProvider';
import { fetchUsersChats } from '../../services';
import { NavigationProps, Theme } from '../../types';
import { formatRelativeDate, showSnackbar } from '../../utils';

type Props = {
  navigation: NavigationProps;
};
type Params = {
  answerId: number;
};

// TODO: for all iconnames, make them more descriptive for what they symbolize in the app

// TODO: fix icons being opacity not 100, so you see the layers

const DiaryEntryScreen = ({ navigation }: Props) => {
  const { theme } = useTheme();
  const translateKey = 'DiaryEntryScreen.';
  const { params } = useRoute();
  const { currentUser } = useAuth();
  const { answerId } = params as Params;
  const { data: answer, isLoading } = useFetchAnswer(answerId);

  const handleCopyPressed = () => {
    answer?.text && Clipboard.setString(answer?.text);
  };
  const handleSharePressed = () => {
    showSnackbar('Sharing is being added by our developers');
  };
  const handleChatPressed = async () => {
    if (!answer) {
      return;
    }
    const chat = (
      await fetchUsersChats(currentUser?.id, {
        where: { questionId: { value: answer?.questionId } },
        limit: 1,
      })
    )[0];
    navigation.navigate(SCREENS.CHAT_SCREEN, { id: chat.id });
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <View style={styles(theme).container}>
      <Header
        style={[styles(theme).header]}
        leftItems={[
          <Icon
            variant='third'
            icon='back'
            size={18}
            onPress={() => navigation.goBack()}
            key='back'
          />,
        ]}
      />

      <ImageBackground
        style={styles(theme).coverImageBackground}
        imageStyle={styles(theme).coverImageStyle}
        source={{ uri: answer?.question?.coverImage?.url }}
      >
        <LinearGradient
          style={styles(theme).linearGradient}
          colors={['rgba(0, 0, 0, 0.8)', 'transparent']}
        />
        <View style={{ paddingHorizontal: SPACING.medium, width: '80%' }}>
          <>
            <Text type='caption'>{answer?.createdAt && formatRelativeDate(answer.createdAt)}</Text>
            <Spacer spacing='tiny' />
            <Text weight='bold' emphasis='high' type='header'>
              {answer?.question?.title}
            </Text>
            <Spacer spacing='medium' />
          </>
        </View>
      </ImageBackground>
      <Spacer />
      <View style={styles(theme).answerContainer}>
        <Text>{answer?.text}</Text>
      </View>

      <View style={styles(theme).bottomContainer}>
        <View style={styles(theme).bottomFloatingContainer}>
          {!answer?.isPrivate && (
            <>
              <Icon
                icon='chat'
                variant='third'
                size={21}
                fill={theme.base.medium}
                onPress={handleChatPressed}
              />
              <Spacer orientation='horizontal' spacing={32} />
            </>
          )}
          <Icon
            icon='share'
            variant='third'
            size={22}
            fill={theme.base.medium}
            onPress={handleSharePressed}
          />
          <Spacer orientation='horizontal' spacing={32} />
          <Icon
            icon='copy'
            variant='third'
            size={22}
            fill={theme.base.medium}
            onPress={handleCopyPressed}
          />
        </View>
      </View>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: { flex: 1 },
    answerContainer: {
      paddingHorizontal: SPACING.medium,
    },
    header: {
      position: 'absolute',
      top: 0,
      zIndex: 100,
      paddingHorizontal: SPACING.medium,
      paddingVertical: SPACING.medium,
    },
    coverImageBackground: {
      width: '100%',
      height: 190,
      opacity: 1.0,
      backgroundColor: theme.black,
      position: 'relative',
    },
    coverImageStyle: {
      opacity: 0.4,
    },
    linearGradient: {
      width: '100%',
      height: 80,
    },
    bottomContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: SPACING.large,
    },
    bottomFloatingContainer: {
      borderRadius: 22,
      backgroundColor: theme.background.third,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      paddingVertical: SPACING.medium,
      paddingHorizontal: 32,
    },
  });

export default DiaryEntryScreen;
