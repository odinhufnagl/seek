import { ApiClient } from '../../../classes';
import { UserChatModel } from '../../../types';

const apiClient = new ApiClient();

export const updateUserChat = async (
  id: number,
  userChat: Partial<UserChatModel>,
): Promise<boolean> => {
  const res = await apiClient.dbPut('userChats', id, userChat);
  return true;
};
