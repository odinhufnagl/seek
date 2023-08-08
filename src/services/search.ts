import { ApiClient } from '../classes';
import { ChatModel } from '../types';

const apiClient = new ApiClient();

interface SearchItems {
  chats: { rows: ChatModel[]; count: number };
}
type Params = {
  searchQuery: string;
  userId?: number;
  limit?: number;
  offset?: number;
};
export const searchItems = async ({
  searchQuery,
  userId,
  limit,
  offset,
}: Params): Promise<SearchItems> => {
  console.log('limit offset', limit, offset);
  const res = await apiClient.search({ searchQuery, userId, limit, offset });
  return { chats: { rows: res.data.chats.rows, count: Number(res.data.chats.count) } };
};
