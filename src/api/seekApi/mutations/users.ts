import axios from 'axios';
import { APIFunctionResponse, IUser } from '../../../types';
import { API_ENDPOINT, API_ERROR_MESSAGE } from '../constants';

export const updateUser = async (id: number, toUpdate: IUser): Promise<APIFunctionResponse> => {
  try {
    const res = await axios.put(API_ENDPOINT.USER(id), toUpdate);
    return res;
  } catch (e) {
    console.log(e);
    return API_ERROR_MESSAGE(e);
  }
};
