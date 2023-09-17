import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { EmailInUseError, EmailValidationError, PasswordValidationError } from '../../classes';
import { Button, Icon } from '../../common';
import { Header } from '../../components';
import { DEFAULT_IMAGES, SPACING, USER } from '../../constants';
import { translate } from '../../i18n';
import { useAuth } from '../../providers/AuthProvider';
import { uploadProfileImageFile } from '../../services/uploadFile';
import { FileInfo, ScreenProps } from '../../types';
import {
  extractFileTypeFromFilename,
  generateHex,
  getGeoLocation,
  showSnackbar,
} from '../../utils';
import About from './views/About';
import Email from './views/Email';
import Name from './views/Name';
import Password from './views/Password';
import ProfileImage from './views/ProfileImage';

// FIX: when clicking on an input the entire register
// component gets pushed so far up that the text gets
// covered by the topButton component
// ALSO: Registeringing isn't complete,
// api and validation steps still need to be filled int
const OnboardScreen = ({ navigation }: ScreenProps) => {
  const btnTranslateKey = 'button.';
  const { signUp } = useAuth();
  const flatListRef = useRef<FlatList>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [profileImagePath, setProfileImagePath] = useState<string>(
    DEFAULT_IMAGES.profileImage(name),
  );
  const [profileImageIsDefault, setProfileImageIsDefault] = useState(true);
  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);

  const previousPage = () => {
    loading && setLoading(false);
    currentPage === 0 ? navigation.goBack() : setCurrentPage(Math.max(currentPage - 1, 0));
  };
  const nextPage = () => setCurrentPage(Math.min(currentPage + 1, pages.length - 1));
  const lastPage = () => pages.length - 1;

  const handleNext = () => {
    if (!canContinue()) {
      return;
    }
    if (currentPage == lastPage()) {
      handleRegister();
      return;
    }
    nextPage();
  };
  const canContinue = () => pages[currentPage].required.reduceRight((a, b) => a && b, true);

  const handleRemoveProfileImage = () => {
    setProfileImageIsDefault(true);
    const color = generateHex();
    setProfileImagePath(DEFAULT_IMAGES.profileImage(name, color));
  };
  const handleUpdateProfileImage = (img) => {
    setProfileImageIsDefault(false);
    setProfileImagePath(img);
  };

  useEffect(() => {
    if (profileImageIsDefault) {
      const color = generateHex();
      setProfileImagePath(DEFAULT_IMAGES.profileImage(name, color));
    }
  }, [name]);

  const pages = [
    {
      key: 'name',
      required: [name.length > 0],
      component: <Name name={name} updateName={setName} onSubmit={handleNext} />,
    },
    {
      key: 'profileImage',
      required: [],
      component: (
        <ProfileImage
          profileImage={profileImagePath}
          onUpdateProfileImage={handleUpdateProfileImage}
          onRemoveProfileImage={handleRemoveProfileImage}

          /*  isLocalImage={profileImageIsLocal}
          setIsLocalImage={setProfileImageIsLocal}*/
        />
      ),
    },
    {
      key: 'about',
      required: [],
      component: (
        <About
          maxLength={USER.ABOUT_LENGTH}
          about={about}
          updateAbout={setAbout}
          onSubmit={handleNext}
        />
      ),
    },
    {
      key: 'password',
      required: [password == confirmedPassword, password.length > 0, password.length > 0],
      component: (
        <Password
          password={password}
          updatePassword={setPassword}
          confirmedPassword={confirmedPassword}
          updateConfirmedPassword={setConfirmedPassword}
          onSubmit={handleNext}
        />
      ),
    },
    {
      key: 'email',
      required: [email.length > 0],
      component: <Email email={email} updateEmail={setEmail} onSubmit={handleNext} />,
    },
    /* {
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
          privacyPolicyChecked={privacyPolicyChecked}
          updatePrivacyPolicyChecked={setPrivacyPolicyChecked}
          password={password}
          updatePassword={setPassword}
          confirmedPassword={confirmedPassword}
          updateConfirmedPassword={setConfirmedPassword}
          onSubmit={handleNext}
        />
      ),
    },*/
  ];

  const handleRegister = async () => {
    setLoading(true);
    let profileImageUrl = profileImagePath;

    try {
      if (!profileImageIsDefault) {
        const fileInfo: FileInfo = {
          name: profileImagePath.split('/').pop() || 'image.png',
          uri: profileImagePath,
          type: extractFileTypeFromFilename(profileImagePath),
        };

        profileImageUrl = await uploadProfileImageFile(fileInfo);
      }

      getGeoLocation(
        async (location) => {
          try {
            console.log('location', location);
            const user = await signUp({
              name,
              email,
              password,
              bio: about,
              profileImage: { url: profileImageUrl },
              location: {
                coordinate: {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                },
              },
            });
          } catch (e) {
            console.log('e', e);
            if (e instanceof EmailInUseError) {
              showSnackbar('Email already in use', 'error');
              setLoading(false);
              return;
            }
            if (e instanceof PasswordValidationError) {
              showSnackbar('Password is too short', 'error');
              setLoading(false);
              return;
            }
            if (e instanceof EmailValidationError) {
              showSnackbar('Email is not in the right format', 'error');
              setLoading(false);
              return;
            }
            showSnackbar(translate('snackbar.defaultError'), 'error');
          }
          setLoading(false);
        },
        () => {
          showSnackbar('You must allow location');
          setLoading(false);
        },
      );
    } catch (e) {
      showSnackbar(translate('snackbar.defaultError'), 'error');
      setLoading(false);
    }
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
      <Header
        leftItems={[
          currentPage === 0 ? (
            <Icon
              icon='chevronDown'
              onPress={() => navigation.goBack()}
              size={18}
              variant='third'
            />
          ) : (
            <Icon icon='back' onPress={() => previousPage()} size={18} variant='third' />
          ),
        ]}
      />
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
          loading={loading}
          onPress={handleNext}
          title={currentPage === lastPage() ? 'Register' : translate(btnTranslateKey + 'next')}
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
