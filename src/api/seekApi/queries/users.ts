import axios from 'axios';
import { APIFunctionResponse, GetUsersOptions } from '../../../types';

import { API_ENDPOINT } from '../constants';

export const fetchUsers = async (options?: GetUsersOptions): Promise<APIFunctionResponse> => {
  const res = await axios.get(API_ENDPOINT.USERS(options));
  return res?.data;
};

export const fetchUser = async (id: number): Promise<APIFunctionResponse> => {
  const res = await axios.get(API_ENDPOINT.USER(id));
  return res?.data;
};
