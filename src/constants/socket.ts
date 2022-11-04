import {
  ISocketClientIsActiveData,
  ISocketClientMessageData,
  ISocketClientTypingData,
  SocketMessageClient,
} from '../types';

type ChatMessageProps = {
  message: string;
  chatId: number;
  userId: number;
  recieverId: number;
};
type IsTypingProps = {
  isTyping: boolean;
  chatId: number;
  userId: number;
  recieverId: number;
};
type IsActiveProps = {
  isActive: boolean;
  userId: number;
  recieverId: number;
};

const SOCKET_MESSAGE = {
  CHAT_MESSAGE: ({ recieverId, ...props }: ChatMessageProps): SocketMessageClient => ({
    recieverId,
    type: 'message',
    data: props as ISocketClientMessageData,
  }),
  IS_TYPING: ({ recieverId, ...props }: IsTypingProps): SocketMessageClient => ({
    type: 'typing',
    recieverId,
    data: props as ISocketClientTypingData,
  }),
  IS_ACTIVE: ({ recieverId, ...props }: IsActiveProps): SocketMessageClient => ({
    recieverId,
    type: 'isActive',
    data: props as ISocketClientIsActiveData,
  }),
};

export { SOCKET_MESSAGE };
