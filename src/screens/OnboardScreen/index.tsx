import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { Button } from '../../common';
import Logo from '../../common/Logo/Logo';
import { SPACING, USER } from '../../constants';
import { translate } from '../../i18n';
import { ScreenProps } from '../../types';
import About from './views/About';
import Name from './views/Name';
import Register from './views/Register';

// FIX: when clicking on an input the entire register
// component gets pushed so far up that the text gets
// covered by the topButton component
// ALSO: Registeringing isn't complete,
// api and validation steps still need to be filled int
const OnboardScreen = ({ navigation }: ScreenProps) => {
  const btnTranslateKey = 'button.';
  const flatListRef = useRef<FlatList>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);

  const pages = [
    {
      key: 'name',
      required: [name.length > 0],
      component: <Name name={name} updateName={setName} />,
    },
    {
      key: 'about',
      required: [],
      component: <About maxLength={USER.ABOUT_LENGTH} about={about} updateAbout={setAbout} />,
    },
    {
      key: 'register',
      required: [
        email.length > 0,
        password == confirmedPassword,
        password.length > 0,
        password.length > 0,
      ],
      component: (
        <Register
          email={email}
          updateEmail={setEmail}
          password={password}
          updatePassword={setPassword}
          confirmedPassword={confirmedPassword}
          updateConfirmedPassword={setConfirmedPassword}
        />
      ),
    },
  ];

  const handleRegister = async () => {
    setLoading(true);
    const bruh = await new Promise((r) => setTimeout(r, 2000));
    // const {data} = await signUpUser({email, password})
    // handle storage of authkey optained from data
    setLoading(false);
    // nextPage();
    // Finnish onboarding
  };

  const previousPage = () =>
    currentPage === 0 ? navigation.goBack() : setCurrentPage(Math.max(currentPage - 1, 0));
  const nextPage = () => setCurrentPage(Math.min(currentPage + 1, pages.length - 1));
  const lastPage = () => pages.length - 1;

  const handleNext = () => {
    if (currentPage == lastPage()) {
      handleRegister();
      return;
    }
    nextPage();
  };
  const canContinue = () => pages[currentPage].required.reduceRight((a, b) => a && b, true);

  useEffect(() => {
    flatListRef.current?.scrollToIndex({ index: currentPage, animated: true });
  }, [currentPage]);

  const getItemLayout = (data: any, index: number) => ({
    length: Dimensions.get('window').width,
    offset: Dimensions.get('window').width * index,
    index,
  });
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Logo />
      </View>
      <View style={styles.flatList}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={styles.flatList}
          getItemLayout={getItemLayout}
          ref={flatListRef}
          data={pages}
          horizontal={true}
          renderItem={({ item: { component } }) => <View style={styles.page}>{component}</View>}
          scrollEnabled={false}
        />
      </View>
      <View style={styles.bottomBar}>
        <Button
          onPress={previousPage}
          title={translate(btnTranslateKey + 'back')}
          size='large'
          variant='third'
        />

        <Button
          loading={loading}
          onPress={handleNext}
          title={translate(btnTranslateKey + 'next')}
          size='large'
          disabled={!canContinue()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
  },
  flatList: {
    flex: 1,
  },
  page: {
    width: Dimensions.get('window').width,
  },
  hidden: {
    opacity: 0,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.large,
    paddingBottom: SPACING.large,
  },

  topBar: {
    alignItems: 'center',
    paddingTop: SPACING.medium,
  },
});

export default OnboardScreen;
