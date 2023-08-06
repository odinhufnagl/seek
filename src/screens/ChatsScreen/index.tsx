import { useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Container, Spacer, Text } from '../../common';
import Icon from '../../common/Icon/Icon';
import { ChatCard, Header } from '../../components';
import { DIMENS, SCREENS, SPACING } from '../../constants';
import { useTheme } from '../../hooks';
import { translate } from '../../i18n';
import { useAuth } from '../../providers/AuthProvider';
import { useNotification } from '../../providers/NotificationProvider';
import { useSocket } from '../../providers/SocketProvider';
import { fetchMessage } from '../../services';
import { useFetchUsersChats } from '../../services/db/hooks';
import {
  MessageModel,
  NavigationProps,
  NotificationMessageServerDailyQuestionData,
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
  const { data, refetch } = useFetchUsersChats(currentUser?.id);
  const [chats, setChats] = useState<Chat[]>([]);

  const { addNotificationHandler, removeNotificationHandler } = useNotification();

  const handleUserMessageOpenedApp = async (data: NotificationMessageServerUserMessageData) => {
    navigateToChat(data.chatId);
  };
  const handleQuestionOpenedApp = async (data: NotificationMessageServerDailyQuestionData) => {
    navigateToQuestion();
  };

  useEffect(() => {
    addNotificationHandler('openedApp', 'message', handleUserMessageOpenedApp);
    addNotificationHandler('openedApp', 'dailyQuestion', handleQuestionOpenedApp);
    return () => {
      removeNotificationHandler(handleUserMessageOpenedApp);
      removeNotificationHandler(handleQuestionOpenedApp);
    };
  }, []);

  const handleTypingEvent = (data: SocketMessageServerTypingData) => {
    setChats((p) =>
      updateItemInList(p, 'otherUserId', data.userId, (item) => ({
        otherUser: { ...item.otherUser, isTyping: data.isTyping },
      })),
    );
  };
  const handleNewMessage = async (data: SocketMessageServerUserMessageData) => {
    // the socketmessage could just include all the data instead
    const message = await fetchMessage(data.messageId);

    setChats((p) =>
      updateItemInList(p, 'chatId', data.chatId, (item) => ({
        lastMessage: message,
        // TODO: part of the "focusTest"
        /* unreadMessagesCount: currentScreenIsChat(data.chatId)
          ? item.unreadMessagesCount
          : item.unreadMessagesCount + 1,*/
        unreadMessagesCount: item.unreadMessagesCount + 1,
      })),
    );
  };

  const currentScreenIsChat = (chatId: number) => {
    const currentRoute = navigation.getState().routes[navigation.getState().index];
    return currentRoute.name === SCREENS.CHAT_SCREEN && currentRoute.params?.id === chatId;
  };

  const handleIsActiveEvent = (data: SocketMessageServerIsActiveData) => {
    console.log(currentUser?.id, 'active event');
    setChats((p) =>
      updateItemInList(p, 'otherUserId', data.userId, (item) => ({
        otherUser: { ...item.otherUser, isActive: data.isActive },
      })),
    );
  };

  useEffect(() => {
    console.log('newChat', data, data?.length);
    const newChats: Chat[] = [];
    data?.forEach((c) => {
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
    console.log('newChats', newChats, newChats.length);
    setChats(newChats);
  }, [data]);
  // TODO: this might be bad, because if a user goes to a chat far down, they will end up in the top
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );
  // TODO: right now trying focus, might not be optimal
  useFocusEffect(
    React.useCallback(() => {
      console.log('adding function');
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
    console.log('wassup', chats, chatId);
    // TODO: part of the "focusTest"
    /* 
    setChats((p) =>
      updateItemInList(p, 'chatId', chatId, () => ({
        unreadMessagesCount: 0,
      })),
    );*/
    navigation.navigate(SCREENS.CHAT_SCREEN, { id: chatId });
  };

  useEffect(() => {
    console.log('chatsupdated');
    console.log(chats.map((c) => console.log(c.chatId, c.unreadMessagesCount)));
  }, [chats]);
  const navigateToQuestion = () => {
    navigation.navigate(SCREENS.QUESTION_SCREEN);
  };

  const handleChatCardPress = (chatId: number) => {
    navigateToChat(chatId);
  };

  const renderChatCard = ({ chatId, lastMessage, otherUser, unreadMessagesCount }: Chat) => {
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

  const handleWriteButtonPress = () => {
    navigateToQuestion();
  };

  return (
    <View style={styles(theme).container}>
      <Header
        style={styles(theme).header}
        leftItems={[
          <Image
            key='image'
            source={{
              uri: currentUser?.profileImage?.url,
            }}
            style={styles(theme).profileImage}
          />,
        ]}
        rightItems={[
          <Icon icon='search' variant='third' size={25} key='search' />,
          <Icon icon='settings' variant='third' size={24} key='settings' />,
        ]}
        header={translate(translateKey + 'header')}
        headerTitleProps={{ type: 'header', weight: 'bold', emphasis: 'high' }}
        headerLeft
      />
      <Container>
        <>
          <Spacer spacing={40} />
          <Text weight='bold' emphasis='high'>
            Recents
          </Text>
          <Spacer spacing='small' />
          {chats?.map(renderChatCard)}
        </>
      </Container>
      <Icon
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
  });

export default ChatsScreen;
