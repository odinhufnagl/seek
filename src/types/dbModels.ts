// TODO: big todo. These should be changed for how we want them, not how the data from the server looks. Meaning if we want createdAt to be a Dateobject in the app, it should be a date here.
// Then, when fetching from the server we should parse the data into the right. For example right now, what is stated as number here is not actually numbers because they arrive from the server
// the services I think if where this parsing should occur. Because what if the seekApi doesnt give us a full ChatModel, rather we have to do more fetches? then it should be the service that does the data
// processing. This means that we should also do some updated on the apiClient, the api client should not have anything to do with these models, because these are only known to the service.
// We can put these parsing functions in a class like SeekApiParser, altough this will still not help us if seekApi doesnt return entire ChatModel, because then that parser wont work
// this also means that for example the dbOptions to the seekApiClient should not actually be from the ChatModel, but rather what the api expects. So for example fetchChat would take in dbOptions
// which is serviceDBOptions meaning they conceptually dont have anything to do with the api (serviceDBOptions is little tricky because it should not use ChatModel because there might be thing in ChatModel not available to use in where-clause).
// It should return a ChatModel. Then the service will convert the serviceDBOptions to seekDBOptions for a chat. These are tough because serviceDBOptions should not use ChatModel, nor should seekDBOptions, and they should not use same because
// the model used for where-clause by seekDBOptions is the one how it looks to the server, for example Date should already be string. So theoretically we should set up, ChatModel, ServiceWhereChatModel, and SeekWhereChatModel. Altough, serviceDBOptions and seekDBOptions might extend the same basic DBOptions structure
// and this is basically what the /chat endpoint excepts as dbOptions, maybe there is some parsing in the seekApiClient, but the where-object in the seekDBOptions in this case should be what you can use
// on the server, not for example unreadMessagesCount which is nothing you can use in where. Then the apiClient should return a Response with ResponseChat in body, which is how the Chat looks in response.
// then we do some parsing, and we have the ChatModel to return from our service. The parsing on dbOptions could also be in the SeekAPIParser
export interface ChatModel {
  id: number;
  questionId: number;
  users?: UserModel[];
  lastMessage?: MessageModel;
  question?: QuestionModel;
  unreadMessagesCount?: number;
  createdAt: string;
}
export interface UserChatModel {
  id: number;
  userId: number;
  chatId: number;
  lastRead: string;
}
export interface UserModel {
  id: number;
  email: string;
  password?: string;
  name: string;
  profileImage?: FileModel;
  profileImageId?: number;
  bio?: string;
  instagramName?: string;
  snapchatName?: string;
  albums?: ChatModel[];
  createdAt: string;
  isActive: boolean;
  lastActive: string;
  userChat?: UserChatModel;
  notificationTokens: NotificationTokenModel[];
  location?: LocationModel;
  locationId?: number;
}
export interface QuestionModel {
  id: number;
  title: string;
  coverImage?: FileModel;
  coverImageId?: number;
  isFinished: boolean;
  timeToStart: string;
  createdAt: string;
}
export interface MessageModel {
  id: number;
  text: string;
  createdAt: string;
  userId: number;
  chatId: number;
}
export interface NotificationTokenModel {
  createdAt: string;
  userId: number;
  name: string;
}

export interface FileModel {
  id: number;
  name?: string;
  url: string;
  type: FileTypeModel;
}
export interface FileTypeModel {
  name: string;
}
export interface LocationModel {
  id: number;
  address?: string;
  cityName?: string;
  postalCode?: string;
  countryId: number;
  country: CountryModel;
  coordinateId?: number;
  coordinate?: CoordinateModel;
}

export interface CoordinateModel {
  id: number;
  latitude: number;
  longitude: number;
}
export interface CountryModel {
  id: number;
  name: string;
  code: string;
}
export interface AnswerModel {
  id: number;
  questionId: number;
  question?: QuestionModel;
  userId: number;
  user?: UserModel;
  text: string;
  locationId?: number;
  areaId: number;
  isPrivate: boolean;
  createdAt: string;
}
