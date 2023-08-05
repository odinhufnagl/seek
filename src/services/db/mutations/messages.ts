import { ApiClient } from '../../../classes';
import { Create, CreateMessageModel, MessageModel } from '../../../types';

const apiClient = new ApiClient();

export const createMessage = async (message: CreateMessageModel): Promise<Create<MessageModel>> => {
  const res = await apiClient.dbPost('messages', message);
  return res.data;
};
