import { useQuery } from '@tanstack/react-query';
import { QUERY_HOOKS } from '../../../constants';
import { ChatWhere, DBOptions } from '../../../types';
import { fetchChat, fetchUsersChats } from '../queries';
export const useFetchUsersChats = (userId?: number, dbOptions?: DBOptions<ChatWhere>) =>
  useQuery([QUERY_HOOKS.keys.usersChats], () => fetchUsersChats(userId, { ...dbOptions }));

export const useFetchChat = (chatId: number, dbOptions?: DBOptions<ChatWhere>) =>
  useQuery([QUERY_HOOKS.keys.chat], () => fetchChat(chatId, dbOptions));
