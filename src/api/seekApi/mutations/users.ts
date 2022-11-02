import axios from 'axios';
import { IUser } from '../../../types';
import { API_ENDPOINT } from '../constants';

export const updateUser = async (id: number, toUpdate: IUser) => {
  const res = await axios.put(API_ENDPOINT.USER(id), toUpdate);
  return res?.data;
};
