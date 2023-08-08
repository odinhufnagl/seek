import { useQuery } from '@tanstack/react-query';
import { QUERY_HOOKS } from '../../../constants';
import { fetchUser } from '../../../services/db/queries';
import { ChatWhere, DBOptions } from '../../../types';

export const useFetchUser = (userId: number, dbOptions?: DBOptions<ChatWhere>) =>
  useQuery([QUERY_HOOKS.keys.user], () => fetchUser(userId));
