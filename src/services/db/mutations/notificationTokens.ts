import { ApiClient } from '../../../classes';
import {
  Create,
  CreateNotificationTokenModel,
  DBOptions,
  NotificationTokenModel,
} from '../../../types';

const apiClient = new ApiClient();

export const createNotificationToken = async (
  notificationToken: CreateNotificationTokenModel,
): Promise<Create<NotificationTokenModel>> => {
  const res = await apiClient.dbPost('notificationTokens', notificationToken);
  return res.data;
};

export const removeNotificationTokens = async (
  dbOptions: DBOptions<NotificationTokenModel>,
): Promise<Create<NotificationTokenModel>> => {
  const res = await apiClient.dbDelete('notificationTokens', dbOptions);
  return res.data;
};

// TODO: could be an endpoint instead, like removeUsersNotificationTokens or I dont know
export const removeUsersNotificationTokens = async (userId: number) => {
  const res = await removeNotificationTokens({
    where: { userId: { value: userId } },
  });
  return res;
};
