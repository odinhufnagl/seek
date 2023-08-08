import { useQuery } from '@tanstack/react-query';
import { QUERY_HOOKS } from '../../../constants';
import { fetchAnswer, fetchUsersAnswers } from '../../../services/db/queries';
import { ChatWhere, DBOptions } from '../../../types';
export const useFetchUsersAnswers = (userId: number, dbOptions?: DBOptions<ChatWhere>) =>
  useQuery([QUERY_HOOKS.keys.usersAnswers], () => fetchUsersAnswers(userId, { ...dbOptions }));
export const useFetchAnswer = (id: number) =>
  useQuery([QUERY_HOOKS.keys.answer], () => fetchAnswer(id));
