import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageGet = async (key: string): Promise<string | null> => {
  return await AsyncStorage.getItem(key);
};
export const storageSet = async (key: string, value: string): Promise<void> => {
  await AsyncStorage.setItem(key, value);
};
export const storageRemove = async (key: string): Promise<void> => {
  await AsyncStorage.removeItem(key);
};
