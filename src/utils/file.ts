import { FileInfoType } from '../types';

export const extractFileTypeFromFilename = (filename: string): FileInfoType => {
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : 'image';
  return type as FileInfoType;
};
