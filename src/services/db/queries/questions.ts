import { ApiClient } from '../../../classes';
import { FetchOne, QuestionModel } from '../../../types';

const apiClient = new ApiClient();

export const fetchNewQuestion = async (
  userId?: number,
): Promise<FetchOne<QuestionModel | null>> => {
  const res = await apiClient.getNewQuestion(userId);
  console.log('res', res.data);
  return res.data;
};