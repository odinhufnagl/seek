const getSocket = (url: string) => new WebSocket(url);

const sendSocketMessage = (socket, msg: Record<string, any>) => {
  socket.send(JSON.stringify(msg));
};
export { getSocket, sendSocketMessage };
