import { ApiClient, ApiError, AppError } from '../classes';
import { AddressData, LocationFromSearch } from '../types';

const apiClient = new ApiClient();

export const searchCities = async (searchQuery: string): Promise<LocationFromSearch[]> => {
  try {
    console.log('searchQuery', searchQuery);
    const res = await apiClient.searchLocations(searchQuery, 'cities');
    console.log('res', res);
    return res.data;
  } catch (e) {
    if (e instanceof ApiError) {
      throw AppError.fromApiError(e);
    }
    throw e;
  }
};

export const locationByPlaceID = async (placeId: string): Promise<AddressData> => {
  try {
    const res = await apiClient.location(placeId);
    return res.data;
  } catch (e) {
    if (e instanceof ApiError) {
      throw AppError.fromApiError(e);
    }
    throw e;
  }
};
