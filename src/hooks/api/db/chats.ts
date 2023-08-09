import { useQuery } from '@tanstack/react-query';
import { QUERY_HOOKS } from '../../../constants';
import { fetchChat, fetchNewChat, fetchUsersChats } from '../../../services/db/queries';
import { ChatWhere, DBOptions } from '../../../types';
export const useFetchUsersChats = (userId?: number, dbOptions?: DBOptions<ChatWhere>) =>
  useQuery([QUERY_HOOKS.keys.usersChats], () => fetchUsersChats(userId, { ...dbOptions }));

export const useFetchChat = (chatId: number, dbOptions?: DBOptions<ChatWhere>) =>
  useQuery([QUERY_HOOKS.keys.chat], () => fetchChat(chatId, dbOptions));

export const useFetchNewChat = (userId?: number) =>
  useQuery([QUERY_HOOKS.keys.newChat], () => fetchNewChat(userId));
