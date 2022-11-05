import React, { FunctionComponent, useRef, useState, useEffect } from 'react';
import { Dimensions, FlatList, View, StyleSheet } from 'react-native';
import { Button, Container } from '../../common';
import About from './views/About';
import Name from './views/Name';
import { translate } from './../../i18n';
import { SPACING } from '../../constants';
import { USER } from '../../constants';

const OnboardScreen = () => {
  const btnTranslateKey = 'button.';
  const flatListRef = useRef<FlatList>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  const pages = [
    <Name maxLength={USER.NAME_LENGTH} name={name} updateName={setName} />,
    <About maxLength={USER.ABOUT_LENGTH} about={about} updateAbout={setAbout} />,
  ];

  const previousPage = () => {
    console.log('back');
    setCurrentPage(Math.max(currentPage - 1, 0));
  };

  const nextPage = () => setCurrentPage(Math.min(currentPage + 1, pages.length - 1));

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
      <View style={[styles.buttonTop, currentPage == 0 && styles.hidden]}>
        <Button
          onPress={previousPage}
          title={translate(btnTranslateKey + 'previous')}
          size='medium'
          variant='primary'
          disabled={currentPage == 0}
        />
      </View>
      <View style={styles.flatList}>
        <FlatList
          getItemLayout={getItemLayout}
          ref={flatListRef}
          data={pages}
          horizontal={true}
          renderItem={({ item }) => <View style={styles.page}>{item}</View>}
          scrollEnabled={false}
        />
      </View>
      <View style={styles.buttonBottom}>
        <Button onPress={nextPage} title={translate(btnTranslateKey + 'next')} size='large' />
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
