import React, { LegacyRef, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Spacer, Text } from '../../common';
import { ChatMessage, WriteMessage } from '../../components';
import { DIMENS, SPACING } from '../../constants';
import { useTheme } from '../../hooks';
import { useAuth } from '../../providers/AuthProvider';
import { ChatModel, MessageModel, Theme, UserModel } from '../../types';
import { formatRelativeDate, getTime } from '../../utils';
const MESSAGES_GROUPING_TRESHOLD_SECONDS = 5 * 60;

const formatGroupingDate = (d: Date) => `${formatRelativeDate(d)}, ${getTime(d)}`;

const messagesTimeSeparated = (messages?: MessageModel[]) => {
  if (!messages || messages.length === 0) {
    return [];
  }

  const messagesSorted = messages
    .slice()
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  /* for (let i = 1; i < messagesSorted.length; i++) {
    const message = messagesSorted[i];
    const d = new Date(message.createdAt);
    const groupingThreshold = GROUPING_TRESHOLD_MINUTES * 60 * 1000;
    const timeDifference = d - currentDate;
    if (timeDifference >= groupingThreshold) {
      currentDate = d;
      currentMessages.length > 0 && data.push(...currentMessages);

      data.push(formatDate(d));
      currentMessages = [];
    }
    currentMessages.push(message);
  }*/
  const groupedMessages: MessageModel[][] = [];

  let currentGroup = [messagesSorted[0]];

  for (let i = 1; i < messagesSorted.length; i++) {
    const currentMessage = messagesSorted[i];
    const previousMessage = messagesSorted[i - 1];

    // Calculate the time difference between the current and previous messages
    const timeDifference = new Date(currentMessage.createdAt) - new Date(previousMessage.createdAt);

    // Define a threshold (e.g., 5 minutes) for grouping messages
    const groupingThreshold = MESSAGES_GROUPING_TRESHOLD_SECONDS * 1000;
    console.log('timeDifference', timeDifference);
    if (timeDifference <= groupingThreshold) {
      // If the time difference is within the threshold, add the message to the current group
      currentGroup.push(currentMessage);
    } else {
      // If the time difference exceeds the threshold, start a new group

      groupedMessages.push(currentGroup);
      currentGroup = [currentMessage];
    }
  }
  groupedMessages.push(currentGroup);
  console.log('grouped messages', groupedMessages);
  const data: (MessageModel | string)[] = [];
  groupedMessages.forEach((group) => {
    console.log('ddd', group[0].createdAt);
    data.push(formatGroupingDate(new Date(group[0].createdAt)));
    data.push(...group);
  });

  // return data.reverse();
  return data;
};

type DateSeparatorProps = {
  text: string;
};

const DateSeparator = ({ text }: DateSeparatorProps) => {
  const { theme } = useTheme();
  return (
    <View style={dateSeparatorStyles(theme).container}>
      <View style={dateSeparatorStyles(theme).line} />
      <Text type='small' style={dateSeparatorStyles(theme).text}>
        {text}
      </Text>
      <View style={dateSeparatorStyles(theme).line} />
    </View>
  );
};

const dateSeparatorStyles = (theme: Theme) =>
  StyleSheet.create({
    line: {
      height: 2,
      backgroundColor: theme.background.secondary,
      flex: 1,
      borderRadius: DIMENS.common.borderRadiusRound,
    },
    text: {
      marginHorizontal: SPACING.small,
    },
    container: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: SPACING.medium,
    },
  });

type Props = {
  otherUser?: UserModel;
  chat?: ChatModel;
  messages?: MessageModel[];
  onSendMessage: (message: string) => Promise<boolean>;
  header: React.ComponentType<any>;
  onRefresh?: () => void;
  refreshing?: boolean;
  onScrollPositionChange: (e: any) => void;
  listRef: LegacyRef<FlatList>;
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetching?: boolean;
  onTyping: () => void;
  onStopTyping: () => void;
  totalMessageCount?: number;
  usersTyping?: UserModel[];
  otherUserLastRead?: Date | undefined;
  onOtherUserPress: () => void;
};

