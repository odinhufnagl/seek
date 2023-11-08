import { useFocusEffect, useRoute } from '@react-navigation/native';

import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  AppState,
  AppStateStatus,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon, Loading, Spacer, Text } from '../../common';
import { Chat, Header, ProfileModal } from '../../components';
import { DIMENS, SPACING } from '../../constants';
import { useFetchChat, useFetchMessages, useTheme } from '../../hooks';
import { useAuth } from '../../providers/AuthProvider';
import { useSocket } from '../../providers/SocketProvider';
import { fetchMessage, sendIsTypingEvent } from '../../services';
import { markMessagesAsRead, sendChatMessage } from '../../services/messaging';
import {
  MessageModel,
  ScreenProps,
  SocketMessageServerIsActiveData,
  SocketMessageServerTypingData,
  SocketMessageServerUserMessageData,
  UserModel,
} from '../../types';
import { formatRelativeDate } from '../../utils';

type Params = {
  id: number;
};
const keyboardVerticalOffset = Platform.OS === 'ios' ? 120 : 0;
const ChatScreen = ({ navigation }: ScreenProps) => {
  const { socket, addSocketMessageHandler, removeSocketMessageHandler, sendSocketMessage } =
    useSocket();
  const chatListRef = useRef<FlatList>(null);
  const { theme } = useTheme();
  const { params } = useRoute();
  const { id: chatId } = params as Params;
  const {
    data: chat,
    isLoading: chatIsLoading,
    isRefetching: chatIsRefetching,
  } = useFetchChat(chatId);
  const [dateNow, setDateNow] = useState<Date>(new Date());
  const [otherUser, setOtherUser] = useState<UserModel | undefined>();
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [otherUserLastRead, setOtherUserLastRead] = useState<Date | undefined>(null);
  const [otherUserActive, setOtherUserActive] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const translateKey = 'chatScreen.';
  const { currentUser } = useAuth();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
    fetchPreviousPage,
    isRefetching: messagesIsRefreshing,
    isLoading: messagesIsLoading,
  } = useFetchMessages(
    {
      where: {
        chatId: { value: chatId },
        createdAt: { value: dateNow.toISOString(), unaryOperator: 'lt' },
      },
      orderBy: 'DESC',
      sortBy: 'createdAt',
    },
    20,
  );

  const messages = data?.pages.flatMap((page) => page?.rows);
  const totalMessagesCount = data?.pages[0]?.count;
  const [newMessages, setNewMessages] = useState<MessageModel[]>([]);
  const allMessages = [...(messages || []), ...newMessages];
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 80], // Change values according to your requirements
    outputRange: [theme.transparent, theme.background.primary], // Change colors as needed
    extrapolate: 'clamp',
  });

  const otherUserRef = useRef<UserModel>();

  const refetchMessages = () => {
    setNewMessages([]);
    setDateNow(new Date());
  };

  const handleAppStateChange = (state: AppStateStatus) => {
    console.log('st', state);
    if (!currentUser) {
      return;
    }
    if (state === 'active') {
      console.log('hello are you active');
      refetchMessages();
    }
  };

  useEffect(() => {
    const listener = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      listener.remove();
    };
  }, []);

  useEffect(() => {
    setOtherUser(chat?.users?.find((u) => u.id !== currentUser?.id));
  }, [chat]);

  useEffect(() => {
    otherUserRef.current = otherUser;
    otherUser && otherUser.userChat && setOtherUserLastRead(new Date(otherUser.userChat?.lastRead));
  }, [otherUser]);

  useFocusEffect(
    React.useCallback(() => {
      if (!currentUser || !chat) {
        return;
      }
      markMessagesAsRead(chat, currentUser.id);
      return () => markMessagesAsRead(chat, currentUser.id);
    }, [chat]),
  );

  const handleExternalTypingEvent = (data: SocketMessageServerTypingData) => {
    if (data.chatId !== chatId) {
      return;
    }
    if (data.userId === otherUserRef.current?.id) {
      setOtherUserTyping(data.isTyping);
    }
  };
  const handleNewMessage = async (data: SocketMessageServerUserMessageData) => {
    if (data.chatId !== chatId) {
      return;
    }
    // the socketmessage could just include all the data instead
    const message = await fetchMessage(data.messageId);

    setNewMessages((p) => [...p, message]);
    chat && currentUser && markMessagesAsRead(chat, currentUser?.id);
  };
  const handleTyping = (isTyping: boolean) => {
    if (!otherUser || !currentUser) {
      return;
    }
    sendIsTypingEvent(socket, {
      chatId,
      isTyping,
      senderId: currentUser.id,
    });
  };
  const handleIsActiveEvent = (data: SocketMessageServerIsActiveData) => {
    if (data.userId === otherUserRef.current?.id) {
      setOtherUserActive(data.isActive);
    }
  };

  useEffect(() => {
    setOtherUserActive(Boolean(otherUser?.isActive));
  }, [otherUser]);

  useEffect(() => {
    addSocketMessageHandler('message', handleNewMessage);
    addSocketMessageHandler('typing', handleExternalTypingEvent);
    addSocketMessageHandler('isActive', handleIsActiveEvent);
    return () => {
      removeSocketMessageHandler(handleNewMessage);
      removeSocketMessageHandler(handleExternalTypingEvent);
      removeSocketMessageHandler(handleIsActiveEvent);
    };
  }, []);

  const sendMessage = async (message: string) => {
    console.log('message,', message);
    if (!otherUser || !currentUser) {
      return false;
    }
    // sendChatMessage(socket, { text: message, chatId, userId: currentUser?.id });
    // const res = await createMessage({ text: message, chatId: chatId, userId: currentUser?.id });
    // setNewMessages((p) => [...p, res]);
    await sendChatMessage(socket, { text: message, chatId: chatId, userId: currentUser?.id });
    return true;
  };
  const handleScrollPositionChange = (pos) => {
    scrollY.setValue(pos);
  };

  const navigateToOtherUser = () => {
    setShowProfile(true);
  };

  const existsMessagesLeftToSee =
    messages && totalMessagesCount && messages?.length < totalMessagesCount;
  const isLoading =
    !otherUser || chatIsLoading || messagesIsLoading || messagesIsRefreshing || chatIsRefetching;

  if (isLoading) {
    return <></>;
  }
  return (
    <View style={styles(theme).container}>
      <Header
        style={[styles(theme).header, { backgroundColor: headerBackgroundColor }]}
        leftItems={[
          <Icon
            variant='third'
            icon='back'
            size={18}
            onPress={() => navigation.goBack()}
            key='back'
          />,
          <TouchableWithoutFeedback onPress={navigateToOtherUser} key='image'>
            <Image
              source={{
                uri: otherUser?.profileImage?.url,
              }}
              style={styles(theme).profileImage}
            />
          </TouchableWithoutFeedback>,
        ]}
        rightItems={[
          <Icon icon='dots' variant='third' size={25} key={'dots'} onPress={navigateToOtherUser} />,
        ]}
        headerTitleProps={{ type: 'header', weight: 'bold', emphasis: 'high' }}
        subHeader={otherUserActive ? 'Active now' : formatRelativeDate(otherUser?.lastActive, true)}
        header={otherUser?.name}
        headerLeft
      />
      {/* bad handling of unread messages. Should be more explanatory and general. Perhaps just send the otherUsers lastRead and go from there? Or we make it more general by adding hasReadMessage to each message which is a list of users. This however does not really follow how our backend operate*/}
      <Chat
        onTyping={() => handleTyping(true)}
        onStopTyping={() => handleTyping(false)}
        hasNextPage={hasNextPage}
        listRef={chatListRef}
        onScrollPositionChange={handleScrollPositionChange}
        messages={allMessages}
        chat={chat}
        otherUser={otherUser}
        otherUserLastRead={otherUserLastRead}
        fetchNextPage={() => !isFetching && fetchNextPage()}
        isFetching={isFetching}
        onSendMessage={sendMessage}
        totalMessageCount={totalMessagesCount}
        onOtherUserPress={navigateToOtherUser}
        usersTyping={otherUserTyping ? [otherUser] : []}
        header={
          isFetching || existsMessagesLeftToSee ? (
            <Loading />
          ) : (
            <ImageBackground
              style={styles(theme).coverImageBackground}
              imageStyle={styles(theme).coverImageStyle}
              source={{ uri: chat?.question?.coverImage?.url }}
            >
              <LinearGradient
                style={styles(theme).linearGradient}
                colors={['rgba(0, 0, 0, 0.8)', 'transparent']}
              />
              <View style={{ paddingHorizontal: SPACING.medium, width: '80%' }}>
                <>
                  <Text type='caption'>
                    {chat?.question?.timeToStart && formatRelativeDate(chat?.question?.createdAt)}
                  </Text>
                  <Spacer spacing='tiny' />
                  <Text weight='bold' emphasis='high' type='subHeader'>
                    {chat?.question?.title}
                  </Text>
                  <Spacer spacing='medium' />
                </>
              </View>
            </ImageBackground>
          )
        }
      />
      <Spacer />
      {showProfile && (
        <ProfileModal userId={otherUser.id} visible={showProfile} setVisible={setShowProfile} />
      )}
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
      position: 'relative',
    },
    header: {
      position: 'absolute',
      top: 0,
      zIndex: 100,
      paddingHorizontal: SPACING.medium,
      paddingVertical: SPACING.medium,
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
    coverImageBackground: {
      width: '100%',
      opacity: 1.0,
      backgroundColor: theme.black,
      position: 'relative',
      justifyContent: 'flex-end',
    },
    coverImageStyle: {
      opacity: 0.3,
    },
    linearGradient: {
      width: '100%',
      height: 80,
    },
    chatContainer: {
      flex: 1,
      paddingHorizontal: SPACING.medium,
      paddingBottom: SPACING.medium,
    },
    keyboardAvoidingContainer: {
      flexGrow: 1,
    },
    bottomContainer: {
      paddingHorizontal: SPACING.medium,
    },
  });

export default ChatScreen;
