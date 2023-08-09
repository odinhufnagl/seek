import { ApiClient } from '../../../classes';
import { AnswerModel, AreaModel, Create } from '../../../types';

const apiClient = new ApiClient();

// TODO: bad repition
type CreateAnswerModel = {
  userId: number;
  text: string;
  questionId: number;
  area?: Partial<AreaModel>;
  isPrivate: boolean;
};

export const createAnswer = async (answer: CreateAnswerModel): Promise<Create<AnswerModel>> => {
  const res = await apiClient.dbPost('answers', answer);
  return res.data;
};
