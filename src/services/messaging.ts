import { SOCKET_MESSAGE } from '../constants';
import { ChatModel, MessageModel } from '../types';
import { updateUserChat } from './db';
import { sendSocketMessage } from './socket';

// TODO: should be an endpoint instead
export const markMessagesAsRead = async (chat: ChatModel, userId: number) => {
  if (!chat || !chat.users) {
    return;
  }
  console.log('chatUsers', chat.users);
  const userChatId = chat?.users.find((u) => u.id === userId)?.userChat?.id;
  if (!userChatId) {
    return;
  }
  const newDate = new Date().toISOString();
  await updateUserChat(userChatId, {
    lastRead: newDate,
  });
  return true;
};

// TODO: this is not used right now, right now we create a message via http and then it will broadcast
type ChatMessageData = Partial<MessageModel> & { chatId: number; text: string; userId: number };

export const sendChatMessage = async (socket: WebSocket, data: ChatMessageData) => {
  const { chatId, text, userId } = data;
  sendSocketMessage(
    socket,
    SOCKET_MESSAGE.chatMessage({
      chatId,
      message: text,
      userId,
    }),
  );
};
