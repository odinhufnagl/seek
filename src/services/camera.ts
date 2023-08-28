import * as ImagePicker from 'react-native-image-picker';
import { Permission } from '../constants';
import { hasPermission } from '../utils';

export const openLibrary = async (callback: (string) => void) => {
  await hasPermission(Permission.WRITE_PHOTOS);
  ImagePicker.launchImageLibrary({}, (res) => {
    if (res.errorMessage || res.didCancel) {
      return undefined;
    }
    if (!res.assets || !res.assets[0].uri) {
      return undefined;
    }
    callback(res.assets[0].uri);
  });
};
export const openCamera = async (callback: (string) => void) => {
  await hasPermission(Permission.CAMERA);
  ImagePicker.launchCamera({}, (res) => {
    if (res.errorMessage || res.didCancel) {
      return;
    }
    if (!res.assets || !res.assets[0].uri) {
      return;
    }
    callback(res.assets[0].uri);
  });
};
