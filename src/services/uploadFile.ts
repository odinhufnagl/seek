import { ApiClient } from '../classes';
import { FileInfo } from '../types';

const apiClient = new ApiClient();

export const uploadFile = async (file: FileInfo): Promise<string> => {
  console.log('file', file.name);
  const res = await apiClient.fileUpload(file);
  console.log('res');
  return res.data.url;
};

export const uploadProfileImageFile = async (file: FileInfo): Promise<string> => {
  console.log('file', file.name);
  const res = await apiClient.fileUpload(file, 'profileImage');
  console.log('res');
  return res.data.url;
};
