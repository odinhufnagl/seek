// TODO: I see this modal as a substitute to a ProfileScreen, so for me it makes sense kinda that this is a smart component, and fetches data by itself

import React, { Dispatch, useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Container, Icon, Modal, Spacer, Text } from '../../common';
import { DIMENS, SPACING } from '../../constants';
import { useTheme } from '../../hooks';
import { blockUser, fetchUser, reportUser } from '../../services';
import { Theme, UserModel } from '../../types';
import List from '../List';

type Props = {
  userId: number;
  visible: boolean;
  setVisible: Dispatch<boolean>;
};

const ProfileModal = ({ userId, visible, setVisible }: Props) => {
  const { theme } = useTheme();
  const [user, setUser] = useState<UserModel>();
  useEffect(() => {
    (async () => {
      const userFetched = await fetchUser(userId);
      console.log('userFetched', userFetched);
      setUser(userFetched);
    })();
  }, [userId]);

  if (!user) {
    return <></>;
  }
  return (
    <Modal visible={visible} setVisible={setVisible}>
      <Container style={styles(theme).container}>
        <>
          <View style={styles(theme).upperContainer}>
            {user.profileImage && (
              <Image style={styles(theme).image} source={{ uri: user.profileImage.url }} />
            )}
            <Spacer />
            {user.name && <Text weight='bold'>{user.name}</Text>}
            <Spacer spacing='tiny' />
            {user.location && (
              <>
                <View style={styles(theme).subHeaderContainer}>
                  <Icon icon='location' fill={theme.base.low} variant='third' size={13} />
                  <Spacer spacing='tiny' orientation='horizontal' />

                  <Text type='small' emphasis='medium'>
                    {`${user.location?.cityName}, ${user.location?.country.code}`}
                  </Text>
                </View>
                <Spacer spacing='medium' />
              </>
            )}
            {user.bio && (
              <Text type='caption' emphasis='high'>
                {user.bio}
              </Text>
            )}
          </View>

          <Spacer spacing='large' />
          <List
            items={[
              { title: 'Block', icon: 'userRemove', iconSize: 27, onPress: blockUser },
              { title: 'Report', icon: 'warning', iconSize: 28, onPress: reportUser },
            ]}
          />
          <Spacer spacing='small' />
        </>
      </Container>
    </Modal>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'flex-end',
      paddingBottom: SPACING.extraLarge,
      flex: 0,
    },
    upperContainer: {
      alignSelf: 'center',
      alignItems: 'center',
    },
    subHeaderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 110,
      height: 110,
      borderRadius: DIMENS.common.borderRadiusRound,
    },
  });

export default ProfileModal;
