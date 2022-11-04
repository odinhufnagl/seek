import React, { FunctionComponent, useRef, useState, useEffect } from 'react';
import { Dimensions, FlatList, View, StyleSheet } from 'react-native';
import { Button, Container } from '../../common';
import About from './views/About';
import Name from './views/Name';
import { translate } from './../../i18n';
import { max, min } from '../../utils';
import { SPACING } from '../../constants';

const OnboardScreen = () => {
  const btnTranslateKey = 'button.';
  const flatListRef = useRef<FlatList>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  const pages = [
    <Name name={name} setName={setName} />,
    <About about={about} setAbout={setAbout} />,
    <Name name={name} setName={setName} />,
    <About about={about} setAbout={setAbout} />,
  ];

  const previousPage = () => setCurrentPage(max(currentPage - 1, 0));

  const nextPage = () => setCurrentPage(min(currentPage + 1, pages.length - 1));

  useEffect(() => {
    flatListRef.current?.scrollToIndex({ index: currentPage, animated: true });
  }, [currentPage]);

  const getItemLayout = (data: any, index: number) => ({
    length: Dimensions.get('window').width,
    offset: Dimensions.get('window').width * index,
    index,
  });
  return (
    <View>
      <View style={styles.buttonTop}>
        {currentPage == 0 ? (
          ''
        ) : (
          <Button
            onPress={previousPage}
            title={translate(btnTranslateKey + 'previous')}
            size='medium'
            variant='primary'
            disabled={currentPage == 0}
          />
        )}
      </View>
      <View>
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
        <Button onPress={nextPage} title={translate(btnTranslateKey + 'next')} size='large' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: {
    height: '80%',
  },
  page: {
    width: Dimensions.get('window').width,
  },
  buttonTop: {
    height: '10%',
    paddingHorizontal: SPACING.large,
    paddingTop: SPACING.large,
    alignItems: 'flex-start',
  },
  buttonBottom: {
    height: '10%',
    paddingHorizontal: SPACING.large,
    paddingBottom: SPACING.large,
    alignItems: 'flex-end',
  },
});

export default OnboardScreen;
