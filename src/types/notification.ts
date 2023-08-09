// how data from server to client can look

import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

export type NotificationMessageServerData = Record<string, unknown>;

export interface NotificationMessageServerIsActiveData extends NotificationMessageServerData {
  userId: number;
  isActive: boolean;
}

export interface NotificationMessageServerNewChatData extends NotificationMessageServerData {
  chatId: number;
}

export interface NotificationMessageServerUserMessageData extends NotificationMessageServerData {
  userId: number;
  message: string;
  messageId: number;
  chatId: number;
}

export interface NotificationMessageServerTypingData extends NotificationMessageServerData {
  userId: number;
  isTyping: boolean;
  chatId: number;
}

export type NotificationMessageServerDailyQuestionData = NotificationMessageServerData;

export type NotificationMessageServerType =
  | 'message'
  | 'typing'
  | 'isActive'
  | 'dailyQuestion'
  | 'newChat';

export interface NotificationMessageServer {
  type: NotificationMessageServerType;
  data: NotificationMessageServerData;
  // TODO: perhaps add the messagebody, title and so on if that is needed within the app
}

export interface NotificationServerMessageIsActive extends NotificationMessageServer {
  data: NotificationMessageServerIsActiveData;
}

export interface NotificationServerMessageIsTyping extends NotificationMessageServer {
  data: NotificationMessageServerTypingData;
}

export interface NotificationServerMessageUserMessage extends NotificationMessageServer {
  data: NotificationMessageServerUserMessageData;
}
export interface NotificationServerMessageDailyQuestion extends NotificationMessageServer {
  data: NotificationMessageServerDailyQuestionData;
}
export interface NotificationServerMessageNewChat extends NotificationMessageServer {
  data: NotificationMessageServerNewChatData;
}

export type RecievedNotificationMessage = FirebaseMessagingTypes.RemoteMessage;
