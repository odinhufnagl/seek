import { ApiClient } from '../classes';

const apiClient = new ApiClient();

export const updatePassword = async (newPassword: string, code: string): Promise<boolean> => {
  const res = await apiClient.updatePassword(newPassword, code);
  return res.data;
};
