import { AppError } from '../classes';

const getSocket = (url: string) => new WebSocket(url);

const sendSocketMessage = (socket: WebSocket, msg: Record<string, any>) => {
  if (socket.readyState === socket.OPEN) {
    socket.send(JSON.stringify(msg));
  } else {
    throw new AppError();
  }
};
export { getSocket, sendSocketMessage };
