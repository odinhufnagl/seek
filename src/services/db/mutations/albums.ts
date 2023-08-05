import { ApiClient } from '../../../classes';
import { ChatModel, CreateChatModel } from '../../../types';

const apiClient = new ApiClient();

export const createAlbum = async (album: CreateChatModel): Promise<ChatModel[]> => {
  const res = await apiClient.dbPost('albums', album);
  return res.data;
};
