import React, { Dispatch } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Container, Modal, Spacer, Text } from '../../common';
import { useTheme } from '../../hooks';
import { ChatModel, Theme } from '../../types';

type Props = {
  album?: ChatModel;
  visible: boolean;
  setVisible: Dispatch<boolean>;
  onPress: () => void;
};

const AlbumJoinModal = ({ album, visible, setVisible, onPress }: Props) => {
  const { theme } = useTheme();
  if (!album) {
    return <></>;
  }
  return (
    <Modal visible={visible} setVisible={setVisible}>
      <Container style={styles(theme).container}>
        <>
          <View style={styles(theme).upperContainer}>
            {album.coverImage && (
              <Image style={styles(theme).image} source={{ uri: album.coverImage.url }} />
            )}
            <Spacer />
            {album.name && <Text weight='bold'>{album.name}</Text>}
            <Spacer spacing='tiny' />
            {album.creator && (
              <Text type='small' emphasis='medium'>
                {album.creator.name}
              </Text>
            )}
          </View>
          <Spacer spacing={60} />
          <Button title='Join' variant='third' onPress={onPress} />
        </>
      </Container>
    </Modal>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: 60,
    },
    upperContainer: {
      alignSelf: 'center',
      alignItems: 'center',
    },
    image: {
      width: 150,
      height: 150,
    },
  });

export default AlbumJoinModal;
