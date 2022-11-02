// how data from server to client can look

export interface ISocketServerIsActiveData {
  isActive: boolean;
  userId: number;
}

export interface ISocketServerMessageData {
  message: string;
  chatId: number;
  userId: number;
}

export interface ISocketServerTypingData {
  isTyping: boolean;
  chatId: number;
  userId: number;
}

// How the data from client can look

export interface ISocketClientIsActiveData {
  isActive: boolean;
}

export interface ISocketClientMessageData {
  message: string;
  chatId: number;
}

export interface ISocketClientTypingData {
  isTyping: boolean;
  chatId: number;
}

// The types to use

export type SocketMessageType = 'message' | 'typing' | 'isActive';

export type SocketMessageServer = {
  type: SocketMessageType;
  senderId: number;
  data: ISocketServerIsActiveData | ISocketServerMessageData | ISocketServerTypingData;
};

export type SocketMessageClient = {
  recieverId: number;
  type: SocketMessageType;
  data: ISocketClientMessageData | ISocketClientTypingData | ISocketClientIsActiveData;
};
