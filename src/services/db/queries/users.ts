import { ApiClient } from '../../../classes';
import { FetchOne, UserModel } from '../../../types';

const apiClient = new ApiClient();

export const fetchUser = async (id?: number): Promise<FetchOne<UserModel>> => {
  const res = await apiClient.dbGetOne('users', id);
  return res.data;
};
