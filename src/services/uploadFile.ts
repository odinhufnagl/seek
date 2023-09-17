import { ApiClient } from '../classes';
import { FileInfo } from '../types';

const apiClient = new ApiClient();

export const uploadFile = async (file: FileInfo): Promise<string> => {
  const res = await apiClient.fileUpload(file);
  return res.data.url;
};

export const uploadProfileImageFile = async (file: FileInfo): Promise<string> => {
  const res = await apiClient.fileUpload(file, 'profileImage');

  return res.data.url;
};
