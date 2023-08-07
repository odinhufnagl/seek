import { ApiClient } from '../../../classes';
import { AnswerModel, AnswerWhere, DBOptions, FetchOne, FetchPlural } from '../../../types';

const apiClient = new ApiClient();

// TODO: generally speaking, on every fetch function there should be some type of parsing from what the apiClient returns and to the models, because for example the model should have dates as Date
// but what is returned from api is date as string, and I would say that the apiClient should not do that parsing, because its job is to returned data as it looks from the server, but in that case apiClient should not really know about the Models
// and we also have to parse the data before from Date to string, which might be automatic with json, think so. Theoretically the apiClient could do both parsings, but doesnt feel like its job, right now, the dbOptions is dependent on the Model, but that may be wrong? Or I dont know.
// Or actually, the ApiClient is there to abstract the apiUse and if that is the case it should maybe return the data in the correct form, so maybe it should actually do the parsing. At the same time, the services is the actual abstractions from the api, so maybe the apiClient should not be all to
// abstract, so it depends, should the apiClient be looked upon as a service, or a more general concept that returns entire Response as it does now. I believe entire Response is the way to go

export const fetchAnswers = async (
  dbOptions?: DBOptions<AnswerWhere>,
): Promise<FetchPlural<AnswerModel>> => {
  const res = await apiClient.dbGetPlural(['answers'], dbOptions);
  return res.data;
};
export const fetchAnswer = async (id: number): Promise<FetchOne<AnswerModel>> => {
  const res = await apiClient.dbGetOne('answers', id);
  return res.data;
};

export const fetchUsersAnswers = async (
  userId: number,
  dbOptions?: DBOptions<AnswerWhere>,
): Promise<FetchPlural<AnswerModel>> => {
  const res = await fetchAnswers({
    ...dbOptions,
    where: { userId: { value: userId }, ...dbOptions?.where },
  });
  return res;
};
