import axios from 'axios';
import { GetUsersOptions } from '../../../types';

import { API_ENDPOINT } from '../constants';

export const fetchUsers = async (options?: GetUsersOptions) => {
  const res = await axios.get(API_ENDPOINT.USERS(options));
  return res?.data;
};

export const fetchUser = async (id: number) => {
  const res = await axios.get(API_ENDPOINT.USER(id));
  return res?.data;
};
