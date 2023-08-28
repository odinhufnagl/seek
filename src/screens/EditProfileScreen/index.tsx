import React, { useEffect, useState } from 'react';

import { useRoute } from '@react-navigation/native';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Container, Icon, Input, Loading, Spacer } from '../../common';
import { Header, ModalList } from '../../components';
import { DEFAULT_IMAGES, DIMENS } from '../../constants';
import { useFetchUser, useTheme } from '../../hooks';
import { translate } from '../../i18n';
import { useAuth } from '../../providers/AuthProvider';
import { openCamera, openLibrary, updateUser, uploadProfileImageFile } from '../../services';
import { FileInfo, NavigationProps, Theme } from '../../types';
import { extractFileTypeFromFilename, showSnackbar } from '../../utils';

type Props = {
  navigation: NavigationProps;
};
type Params = {
  refetch: () => void;
};
const EditProfileScreen = ({ navigation }: Props) => {
  const { params } = useRoute();
  const { refetch } = params as Params;
  const { theme } = useTheme();
  const { currentUser, refetchCurrentUser } = useAuth();
  const translateKey = 'editProfileScreen.';
  const { data: user, isLoading } = useFetchUser(currentUser?.id);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [isSavingLoading, setIsSavingLoading] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [isDefaultProfileImage, setIsDefaultProfileImage] = useState(false);

  const [newProfileImagePath, setNewProfileImagePath] = useState<string>();

  const handleSavePress = async () => {
    if (!currentUser) {
      return;
    }
    try {
      setIsSavingLoading(true);
      // TODO: this is done twice, both here and onboarding, should be simplified into one service
      if (newProfileImagePath && !isDefaultProfileImage) {
        const fileInfo: FileInfo = {
          name: newProfileImagePath.split('/').pop() || 'image.png',
          uri: newProfileImagePath,
          type: extractFileTypeFromFilename(newProfileImagePath),
        };
        const profileImageUrl = await uploadProfileImageFile(fileInfo);
        await updateUser(currentUser?.id, { name, bio, profileImage: { url: profileImageUrl } });
      } else {
        if (newProfileImagePath && isDefaultProfileImage) {
          await updateUser(currentUser.id, {
            name,
            bio,
            profileImage: { url: newProfileImagePath },
          });
        } else {
          await updateUser(currentUser.id, { name, bio });
        }
      }

      setIsSavingLoading(false);
      refetchCurrentUser();
      refetch();
      navigation.goBack();
    } catch (e) {
      showSnackbar(translate('snackbar.defaultError'), 'error');
      setIsSavingLoading(false);
    }
  };

  useEffect(() => {
    if (user?.name) {
      setName(user?.name);
    }
    if (user?.bio) {
      setBio(user?.bio);
    }
  }, [user]);
  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  const required = name.length > 0;
  return (
    <View style={{ flex: 1 }}>
      <Header
        leftItems={[
          <Icon
            icon='back'
            size={18}
            variant='third'
            onPress={() => navigation.goBack()}
            key='back'
          />,
        ]}
      />
      <Container>
        <>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ width: 100, height: 100, alignSelf: 'center' }}
              onPress={() => setImageModalVisible(true)}
            >
              <Image
                style={styles(theme).profileImage}
                source={{ uri: newProfileImagePath || user?.profileImage?.url }}
              />
              <Icon
                icon='write'
                style={{
                  width: 30,
                  height: 30,
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: theme.base.high,
                  borderColor: theme.brand,
                  borderWidth: 1,
                }}
                fill={theme.brand}
                size={15}
              />
            </TouchableOpacity>
            <Spacer spacing='extraLarge' />
            <Input
              value={name}
              updateValue={setName}
              variant='fourth'
              title='Name'
              autoCapitalize='words'
            />
            <Spacer />

            <Input multiline value={bio} updateValue={setBio} variant='fourth' title='Bio' />
          </View>
          <Button
            title='Save'
            onPress={handleSavePress}
            loading={isSavingLoading}
            disabled={!required}
          />
        </>
      </Container>
      {
        <ModalList
          visible={imageModalVisible}
          setVisible={setImageModalVisible}
          items={[
            {
              icon: 'paperStack',
              title: 'Open library',
              iconSize: 24,
              onPress: () =>
                openLibrary((loc) => {
                  setNewProfileImagePath(loc);
                  setImageModalVisible(false);
                }),
            },
            {
              icon: 'camera',
              title: 'Take a photo',
              iconSize: 24,
              onPress: () =>
                openCamera((loc) => {
                  setNewProfileImagePath(loc);
                  setImageModalVisible(false);
                }),
            },
            {
              icon: 'image',
              title: 'Set default image',
              iconSize: 24,
              onPress: () => {
                setNewProfileImagePath(DEFAULT_IMAGES.profileImage(name));
                setIsDefaultProfileImage(true);
                setImageModalVisible(false);
              },
            },
          ]}
        />
      }
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    profileImage: {
      borderRadius: DIMENS.common.borderRadiusRound,
      width: '100%',
      height: '100%',
    },

    topContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    upperContainer: {
      height: '40%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    lowerContainer: {
      height: '60%',
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  });

export default EditProfileScreen;
