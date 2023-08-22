import React, { Dispatch } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Container, Icon, Spacer, Text } from '../../../common';
import { DIMENS } from '../../../constants';
import { useTheme } from '../../../hooks';
import { openCamera, openLibrary } from '../../../services';
import { Theme } from '../../../types';

const ProfileImage = ({
  profileImage,
  onUpdateProfileImage,
  onRemoveProfileImage,
  /* isLocalImage,
  setIsLocalImage,*/
  ...props
}: {
  profileImage: string;
  onUpdateProfileImage: Dispatch<string>;
  onRemoveProfileImage: () => void;
  /* isLocalImage: boolean;
  setIsLocalImage: Dispatch<boolean>;*/
  maxLength?: number;
  onSubmit?: () => void;
}) => {
  const translateKey = 'onboardName.';
  const { theme } = useTheme();

  return (
    <Container style={styles(theme).center} {...props}>
      <>
        <Spacer spacing='extraLarge' />
        <Text type='header'>Add profilepicture</Text>
        <Spacer spacing='small' />
        <Text type='body' style={{ textAlign: 'center' }} emphasis='medium'>
          Make it easier for people to recognize you
        </Text>
        <Spacer spacing='extraLarge' />
        <Spacer spacing='medium' />
        <View>
          <Image
            style={styles(theme).image}
            source={{
              uri: profileImage,
            }}
          />
          <Icon
            icon='close'
            onPress={onRemoveProfileImage}
            style={styles(theme).removeIconButton}
            size={13}
          />
        </View>
        <Spacer spacing='large' />
        <Button
          title='Take a photo'
          onPress={() => openCamera((loc) => onUpdateProfileImage(loc))}
          variant='third'
          style={styles(theme).button}
        />
        <Spacer />
        <Button
          title='Photo from library'
          onPress={() => openLibrary((loc) => onUpdateProfileImage(loc))}
          variant='third'
          style={styles(theme).button}
        />
      </>
    </Container>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    center: {
      alignItems: 'center',
    },
    button: {
      width: 150,
    },
    image: {
      width: 130,
      height: 130,
      borderRadius: DIMENS.common.borderRadiusRound,
    },
    removeIconButton: {
      position: 'absolute',
      bottom: 2,
      right: 2,
      width: 32,
      height: 32,
      backgroundColor: theme.error,
    },
  });
export default ProfileImage;
