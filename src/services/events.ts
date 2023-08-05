import { SOCKET_MESSAGE } from '../constants';
import { sendSocketMessage } from './socket';

type IsTypingData = {
  senderId: number;
  chatId: number;
  isTyping: boolean;
};

export const sendIsTypingEvent = async (socket: WebSocket, data: IsTypingData) => {
  const { senderId, chatId, isTyping } = data;
  sendSocketMessage(
    socket,
    SOCKET_MESSAGE.isTyping({
      chatId,
      isTyping,
      userId: senderId,
    }),
  );
};

type IsActiveData = {
  senderId: number;
  isActive: boolean;
};

export const sendIsActiveEvent = async (socket: WebSocket, data: IsActiveData) => {
  const { senderId, isActive } = data;
  sendSocketMessage(
    socket,
    SOCKET_MESSAGE.isActive({
      isActive,
      userId: senderId,
    }),
  );
};