const Chat = ({
  otherUser,
  chat,
  isFetching,
  messages,
  onSendMessage,
  header,
  onRefresh,
  onScrollPositionChange,
  refreshing,
  fetchNextPage,
  hasNextPage,
  listRef,
  onTyping,
  onStopTyping,
  totalMessageCount,
  otherUserLastRead,
  usersTyping,
  onOtherUserPress,
}: Props) => {
  const { theme } = useTheme();
  const [input, setInput] = useState<string>();
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messagesOrdered, setMessagesOrdered] = useState<(string | MessageModel)[]>([]);
  const { currentUser } = useAuth();
  useEffect(() => {
    setMessagesOrdered([...messagesTimeSeparated(messages)].reverse());
  }, [messages]);

  const renderChatItem = ({ item, index }) => {
    if (!otherUserLastRead) {
      return;
    }

    //

    const beforeItem = messagesOrdered[index - 1];
    if (typeof item === 'string') {
      return (
        <View style={[styles(theme).item]}>
          <DateSeparator text={item} />
          <Spacer spacing='medium' />
        </View>
      );
    }
    const currentUsersLastMessageId = messages?.find((m) => m.userId === currentUser?.id)?.id;

    return (
      <View style={styles(theme).item}>
        <ChatMessage
          showImage={
            !beforeItem ||
            (item.userId === otherUser?.id &&
              (typeof beforeItem === 'string' || beforeItem.userId === currentUser?.id))
          }
          image={otherUser?.profileImage?.url}
          onImagePress={onOtherUserPress}
          isUser={item.userId === currentUser?.id}
          message={item.text}
          createdAt={item.createdAt}
          isRead={
            currentUsersLastMessageId === item.id && otherUserLastRead > new Date(item.createdAt)
          }
        />
        <Spacer spacing='medium' />
      </View>
    );
  };
  const handleOnSendPress = async () => {
    if (!input) {
      return;
    }
    const inputCopy = input;
    const res = await onSendMessage(inputCopy);
    if (res) {
      setInput(undefined);
    }
  };
  const handleScroll = (e) => {
    const contentHeight = e.nativeEvent.contentSize.height;
    const layoutHeight = e.nativeEvent.layoutMeasurement.height;
    const scrollPosition = contentHeight - layoutHeight - e.nativeEvent.contentOffset.y;
    onScrollPositionChange(scrollPosition);
    scrollPosition < 500 && hasNextPage && fetchNextPage();
  };
  const handleContentSizeChanged = () => {
    listRef?.current?.scrollToOffset({ offset: 1 });
  };

  useEffect(() => {
    !isTyping && input && setIsTyping(true);
    let timer;
    if (isTyping) {
      timer = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [input]);
  useEffect(() => {
    isTyping ? onTyping() : onStopTyping();
  }, [isTyping]);

  return (
    <>
      <View style={styles(theme).chatContainer}>
        <FlatList
          keyExtractor={(item) => (typeof item === 'string' ? item : item.id)}
          initialNumToRender={10}
          ref={listRef}
          onContentSizeChange={handleContentSizeChanged}
          onScroll={handleScroll}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
          ListFooterComponent={header}
          data={messagesOrdered}
          inverted
          renderItem={renderChatItem}
          showsVerticalScrollIndicator={false}
          windowSize={10}
        />
      </View>
      <View style={styles(theme).bottomContainer}>
        <Spacer />
        {usersTyping && usersTyping?.length > 0 && (
          <Text type='small' typeWriter typeWriterNumberOfLetters={3}>
            {`${usersTyping[0].name} is typing...`}
          </Text>
        )}
        <Spacer spacing='tiny' />
        <WriteMessage value={input} updateValue={setInput} handleOnSendPress={handleOnSendPress} />
      </View>
    </>
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
    item: {
      paddingHorizontal: SPACING.medium,
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
      opacity: 0.5,
    },
    linearGradient: {
      width: '100%',
      height: 80,
    },
    chatContainer: {
      flex: 1,
      flexGrow: 1,
    },
    bottomContainer: {
      paddingHorizontal: SPACING.medium,
    },
  });

export default Chat;
