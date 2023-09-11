import { ApiClient } from '../../../classes';
import { AnswerModel, FetchOne, QuestionModel } from '../../../types';

const apiClient = new ApiClient();

type NewQuestionReturn = {
  question?: QuestionModel;
  usersAnswer?: AnswerModel;
};

export const fetchNewQuestion = async (
  userId?: number,
): Promise<FetchOne<NewQuestionReturn | null>> => {
  const res = await apiClient.getNewQuestion(userId);
  return res.data;
};
