import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { QUERY_HOOKS } from '../../../constants';
import { fetchChat, fetchNewChat, fetchUsersChats } from '../../../services/db/queries';
import { ChatWhere, DBOptions } from '../../../types';
export const useFetchUsersChats = (userId?: number, dbOptions?: DBOptions<ChatWhere>, limit = 20) =>
  useInfiniteQuery(
    [QUERY_HOOKS.keys.usersChats],
    ({ pageParam }) => {
      return fetchUsersChats(userId, { limit, offset: pageParam || 0 });
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.rows.length < limit) {
          return undefined;
        }
        return pages.length;
      },
    },
  );

export const useFetchChat = (chatId: number, dbOptions?: DBOptions<ChatWhere>) =>
  useQuery([QUERY_HOOKS.keys.chat], () => fetchChat(chatId, dbOptions));

export const useFetchNewChat = (userId?: number) =>
  useQuery([QUERY_HOOKS.keys.newChat], () => fetchNewChat(userId));
