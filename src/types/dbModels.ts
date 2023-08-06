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
