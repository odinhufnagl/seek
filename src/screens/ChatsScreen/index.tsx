import { useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { getTimeZone, uses24HourClock } from 'react-native-localize';
import { Container, Spacer, Text } from '../../common';
import Icon from '../../common/Icon/Icon';
import { ChatCard, Header } from '../../components';
import { DIMENS, NAVIGATOR_STACKS, SCREENS, SPACING } from '../../constants';
import { useFetchNewQuestion, useFetchUsersChats, useTheme } from '../../hooks';
import { translate } from '../../i18n';
import { useAuth } from '../../providers/AuthProvider';
import { useNotification } from '../../providers/NotificationProvider';
import { useSocket } from '../../providers/SocketProvider';
import { fetchMessage } from '../../services';
import {
  MessageModel,
  NavigationProps,
  NotificationMessageServerUserMessageData,
  SocketMessageServerIsActiveData,
  SocketMessageServerTypingData,
  SocketMessageServerUserMessageData,
} from '../../types';
import { updateItemInList } from '../../utils';

type Chat = {
  chatId: number;
  lastMessage: MessageModel;
  otherUserId: number;
  otherUser: {
    id: number;
    lastActive: Date;
    profileImage: string;
    userName: string;
    isActive: boolean;
    isTyping: boolean;
  };
  unreadMessagesCount: number;
};

const ChatsScreen = ({ navigation }: { navigation: NavigationProps }) => {
  const { theme } = useTheme();
  const translateKey = 'chatsScreen.';
  const { currentUser } = useAuth();
  const route = useRoute();
  const { addSocketMessageHandler, removeSocketMessageHandler, socket } = useSocket();
  const { data, refetch, isLoading, fetchNextPage, hasNextPage } = useFetchUsersChats(
    currentUser?.id,
  );
  const { data: newQuestion } = useFetchNewQuestion(currentUser?.id);
  const [chats, setChats] = useState<Chat[]>([]);
  const [showNewQuestionIndicator, setShowNewQuestionIndicator] = useState(false);
  const { addNotificationHandler, removeNotificationHandler } = useNotification();

  const sortRecentsOrder = (chats: Chat[]) =>
    chats.sort((a, b) => new Date(b?.lastMessage.createdAt) - new Date(a?.lastMessage.createdAt));

  const handleUserMessageOpenedApp = async (data: NotificationMessageServerUserMessageData) => {
    navigateToChat(data.chatId);
  };

  useEffect(() => {
    addNotificationHandler('openedApp', 'message', handleUserMessageOpenedApp);

    return () => {
      removeNotificationHandler(handleUserMessageOpenedApp);
    };
  }, []);

  const handleTypingEvent = (data: SocketMessageServerTypingData) => {
    setChats((p) =>
      updateItemInList(p, 'otherUserId', data.userId, (item) => ({
        otherUser: { ...item.otherUser, isTyping: data.isTyping },
      })),
    );
  };
  // TODO: should parse the SocketMessageServer before sending it to the app to use
  const handleNewMessage = async (data: SocketMessageServerUserMessageData) => {
    // the socketmessage could just include all the data instead, maybe
    const message = await fetchMessage(data.messageId);

    setChats((p) =>
      sortRecentsOrder(
        updateItemInList(p, 'chatId', Number(data.chatId), (item) => ({
          lastMessage: message,
          // TODO: part of the "focusTest"
          /* unreadMessagesCount: currentScreenIsChat(data.chatId)
          ? item.unreadMessagesCount
          : item.unreadMessagesCount + 1,*/
          unreadMessagesCount: item.unreadMessagesCount + 1,
        })),
      ),
    );
  };

  const currentScreenIsChat = (chatId: number) => {
    const currentRoute = navigation.getState().routes[navigation.getState().index];
    return currentRoute.name === SCREENS.CHAT_SCREEN && currentRoute.params?.id === chatId;
  };

  const handleIsActiveEvent = (data: SocketMessageServerIsActiveData) => {
    setChats((p) =>
      updateItemInList(p, 'otherUserId', data.userId, (item) => ({
        otherUser: { ...item.otherUser, isActive: data.isActive },
      })),
    );
  };

  useEffect(() => {
    const newChats: Chat[] = [];
    data?.pages
      .flatMap((page) => page?.rows)
      .forEach((c) => {
        const otherUser = c.users?.find((u) => u.id !== currentUser?.id);
        if (!otherUser || !c.lastMessage) {
          return;
        }
        newChats.push({
          lastMessage: c.lastMessage,
          otherUser: {
            lastActive: new Date(otherUser.lastActive),
            id: otherUser.id,
            profileImage: otherUser.profileImage?.url || '',
            userName: otherUser.name,
            isActive: otherUser.isActive,
            isTyping: false,
          },
          unreadMessagesCount: Number(c.unreadMessagesCount) || 0,
          chatId: Number(c.id),
          otherUserId: otherUser.id,
        });
      });

    setChats(sortRecentsOrder(newChats));
  }, [data]);
  useEffect(() => {
    setShowNewQuestionIndicator(Boolean(newQuestion));
  }, [newQuestion]);
  // TODO: this might be bad, because if a user goes to a chat far down, they will end up in the top
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );
  // TODO: right now trying focus, might not be optimal
  useFocusEffect(
    React.useCallback(() => {
      addSocketMessageHandler('message', handleNewMessage);
      addSocketMessageHandler('typing', handleTypingEvent);
      addSocketMessageHandler('isActive', handleIsActiveEvent);
      return () => {
        removeSocketMessageHandler(handleNewMessage);
        removeSocketMessageHandler(handleTypingEvent);
        removeSocketMessageHandler(handleIsActiveEvent);
      };
    }, []),
  );

  const navigateToChat = (chatId: number) => {
    // TODO: part of the "focusTest"
    /* 
    setChats((p) =>
      updateItemInList(p, 'chatId', chatId, () => ({
        unreadMessagesCount: 0,
      })),
    );*/
    navigation.push(SCREENS.CHAT_SCREEN, { id: chatId });
  };

  const navigateToQuestion = () => {
    navigation.navigate(SCREENS.QUESTION_SCREEN);
  };

  const handleChatCardPress = (chatId: number) => {
    navigateToChat(chatId);
  };

  const renderChatCard = ({
    item: { chatId, lastMessage, otherUser, unreadMessagesCount },
    index,
  }: {
    item: Chat;
    index: number;
  }) => {
    return (
      <>
        <ChatCard
          onPress={() => handleChatCardPress(chatId)}
          key={chatId}
          chatId={chatId}
          isActive={otherUser.isActive}
          isTyping={otherUser.isTyping}
          lastMessage={lastMessage.text}
          currentUserWroteLastMessage={currentUser?.id === lastMessage.userId}
          lastActive={otherUser.lastActive}
          profileImage={otherUser.profileImage}
          userName={otherUser.userName}
          unreadMessagesCount={unreadMessagesCount}
        />
        <Spacer spacing='small' />
      </>
    );
  };
  const navigateToCurrentUser = () => {
    navigation.navigate(NAVIGATOR_STACKS.PROFILE_STACK, {
      screen: SCREENS.PROFILE_SCREEN,
      params: { id: currentUser?.id },
    });
  };

  const handleWriteButtonPress = () => {
    setShowNewQuestionIndicator(false);
    navigateToQuestion();
  };
  useEffect(() => {
    console.log('tz', getTimeZone(), uses24HourClock());
  }, []);

  return (
    <View style={styles(theme).container}>
      <Header
        style={styles(theme).header}
        leftItems={[
          <TouchableOpacity key='image' onPress={navigateToCurrentUser}>
            <Image
              source={{
                uri: currentUser?.profileImage?.url,
              }}
              style={styles(theme).profileImage}
            />
          </TouchableOpacity>,
          //   <Logo size='medium' />,
        ]}
        rightItems={[
          <Icon
            icon='search'
            variant='third'
            size={25}
            key='search'
            onPress={() => navigation.navigate(SCREENS.SEARCH_SCREEN)}
          />,
          <Icon
            icon='settings'
            variant='third'
            size={24}
            key='settings'
            onPress={() => navigation.navigate(NAVIGATOR_STACKS.SETTINGS_STACK)}
          />,
        ]}
        header={translate(translateKey + 'header')}
        headerTitleProps={{ type: 'header', weight: 'bold', emphasis: 'high' }}
        headerLeft
      />
      {chats.length === 0 && !isLoading && (
        <View style={styles(theme).noChatsContainer}>
          <Text weight='bold'>No chats yet</Text>
          <Spacer spacing='tiny' />
          <Text type='small' style={{ width: '40%', textAlign: 'center' }}>
            You will be notified when there is a new connection!
          </Text>
        </View>
      )}
      <Container>
        <>
          <Spacer spacing={40} />
          {chats.length > 0 && (
            <Text weight='bold' emphasis='high'>
              Recents
            </Text>
          )}
          <Spacer spacing='small' />

          {chats.length > 0 && !isLoading && (
            <FlatList
              data={chats}
              renderItem={renderChatCard}
              onEndReached={() => {
                hasNextPage && fetchNextPage();
              }}
            />
          )}
        </>
      </Container>
      <Icon
        showIndicator={showNewQuestionIndicator}
        variant='primary'
        icon='write'
        style={styles(theme).iconQuestion}
        onPress={handleWriteButtonPress}
      />
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      paddingBottom: SPACING.medium,
      paddingHorizontal: SPACING.large,
      paddingVertical: SPACING.large,
    },
    profileImage: {
      width: 42,
      height: 42,
      borderRadius: DIMENS.common.borderRadiusRound,
    },
    iconQuestion: {
      position: 'absolute',
      right: SPACING.large,
      bottom: SPACING.large,
    },
    noChatsContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: -100,
    },
  });

export default ChatsScreen;
