import React, { useEffect, useState } from 'react';

import { FlatList, Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Container, Icon, Input, Spacer, Text } from '../../common';
import { DIMENS, SCREENS } from '../../constants';
import { useSearchItems, useTheme } from '../../hooks';
import { useAuth } from '../../providers/AuthProvider';
import { ChatModel, NavigationProps, Theme } from '../../types';
import { formatRelativeDate } from '../../utils';

const ChatItem = ({ chat, onPress }: { chat: ChatModel; onPress: () => void }) => {
  const { currentUser } = useAuth();
  const otherUser = chat.users?.find((u) => u.id !== currentUser?.id);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          style={{ width: 45, height: 45, borderRadius: DIMENS.common.borderRadiusRound }}
          source={{ uri: otherUser?.profileImage?.url }}
        />
        <Spacer orientation='horizontal' />
        <View>
          <Text emphasis='high'>{otherUser?.name}</Text>
          {otherUser?.lastActive && (
            <Text emphasis='low' type='small'>
              {otherUser.isActive
                ? 'Active now'
                : formatRelativeDate(new Date(otherUser?.lastActive), true)}
            </Text>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

type Props = {
  navigation: NavigationProps;
};

// TODO: pagination
const SearchScreen = ({ navigation }: Props) => {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const [searchPhrase, setSearchPhrase] = useState('');
  const translateKey = 'SearchScreen.';
  const { data, refetch } = useSearchItems(searchPhrase, currentUser?.id);
  useEffect(() => {}, [data]);
  const chats = data?.pages.flatMap((page) => page.chats.rows);
  const renderChatItem = ({ item }: { item: ChatModel }) => {
    return (
      <>
        <ChatItem
          chat={item}
          onPress={() => navigation.push(SCREENS.CHAT_SCREEN, { id: item.id })}
        />
        <Spacer spacing='large' />
      </>
    );
  };

  return (
    <Container>
      <>
        <Spacer spacing='extraLarge' />
        <View style={styles(theme).inputContainer}>
          <Icon icon='back' variant='third' size={18} onPress={() => navigation.goBack()} />
          <Spacer orientation='horizontal' />
          <Input
            placeholder='Search for users'
            rightIcon={
              searchPhrase
                ? { icon: 'close', size: 14, onPress: () => setSearchPhrase('') }
                : undefined
            }
            value={searchPhrase}
            updateValue={(v) => setSearchPhrase(v)}
            style={styles(theme).input}
          />
        </View>
        <Spacer spacing={40} />
        <FlatList
          data={chats}
          renderItem={renderChatItem}
          ListEmptyComponent={<Text>No Results</Text>}
        />
      </>
    </Container>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    input: {
      flex: 1,
    },
  });

export default SearchScreen;
