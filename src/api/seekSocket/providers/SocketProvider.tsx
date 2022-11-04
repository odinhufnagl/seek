import React, { useContext, useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { getSocket } from '..';
import { SocketMessageClient } from '../../../types';
import { SOCKET_RECONNECT_TIMER } from '../constants';

type ContextValues = {
  sendSocketMessage: (msg: SocketMessageClient) => void;
  socket: WebSocket;
};

const SocketContext = React.createContext({} as ContextValues);
export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children, token }: { children: JSX.Element; token: string }) => {
  // socketMessage can be used in the app to react to new messages
  const [socketIsConnected, setSocketIsConnected] = useState(false);
  const [socket, setSocket] = useState(() => getSocket(token));

  const connectToSocket = () => {
    setSocket(() => getSocket(token));
  };

  // Handle change in state on app

  const handleAppInBackground = () => {
    socket.close();
  };
  const handleAppIsActive = () => {
    connectToSocket();
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

  useEffect(() => {
    socket.onopen = () => {
      setSocketIsConnected(true);
    };

    /* socket.onmessage = (e) => {
      const msg = JSON.parse(e.data) as SocketMessageServer;
      
    };*/

    socket.onerror = (e) => {
      console.log(e.message);
    };

    socket.onclose = (e) => {
      setSocketIsConnected(false);
      cleanupSocket();
      setTimeout(() => {
        connectToSocket();
      }, SOCKET_RECONNECT_TIMER);
    };
  }, [socket]);

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

  if (!socketIsConnected) {
    return <></>;
  }

  const value = {
    sendSocketMessage,
    socket,
  } as ContextValues;

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
