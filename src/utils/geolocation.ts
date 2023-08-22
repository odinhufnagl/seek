import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { Permission } from '../constants';
import { hasPermission } from './permission';

export const getGeoLocation = async (onSuccess: (location: GeolocationResponse) => void) => {
  if (!(await hasPermission(Permission.LOCATION))) {
    return;
  }
  const config = {
    enableHighAccuracy: false,
  };
  Geolocation.getCurrentPosition(
    (location) => onSuccess(location),
    (e) => console.log(e),
    config,
  );
};
