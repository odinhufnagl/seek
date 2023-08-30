import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_HOOKS } from '../../constants';
import { searchItems } from '../../services';
export const useSearchItems = (searchQuery: string, userId?: number, limit = 20) =>
  useInfiniteQuery(
    [QUERY_HOOKS.keys.searchItems, searchQuery],
    ({ pageParam }) => {
      return searchItems({ searchQuery, userId, limit, offset: pageParam || 0 });
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.chats.rows.length < limit) {
          return undefined;
        }
        return pages.length;
      },
    },
  );
