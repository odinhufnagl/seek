import Geolocation from 'react-native-geolocation-service';
import { Permission } from '../constants';
import { hasPermission } from './permission';

export const getGeoLocation = async (onSuccess: (location) => void, onError: (e) => void) => {
  if (!(await hasPermission(Permission.LOCATION))) {
    return;
  }
  const config = {
    enableHighAccuracy: false,
    timeout: 15000,
    maximumAge: 10000,
  };
  Geolocation.getCurrentPosition((location) => onSuccess(location), onError, config);
};
