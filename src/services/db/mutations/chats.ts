import { ApiClient } from '../../../classes';
import { ChatModel } from '../../../types';

const apiClient = new ApiClient();

export const updateChat = async (
  id: number | undefined,
  chat: Partial<ChatModel>,
): Promise<boolean> => {
  if (!id) {
    return false;
  }
  const res = await apiClient.dbPut('chats', id, chat);
  return true;
};
