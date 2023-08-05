import { ApiClient } from '../../../classes';
import { DBOptions, FetchOne, FetchPlural, MessageModel, MessageWhere } from '../../../types';

const apiClient = new ApiClient();

export const fetchMessages = async (
  dbOptions?: DBOptions<MessageWhere>,
): Promise<FetchPlural<MessageModel>> => {
  const res = await apiClient.dbGetPlural(['messages'], dbOptions);

  return res.data;
};
export const fetchMessage = async (
  messageId: number,
  dbOptions?: DBOptions<MessageWhere>,
): Promise<FetchOne<MessageModel>> => {
  const res = await apiClient.dbGetOne('messages', messageId, dbOptions);
  return res.data;
};
