import { ApiClient } from '../classes';

const apiClient = new ApiClient();

export const markChatAsSeen = async (userId: number, chatId: number): Promise<boolean> => {
  console.log('userId', userId, 'chatId', chatId);
  const res = await apiClient.newChatSeen(userId, chatId);
  return true;
};
