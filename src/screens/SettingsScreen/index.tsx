import React from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Container, Icon, Spacer, Text } from '../../common';
import { Header } from '../../components';
import { NAVIGATOR_STACKS, SCREENS } from '../../constants';
import { useTheme } from '../../hooks';
import { useAuth } from '../../providers/AuthProvider';
import { IconVariant, NavigationProps, Theme } from '../../types';
import { showSnackbar } from '../../utils';

type Props = {
  navigation: NavigationProps;
};

const ListItem = ({
  icon,
  title,
  onPress,
}: {
  icon: IconVariant;
  title: string;
  color?: string;
  onPress: () => void;
}) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={stylesListItem(theme).container}>
      <View style={{ flexDirection: 'row' }}>
        <Icon icon={icon} variant='third' size={19} fill={theme.base.low} />
        <Spacer spacing='large' orientation='horizontal' />
        <Text type='caption' weight='medium' emphasis='high'>
          {title}
        </Text>
      </View>
      <Icon icon='chevronRight' size={12} variant='third' fill={theme.base.low} />
    </TouchableOpacity>
  );
};

const stylesListItem = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 55,

      backgroundColor: 'transparent',
    },
  });

const SettingsScreen = ({ navigation }: Props) => {
  const { logOut, currentUser } = useAuth();
  const { theme } = useTheme();
  const translateKey = 'settingsScreen.';

  return (
    <>
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
        header='Settings'
      />
      <Spacer spacing='large' />
      <Container>
        <>
          <Text emphasis='primary' weight='bold' type='caption'>
            About
          </Text>
          <Spacer spacing='tiny' />

          <ListItem
            icon='privacyPolicy'
            title='Privacy policy'
            onPress={() => navigation.navigate(SCREENS.PRIVACY_POLICY_SCREEN)}
          />
          <ListItem
            icon='contact'
            title='Contact us'
            onPress={() => showSnackbar('Contact us via odin.hufnagl@gmail.com')}
          />
          <ListItem icon='about' title='About us' onPress={() => showSnackbar('Coming soon...')} />

          <Spacer />
          <Text emphasis='primary' weight='bold' type='caption'>
            Profile
          </Text>
          <Spacer spacing='tiny' />

          <ListItem
            icon='profile'
            title='Profile'
            onPress={() =>
              navigation.navigate(NAVIGATOR_STACKS.PROFILE_STACK, {
                screen: SCREENS.PROFILE_SCREEN,
                params: { id: currentUser?.id },
              })
            }
          />
          <ListItem
            icon='delete'
            title='Delete Account'
            onPress={() => showSnackbar('Contact odin.hufnagl@gmail.com to delete account')}
          />

          <ListItem icon='logOut' title='Log Out' color={theme.error} onPress={logOut} />
        </>
      </Container>
    </>
  );
};

const styles = (theme: Theme) => StyleSheet.create({});

export default SettingsScreen;
