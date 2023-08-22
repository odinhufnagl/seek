import { PermissionsAndroid, Platform } from 'react-native';
import {
  Permission as PlatformPermission,
  RESULTS,
  check,
  request,
} from 'react-native-permissions';
import { Permission } from '../constants';

type OS = 'ios' | 'android';

const getPlatformSpecificType = (type: Permission, platform: OS): PlatformPermission =>
  ({
    [Permission.CAMERA]: {
      ios: 'ios.permission.CAMERA' as PlatformPermission,
      android: PermissionsAndroid.PERMISSIONS.CAMERA as PlatformPermission,
    },
    [Permission.FINE_LOCATION]: {
      ios: 'ios.permission.LOCATION_WHEN_IN_USE' as PlatformPermission,
      android: PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION as PlatformPermission,
    },
    [Permission.LOCATION]: {
      ios: 'ios.permission.LOCATION_WHEN_IN_USE' as PlatformPermission,
      android: PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION as PlatformPermission,
    },
    [Permission.WRITE_PHOTOS]: {
      ios: 'ios.permission.IOS.PHOTO_LIBRARY_ADD_ONLY' as PlatformPermission,
      android: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE as PlatformPermission,
    },
    [Permission.READ_PHOTOS]: {
      ios: 'ios.permission.PHOTO_LIBRARY' as PlatformPermission,
      android: PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE as PlatformPermission,
    },
    [Permission.MICROPHONE]: {
      ios: 'ios.permission.MICROPHONE' as PlatformPermission,
      android: PermissionsAndroid.PERMISSIONS.RECORD_AUDIO as PlatformPermission,
    },
  }[type][platform]);

export const hasPermission = async (type: Permission) => {
  const permissionType = getPlatformSpecificType(type, Platform.OS as OS);

  const res = await check(permissionType);
  console.log('res', res);
  if (res === RESULTS.GRANTED) {
    return true;
  } else if (res === RESULTS.DENIED) {
    console.log('res', res);
    const res2 = await request(permissionType);
    console.log('res2', res2);
    return res2 === RESULTS.GRANTED;
  }
};
