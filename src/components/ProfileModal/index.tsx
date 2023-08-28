// TODO: I see this modal as a substitute to a ProfileScreen, so for me it makes sense kinda that this is a smart component, and fetches data by itself

import React, { Dispatch, useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Container, Icon, Modal, Spacer, Text } from '../../common';
import { DIMENS, SPACING } from '../../constants';
import { useTheme } from '../../hooks';
import { useAuth } from '../../providers/AuthProvider';
import { blockUser, fetchUser, isUserBlocked, unblockUser } from '../../services';
import { Theme, UserModel } from '../../types';
import { showSnackbar } from '../../utils';
import List from '../List';

type Props = {
  userId: number;
  visible: boolean;
  setVisible: Dispatch<boolean>;
};

const ProfileModal = ({ userId, visible, setVisible }: Props) => {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const [user, setUser] = useState<UserModel>();
  const [userIsBlocked, setUserIsBlocked] = useState(false);
  useEffect(() => {
    (async () => {
      if (!currentUser) {
        return;
      }
      const userFetched = await fetchUser(userId);
      const userBlocked = await isUserBlocked(userId, currentUser?.id);

      setUser(userFetched);
      setUserIsBlocked(userBlocked);
    })();
  }, [userId, currentUser]);

  const handleBlockUserPress = () => {
    if (currentUser) {
      blockUser(userId, currentUser?.id);
      setVisible(false);
      showSnackbar(`${user?.name} is blocked`);
    }
  };
  const handleUnblockUserPress = () => {
    if (currentUser) {
      unblockUser(userId, currentUser.id);
      setVisible(false);
      showSnackbar(`${user?.name} is unblocked`);
    }
  };

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
              {
                title: userIsBlocked ? 'Unblock' : 'Block',
                icon: 'userRemove',
                iconSize: 27,
                onPress: userIsBlocked ? handleUnblockUserPress : handleBlockUserPress,
              },
              {
                title: 'Report',
                icon: 'warning',
                iconSize: 28,
                onPress: () => showSnackbar('Reporting is being added by our developers'),
              },
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
