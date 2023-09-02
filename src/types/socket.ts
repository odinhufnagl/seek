// how data from server to client can look

export type SocketMessageClientData = Record<string, unknown>;
export type SocketMessageServerData = Record<string, unknown>;

export interface SocketMessageClientIsActiveData extends SocketMessageClientData {
  userId: number;
  isActive: boolean;
}

export interface SocketMessageClientUserMessageData extends SocketMessageClientData {
  userId: number;
  message: string;
  chatId: number;
}

export interface SocketMessageClientTypingData extends SocketMessageClientData {
  userId: number;
  isTyping: boolean;
  chatId: number;
}

export interface SocketMessageServerIsActiveData extends SocketMessageServerData {
  userId: number;
  isActive: boolean;
}

export interface SocketMessageServerUserMessageData extends SocketMessageServerData {
  userId: number;
  message: string;
  messageId: number;
  chatId: number;
}

export interface SocketMessageServerTypingData extends SocketMessageServerData {
  userId: number;
  isTyping: boolean;
  chatId: number;
}

export type SocketMessageClientType = 'message' | 'typing' | 'isActive' | 'ping';
export type SocketMessageServerType = 'message' | 'typing' | 'isActive';
export interface SocketMessageClient {
  type: SocketMessageClientType;
  data: SocketMessageClientData;
}
export interface SocketMessageServer {
  type: SocketMessageServerType;
  senderId?: number;
  data: SocketMessageServerData;
}

export interface SocketClientMessageIsActive extends SocketMessageClient {
  data: SocketMessageClientIsActiveData;
}

export interface SocketClientMessageIsTyping extends SocketMessageClient {
  data: SocketMessageClientTypingData;
}
export type SocketClientMessagePing = SocketMessageClient;

export interface SocketClientMessageUserMessage extends SocketMessageClient {
  data: SocketMessageClientUserMessageData;
}

export interface SocketServerMessageIsActive extends SocketMessageServer {
  data: SocketMessageServerIsActiveData;
}

export interface SocketServerMessageIsTyping extends SocketMessageServer {
  data: SocketMessageServerTypingData;
}

export interface SocketServerMessageUserMessage extends SocketMessageServer {
  data: SocketMessageServerUserMessageData;
}

export type DefaultSocketNewMessageProps = {
  message: string;
  userId: number;
  chatId: number;
};
export type DefaultSocketIsTypingProps = {
  userId: number;
  chatId: number;
  isTyping: boolean;
};
export type DefaultSocketIsActiveProps = {
  userId: number;
  isActive: boolean;
};

export type DefaultSocketProps =
  | DefaultSocketNewMessageProps
  | DefaultSocketIsTypingProps
  | DefaultSocketIsActiveProps;
