import React, { useEffect } from 'react';

import { useRoute } from '@react-navigation/native';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Container, Icon, Loading, Spacer, Text } from '../../common';
import { Calendar, Header } from '../../components';
import { DIMENS, SCREENS, SPACING } from '../../constants';
import { useFetchUser, useFetchUsersAnswers, useTheme } from '../../hooks';
import { NavigationProps, Theme } from '../../types';
import { isSameDate, showSnackbar } from '../../utils';

type Props = {
  navigation: NavigationProps;
};
type Params = {
  id: number;
};
// TODO: fix iconSizes so they match with eachother. Proably has to do with viewbox i think. Right now i set size individually and its not good. Though, the SVG could still be more descriptive of how the look, instead of what they do
const ProfileScreen = ({ navigation }: Props) => {
  const { params } = useRoute();
  const { id: userId } = params as Params;
  const { data: user, isLoading } = useFetchUser(userId);
  const { data } = useFetchUsersAnswers(userId);
  const answers = data?.rows;
  const { theme } = useTheme();
  const translateKey = 'ProfileScreen.';
  useEffect(() => {
    console.log('answers', markedDates);
  }, [answers]);
  const markedDates =
    answers?.reduce((acc: Date[], item) => {
      item.createdAt && acc.push(new Date(item.createdAt));
      return acc;
    }, []) || [];

  const handleDayPress = (day: Date) => {
    const answer = answers?.find((a) => a.createdAt && isSameDate(new Date(a.createdAt), day));
    if (!answer) {
      showSnackbar('No diary entry');
      return;
    }

    navigation.navigate(SCREENS.DIARY_ENTRY_SCREEN, { answerId: answer.id });
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Header
        leftItems={[
          <Icon
            icon='chevronDown'
            key='back'
            variant='third'
            size={17}
            onPress={() => navigation.goBack()}
          />,
        ]}
        rightItems={[<Icon icon='dots' key='dots' variant='third' size={25} />]}
      />
      <Spacer />
      <Container>
        <>
          <View style={styles(theme).topContainer}>
            <Image style={styles(theme).profileImage} source={{ uri: user?.profileImage?.url }} />
            <Spacer spacing='large' orientation='horizontal' />
            <View>
              <Text type='subHeader' emphasis='high'>
                {user?.name}
              </Text>
              <View style={styles(theme).locationContainer}>
                <Icon icon='location' variant='third' size={12} fill={theme.base.low} />
                <Spacer spacing='tiny' orientation='horizontal' />
                <Text type='small'>{`${user?.location?.cityName}, ${user?.location?.country.code}`}</Text>
              </View>
            </View>
          </View>
          <View>
            <Spacer spacing='medium' />
            <Spacer spacing='tiny' />
            <Text type='caption' emphasis='high'>
              {user?.bio}
            </Text>
            <Spacer />
          </View>

          <Spacer spacing='large' />
          <View style={styles(theme).diaryContainer}>
            <Text weight='bold' emphasis='high'>
              Diary
            </Text>
            <Spacer spacing='small' />
            <Calendar
              style={styles(theme).calendar}
              onDayPress={handleDayPress}
              markedDates={markedDates}
            />
          </View>
        </>
      </Container>
    </>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    profileImage: {
      borderRadius: DIMENS.common.borderRadiusRound,
      width: 80,
      height: 80,
    },

    topContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    socialMediasContainer: {},
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
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    diaryContainer: {
      alignItems: 'center',
      width: '100%',
    },
    calendar: {
      width: Dimensions.get('screen').width - SPACING.medium * 2,

      flex: 1,
    },
  });

export default ProfileScreen;
