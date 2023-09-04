import { ApiClient } from '../classes';

const apiClient = new ApiClient();

export const resetPassword = async (email: string): Promise<boolean> => {
  const res = await apiClient.resetPassword(email);
  return res.data;
};
