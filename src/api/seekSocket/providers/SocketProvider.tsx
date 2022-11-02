import React, { useContext, useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { getSocket } from '..';
import { SocketMessageClient, SocketMessageServer } from '../../../types';

type ContextValues = {
  socketMessage?: SocketMessageServer;
  sendSocketMessage?: (msg: SocketMessageClient) => void;
};

const SocketContext = React.createContext({} as ContextValues);

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children, token }: { children: JSX.Element; token: string }) => {
  // socketMessage can be used in the app to react to new messages
  const [socketMessage, setSocketMessage] = useState<SocketMessageServer>();
  const [isAuthorized, setIsAuthorized] = useState(true);

  const [socket, setSocket] = useState(getSocket(token));

  // Handle change in state on app

  const handleAppInBackground = () => {
    socket.close();
  };
  const handleAppIsActive = () => {
    // reinitialize socket
    setSocket(getSocket(token));
  };
  const handleAppStateChange = (state: AppStateStatus) => {
    if (state === 'background') {
      handleAppInBackground();
    }
    if (state === 'active') {
      handleAppIsActive();
    }
  };
  useEffect(() => {
    const listener = AppState.addEventListener('change', handleAppStateChange);
    return () => listener.remove();
  }, []);

  // listeners for events on the socket

  socket.onopen = () => {
    setIsAuthorized(true);
    console.log('connected');
  };

  socket.onmessage = (e) => {
    const msg = JSON.parse(e.data) as SocketMessageServer;
    setSocketMessage(msg);
  };

  socket.onerror = (e) => {
    console.log(e.message);
  };

  socket.onclose = (e) => {
    setIsAuthorized(false);
    cleanupSocket();
  };

  const cleanupSocket = () => {
    socket.onopen = null;
    socket.onerror = null;
    socket.onmessage = null;
  };

  const sendSocketMessage = (msg: SocketMessageClient) => {
    try {
      socket.send(JSON.stringify(msg));
    } catch (e) {
      console.log(e);
    }
  };

  if (!isAuthorized) {
    return <></>;
  }

  const value = { sendSocketMessage, socketMessage } as ContextValues;

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
