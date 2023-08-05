import { useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon, Loading, Spacer, Text } from '../../common';
import { Chat, Header } from '../../components';
import { DIMENS, SPACING } from '../../constants';
import { useTheme } from '../../hooks';
import { useAuth } from '../../providers/AuthProvider';
import { useSocket } from '../../providers/SocketProvider';
import { fetchMessage, sendIsTypingEvent } from '../../services';
import { useFetchChat, useFetchMessages } from '../../services/db/hooks';
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
  const chatListRef = useRef<FlatList>();
  const { theme } = useTheme();
  const { params } = useRoute();
  const { id: chatId } = params as Params;
  const { data: chat } = useFetchChat(chatId);
  const [dateNow, setDateNow] = useState<Date>(new Date());
  const [otherUser, setOtherUser] = useState<UserModel | undefined>();
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [otherUserLastRead, setOtherUserLastRead] = useState<Date | undefined>(null);
  const [otherUserActive, setOtherUserActive] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState<number[]>([]);
  const [usersTyping, setUsersTyping] = useState<UserModel[]>([]);
  const translateKey = 'chatScreen.';
  const { currentUser } = useAuth();
  console.log(dateNow);

  const { data, fetchNextPage, hasNextPage, isFetching, fetchPreviousPage } = useFetchMessages(
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

  useEffect(() => {
    console.log(chat);
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
    if (data.userId === otherUserRef.current?.id) {
      setOtherUserTyping(data.isTyping);
    }
  };
  const handleNewMessage = async (data: SocketMessageServerUserMessageData) => {
    // the socketmessage could just include all the data instead
    const message = await fetchMessage(data.messageId);
    console.log('message', message);
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
    console.log(currentUser?.id, 'active event');
    if (data.userId === otherUserRef.current?.id) {
      console.log('lalal');
      setOtherUserActive(data.isActive);
    }
  };

  useEffect(() => {
    setOtherUserActive(Boolean(otherUser?.isActive));
  }, [otherUser]);

  useEffect(() => {
    console.log('otherUserActive', otherUserActive);
  }, [otherUserActive]);

  useEffect(() => {
    console.log('adding function');
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
  useEffect(() => {
    console.log('hello world');
    chatListRef.current?.scrollToOffset({ offset: 1 });
  }, []);
  useEffect(() => {
    console.log(isFetching);
  }, [isFetching]);

  const existsMessagesLeftToSee =
    messages && totalMessagesCount && messages?.length < totalMessagesCount;
  if (!otherUser) {
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
          <Image
            key='image'
            source={{
              uri: currentUser?.profileImage?.url,
            }}
            style={styles(theme).profileImage}
          />,
        ]}
        rightItems={[<Icon icon='dots' variant='third' size={25} key={'dots'} />]}
        headerTitleProps={{ type: 'header', weight: 'bold', emphasis: 'high' }}
        subHeader={otherUserActive ? 'Active now' : formatRelativeDate(otherUser?.lastActive)}
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
        fetchNextPage={fetchNextPage}
        isFetching={isFetching}
        onSendMessage={sendMessage}
        totalMessageCount={totalMessagesCount}
        usersTyping={otherUserTyping ? [otherUser] : []}
        header={() =>
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
                    {chat?.question?.timeToStart && formatRelativeDate(chat?.question?.timeToStart)}
                  </Text>
                  <Spacer spacing='tiny' />
                  <Text weight='bold' emphasis='high' type='header'>
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
      height: 190,
      opacity: 1.0,
      backgroundColor: theme.black,
    },
    coverImageStyle: {
      opacity: 0.4,
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
