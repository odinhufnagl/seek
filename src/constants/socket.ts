import {
  DefaultSocketIsActiveProps,
  DefaultSocketIsTypingProps,
  DefaultSocketNewMessageProps,
  SocketClientMessageIsActive,
  SocketClientMessageIsTyping,
  SocketClientMessageUserMessage,
} from '../types';

export default {
  chatMessage: ({
    chatId,
    message,
    userId,
  }: DefaultSocketNewMessageProps): SocketClientMessageUserMessage => ({
    type: 'message',
    data: {
      chatId,
      message,
      userId,
    },
  }),
  isTyping: ({
    chatId,
    isTyping,
    userId,
  }: DefaultSocketIsTypingProps): SocketClientMessageIsTyping => ({
    type: 'typing',
    data: { chatId, isTyping, type: 'typing', userId },
  }),
  isActive: ({ isActive, userId }: DefaultSocketIsActiveProps): SocketClientMessageIsActive => ({
    type: 'isActive',
    data: { isActive, type: 'isActive', userId },
  }),
};
