import { ApiClient } from '../../../classes';
import { ChatModel, ChatWhere, DBOptions, FetchOne } from '../../../types';
const apiClient = new ApiClient();
// TODO: cheating not using count
export const fetchUsersChats = async (
  userId?: number,
  dbOptions?: DBOptions<ChatWhere>,
): Promise<ChatModel[]> => {
  console.log('heloo');
  const res = await apiClient.dbGetPlural(['users', String(userId), 'chats'], dbOptions);
  console.log('chats', res.data);
  return res.data.rows;
};

export const fetchChat = async (
  id: number,
  dbOptions?: DBOptions<ChatWhere>,
): Promise<ChatModel> => {
  const res = await apiClient.dbGetOne('chats', id, dbOptions);

  return res.data;
};
// TODO: cheating not using count
export const fetchChats = async (dbOptions?: DBOptions<ChatWhere>): Promise<ChatModel[]> => {
  const res = await apiClient.dbGetPlural(['chats'], dbOptions);
  return res.data.rows;
};

export const fetchNewChat = async (userId?: number): Promise<FetchOne<ChatModel | null>> => {
  const res = await apiClient.getNewChat(userId);
  console.log('res', res.data);
  return res.data;
};
