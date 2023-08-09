import React, { useEffect } from 'react';

import { BlurView } from '@react-native-community/blur';
import { useRoute } from '@react-navigation/native';
import { Image, StyleSheet, View } from 'react-native';
import handShakeImage from '../../../assets/images/emojis/handShake/handShake.png';
import { Button, Container, Icon, Spacer, Text } from '../../common';
import { Header } from '../../components';
import { DIMENS, SCREENS } from '../../constants';
import { useFetchChat, useTheme } from '../../hooks';
import { useAuth } from '../../providers/AuthProvider';
import { markChatAsSeen } from '../../services';
import { NavigationProps, Theme } from '../../types';
type Props = {
  navigation: NavigationProps;
};
type Params = {
  chatId: number;
};

const NewConnectionScreen = ({ navigation }: Props) => {
  const { theme } = useTheme();
  const { params } = useRoute();
  const { currentUser } = useAuth();
  const { chatId } = params as Params;
  const { data: chat, isLoading } = useFetchChat(chatId);
  const translateKey = 'NewConnectionScreen.';
  const otherUser = chat?.users?.find((u) => u.id !== currentUser?.id);
  const currentUserExtended = chat?.users?.find((u) => u.id === currentUser?.id);
  const handleGoToChatPressed = () => {
    if (!chat) {
      return;
    }
    navigation.replace(SCREENS.CHAT_SCREEN, { id: chat?.id });
  };
  useEffect(() => {
    if (!currentUser) {
      return;
    }
    markChatAsSeen(currentUser?.id, chatId);
  }, [currentUser]);
  return (
    <BlurView style={styles(theme).blurContainer} blurType='dark' blurAmount={1} blurRadius={1}>
      <View style={styles(theme).container}>
        <Header
          leftItems={[
            <Icon
              icon='back'
              size={20}
              variant='third'
              key='back'
              onPress={() => navigation.goBack()}
            />,
          ]}
        />
        <Container>
          <>
            <View style={styles(theme).middleContainer}>
              <Text
                type='header'
                emphasis='high'
                style={styles(theme).header}
              >{`You've connected with ${otherUser?.name}!`}</Text>
              <Spacer spacing={60} />
              <View style={styles(theme).imagesContainer}>
                <Image
                  style={styles(theme).profileImage}
                  source={{ uri: otherUser?.profileImage?.url }}
                />
                <View style={styles(theme).emojiContainer}>
                  <Image source={handShakeImage} resizeMode='cover' />
                </View>

                <Image
                  style={styles(theme).profileImage}
                  source={{ uri: currentUserExtended?.profileImage?.url }}
                />
              </View>
            </View>
            <Button title='Go to chat' onPress={handleGoToChatPressed} />
          </>
        </Container>
      </View>
    </BlurView>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    profileImage: {
      width: 115,
      height: 115,
      borderRadius: DIMENS.common.borderRadiusRound,
      borderWidth: 4,
      borderColor: theme.white,
    },
    emojiContainer: {
      height: 50,
      width: 50,
      backgroundColor: theme.white,
      borderRadius: DIMENS.common.borderRadiusRound,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: -15,
      marginRight: -15,
      zIndex: 100,
    },
    blurContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    header: {
      width: '80%',
      textAlign: 'center',
    },
    middleContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imagesContainer: { flexDirection: 'row', alignItems: 'center' },
    container: {
      flex: 1,
    },
  });

export default NewConnectionScreen;
