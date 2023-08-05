import { ApiClient } from '../../../classes';
import { UserModel } from '../../../types';

const apiClient = new ApiClient();

export const updateUser = async (
  id: number | undefined,
  user: Partial<UserModel>,
): Promise<boolean> => {
  if (!id) {
    return false;
  }
  const res = await apiClient.dbPut('users', id, user);
  return true;
};
