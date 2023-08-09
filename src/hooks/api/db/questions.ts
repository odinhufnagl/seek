import { useQuery } from '@tanstack/react-query';
import { QUERY_HOOKS } from '../../../constants';
import { fetchNewQuestion } from '../../../services/db/queries';

export const useFetchNewQuestion = (userId?: number) =>
  useQuery([QUERY_HOOKS.keys.newQuestion], () => fetchNewQuestion(userId));
