import { ResponseBodyGetOne, ResponseBodyGetPlural } from './apiResponse';
import { ChatModel, MessageModel, NotificationTokenModel } from './dbModels';

type DBWhere<T> = {
  [K in keyof T]?: { unaryOperator?: string; value: T[K] };
};

export type ChatWhere = ChatModel;
export type MessageWhere = MessageModel;
export type CreateChatModel = Partial<ChatModel> & {
  name: string;
};
export type CreateMessageModel = Partial<MessageModel>;
export type CreateNotificationTokenModel = Partial<NotificationTokenModel> & {
  name: string;
  userId: number;
};
export type Create<T> = T;
export type FetchPlural<T> = ResponseBodyGetPlural<T>;
export type FetchOne<T> = ResponseBodyGetOne<T>;
