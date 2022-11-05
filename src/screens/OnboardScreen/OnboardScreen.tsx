import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, FlatList, View, StyleSheet } from 'react-native';
import { Button } from '../../common';
import Register from './views/Register';
import About from './views/About';
import Name from './views/Name';
import { translate } from './../../i18n';
import { SPACING } from '../../constants';
import { USER } from '../../constants';

//FIX: when clicking on an input the entire register
// component gets pushed so far up that the text gets
// covered by the topButton component
//ALSO: Registeringing isn't complete,
// api and validation steps still need to be filled int
const OnboardScreen = () => {
  const btnTranslateKey = 'button.';
  const flatListRef = useRef<FlatList>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);

  const pages = [
    <Register
      mail={mail}
      updateMail={setMail}
      password={password}
      updatePassword={setPassword}
      confirmedPassword={confirmedPassword}
      updateConfirmedPassword={setConfirmedPassword}
    />,
    <Name name={name} updateName={setName} />,
    <About maxLength={USER.ABOUT_LENGTH} about={about} updateAbout={setAbout} />,
  ];

  const handleRegister = async () => {
    if (password !== confirmedPassword) {
      console.log("SNACKBAR of 'passwords don't match'");
      return;
    }
    //validate email adress, first syntactically, then check that account doesn't already exist
    const emailValid = true;
    if (!emailValid) {
      console.log("SNACKBAR of 'please type a valid email'");
      return;
    }
    const emailExists = true;
    if (emailExists) {
      console.log("SNACKBAR of 'account already exists, sign in here'");
      return;
    }

    setLoading(true);
    const bruh = await new Promise((r) => setTimeout(r, 2000));
    //const {data} = await signUpUser({mail, password})
    //handle storage of authkey optained from data
    setLoading(false);
    nextPage();
  };

  const previousPage = () => setCurrentPage(Math.max(currentPage - 1, 0));
  const nextPage = () => setCurrentPage(Math.min(currentPage + 1, pages.length - 1));

  const handleNext = () => {
    if (currentPage == 0) {
      handleRegister();
      return;
    }
    nextPage();
  };

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
      <View style={[styles.buttonTop, currentPage <= 1 && styles.hidden]}>
        <Button
          onPress={previousPage}
          title={translate(btnTranslateKey + 'previous')}
          size='medium'
          variant='primary'
          disabled={currentPage <= 1}
        />
      </View>
      <View style={styles.flatList}>
        <FlatList
          style={styles.flatList}
          getItemLayout={getItemLayout}
          ref={flatListRef}
          data={pages}
          horizontal={true}
          renderItem={({ item }) => <View style={styles.page}>{item}</View>}
          scrollEnabled={false}
        />
      </View>
      <View style={styles.buttonBottom}>
        <Button
          loading={loading}
          onPress={handleNext}
          title={translate(btnTranslateKey + 'next')}
          size='large'
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
  buttonTop: {
    paddingHorizontal: SPACING.large,
    paddingTop: SPACING.large,
    alignItems: 'flex-start',
  },
  buttonBottom: {
    paddingHorizontal: SPACING.large,
    paddingBottom: SPACING.large,
    alignItems: 'flex-end',
  },
  hidden: {
    opacity: 0,
  },
});

export default OnboardScreen;
