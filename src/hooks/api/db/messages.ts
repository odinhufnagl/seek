import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_HOOKS } from '../../../constants';
import { fetchMessages } from '../../../services/db/queries';
import { DBOptions, MessageWhere } from '../../../types';

export const useFetchMessages = (dbOptions?: DBOptions<MessageWhere>, limit = 20) =>
  useInfiniteQuery(
    [QUERY_HOOKS.keys.messages, dbOptions],
    ({ pageParam }) => {
      return fetchMessages({ limit, offset: pageParam || 0, ...dbOptions });
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
