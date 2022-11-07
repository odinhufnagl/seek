import { useQuery } from '@tanstack/react-query';
import { GetUsersOptions } from '../../../types';
import { fetchUsers } from '../queries';

const QUERY_KEY = {
  USERS: 'users',
};

export const useGetUsers = (data?: GetUsersOptions) =>
  useQuery([QUERY_KEY.USERS], () => fetchUsers(data));
