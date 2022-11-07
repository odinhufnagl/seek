import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, FlatList, View, StyleSheet } from 'react-native';
import { Button } from '../../common';
import Register from './views/Register';
import About from './views/About';
import Name from './views/Name';
import { translate } from './../../i18n';
import { SPACING } from '../../constants';
import { USER } from '../../constants';
import Logo from '../../common/Logo/Logo';

//FIX: when clicking on an input the entire register
// component gets pushed so far up that the text gets
// covered by the topButton component
//ALSO: Registeringing isn't complete,
// api and validation steps still need to be filled int
const OnboardScreen = () => {
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
      required: [() => name.length > 0],
      component: <Name name={name} updateName={setName} />,
    },
    {
      key: 'about',
      required: [],
      component: <About maxLength={USER.ABOUT_LENGTH} about={about} updateAbout={setAbout} />,
    },
    {
      key: 'register',
      required: [() => email.length > 0, () => password == confirmedPassword],
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
    //const {data} = await signUpUser({email, password})
    //handle storage of authkey optained from data
    setLoading(false);
    //nextPage();
    //Finnish onboarding
  };

  const previousPage = () => setCurrentPage(Math.max(currentPage - 1, 0));
  const nextPage = () => setCurrentPage(Math.min(currentPage + 1, pages.length - 1));
  const lastPage = () => pages.length - 1;

  const handleNext = () => {
    if (currentPage == lastPage()) {
      handleRegister();
      return;
    }
    nextPage();
  };
  const canContinue = () => pages[currentPage].required.reduceRight((a, b) => a && b(), true);

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
        <View style={[styles.buttonBack, currentPage == 0 && styles.hidden]}>
          <Button
            onPress={previousPage}
            title={translate(btnTranslateKey + 'back')}
            size='large'
            variant='third'
            disabled={currentPage == 0}
          />
        </View>
        <View style={styles.buttonNext}>
          <Button
            loading={loading}
            onPress={handleNext}
            title={translate(btnTranslateKey + 'next')}
            size='large'
            disabled={!canContinue()}
          />
        </View>
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
    padding: 0,
    paddingHorizontal: SPACING.large,
    paddingBottom: SPACING.large,
  },
  buttonBack: {
    alignItems: 'flex-start',
    flexBasis: '50%',
  },
  buttonNext: {
    alignItems: 'flex-end',
    flexBasis: '50%',
  },
  topBar: {
    alignItems: 'center',
    paddingTop: SPACING.medium,
  },
});

export default OnboardScreen;
