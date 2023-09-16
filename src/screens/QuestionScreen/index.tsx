import React, { useEffect, useRef, useState } from 'react';

import { Image, ImageBackground, StyleSheet, TextInput, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Container, Dropdown, Icon, Input, Loading, Spacer, Text } from '../../common';
import { Header } from '../../components';
import { DIMENS, SPACING } from '../../constants';
import { useFetchNewQuestion, useTheme } from '../../hooks';
import { useAuth } from '../../providers/AuthProvider';
import { createAnswer } from '../../services';
import { NavigationProps, QuestionModel, Theme } from '../../types';
import { showSnackbar } from '../../utils';
type Props = {
  navigation: NavigationProps;
};

// TODO: remove height of imageBackground, and the other places aswell!!

type AreaMode = 'global' | 'private'; // TODO: to be added:  | "local"

const QuestionScreen = ({ navigation }: Props) => {
  const { currentUser } = useAuth();
  const { theme } = useTheme();
  const [areaMode, setAreaMode] = useState<AreaMode>('global');
  const {
    data: newQuestionData,
    isLoading,
    refetch,
    isRefetching,
  } = useFetchNewQuestion(currentUser?.id);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const [answerText, setAnswerText] = useState('');
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [question, setQuestion] = useState<QuestionModel>();
  const translateKey = 'QuestionScreen.';

  const handleSendPressed = async () => {
    if (!currentUser || !newQuestionData?.question) {
      return;
    }
    try {
      setLoadingUpload(true);
      const res = await createAnswer({
        userId: currentUser?.id,
        isPrivate: areaMode === 'private',
        questionId: newQuestionData.question?.id,
        text: answerText,
        ...(areaMode === 'global' ? { area: { type: 'world' } } : {}),
      });
      showSnackbar('Answer is posted', 'success');
      setLoadingUpload(false);
      navigation.goBack();
    } catch (e) {
      showSnackbar('Could not post answer', 'error');
      setLoadingUpload(false);
    }
  };

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    if (dropdownOpen) {
      inputRef.current.blur();
    } else {
      inputRef.current.focus();
    }
  }, [dropdownOpen, inputRef.current]);

  useEffect(() => {
    setQuestion(newQuestionData?.question);
  }, [newQuestionData]);

  // TODO: isRefetching leads to bug here
  if (isLoading || isRefetching) {
    return <Loading />;
  }

  if (!newQuestionData || newQuestionData.usersAnswer || !newQuestionData.question) {
    return (
      <>
        <Header
          leftItems={[
            <Icon
              variant='third'
              icon='chevronDown'
              size={18}
              onPress={() => navigation.goBack()}
              key='back'
            />,
          ]}
        />
        <View style={styles(theme).noQuestionContainer}>
          <Text weight='bold'>No question available</Text>
          <Spacer spacing='small' />
          <Text
            type='small'
            emphasis='medium'
            weight='regular'
            style={{ width: '40%', textAlign: 'center' }}
          >
            {`${
              newQuestionData?.usersAnswer
                ? 'You have already answered the question'
                : 'You will be notified!'
            }`}
          </Text>
        </View>
      </>
    );
  }
  return (
    <View style={styles(theme).container}>
      <ImageBackground
        style={styles(theme).coverImageBackground}
        imageStyle={styles(theme).coverImageStyle}
        source={{ uri: question?.coverImage?.url }}
      >
        <Header
          style={[styles(theme).header]}
          leftItems={[
            <Icon
              variant='third'
              icon='chevronDown'
              size={18}
              onPress={() => navigation.goBack()}
              key='back'
            />,
          ]}
        />
        <LinearGradient
          style={styles(theme).linearGradient}
          colors={['rgba(0, 0, 0, 0.8)', 'transparent']}
        />
        <View style={{ paddingHorizontal: SPACING.medium, width: '90%' }}>
          <>
            <Text type='caption'>{'Todays Question'}</Text>
            <Spacer spacing='tiny' />
            <Text weight='bold' emphasis='high' type='subHeader'>
              {question?.title}
            </Text>
            <Spacer spacing='medium' />
          </>
        </View>
      </ImageBackground>
      <Spacer spacing='extraLarge' />
      <Container>
        <>
          <View style={styles(theme).contentContainer}>
            <Image
              style={styles(theme).profileImage}
              source={{ uri: currentUser?.profileImage?.url }}
            />
            <Spacer spacing='small' orientation='horizontal' />
            <View style={styles(theme).rightContainer}>
              <Dropdown
                style={{ zIndex: 1000 }}
                items={[
                  { label: 'Global', value: 'global' },
                  { label: 'Private', value: 'private' },
                ]}
                open={dropdownOpen}
                setOpen={setDropdownOpen}
                value={areaMode}
                setValue={setAreaMode}
              />

              <Input
                variant='third'
                style={{ width: '100%', height: '100%', flex: 1 }}
                multiline={true}
                inputRef={inputRef}
                value={answerText}
                autoFocus={true}
                updateValue={(v) => setAnswerText(v)}
              />
            </View>
          </View>
          <View style={styles(theme).buttonContainer}>
            <Button
              loading={loadingUpload}
              disabled={answerText === ''}
              title='Send'
              variant='secondary'
              rightIcon={{ icon: 'chevronRight', size: 14 }}
              onPress={handleSendPressed}
            />
          </View>
        </>
      </Container>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: { flex: 1 },
    answerContainer: {
      paddingHorizontal: SPACING.medium,
    },
    header: {
      zIndex: 1000,
      paddingHorizontal: SPACING.medium,
      paddingVertical: SPACING.medium,
      height: 60,
    },
    coverImageBackground: {
      width: '100%',
      opacity: 1.0,
      backgroundColor: theme.black,
      position: 'relative',
      justifyContent: 'flex-end',
    },
    coverImageStyle: {
      opacity: 0.3,
    },
    linearGradient: {
      width: '100%',
      height: 80,
      position: 'absolute',
      top: 0,
    },
    profileImage: {
      width: 45,
      height: 45,
      borderRadius: DIMENS.common.borderRadiusRound,
    },
    contentContainer: { flexDirection: 'row', flex: 1 },
    rightContainer: { flex: 1 },

    buttonContainer: {
      width: '100%',
      alignItems: 'flex-end',
    },
    noQuestionContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: -100,
    },
    noQuestionText: {
      width: '80%',
    },
  });

export default QuestionScreen;
