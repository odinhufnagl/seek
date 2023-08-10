import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

import BackgroundTimer from 'react-native-background-timer';
import endpoints from '../constants/endpoints';
import { getSocket } from '../services/socket';
import {
  SocketMessageClient,
  SocketMessageServer,
  SocketMessageServerData,
  SocketMessageServerType,
} from '../types';

type MessageHandler<T extends SocketMessageServerData> = (data: T) => Promise<void> | void;
type ContextValues = {
  sendSocketMessage: (msg: SocketMessageClient) => void;
  socket: WebSocket;
  addSocketMessageHandler: <T extends SocketMessageServerData>(
    type: SocketMessageServerType,
    handler: MessageHandler<T>,
  ) => void;
  removeSocketMessageHandler: <T extends SocketMessageServerData>(
    handlerToRemove: MessageHandler<T>,
  ) => void;
};
type MessageHandlerState = {
  type: SocketMessageServerType;
  handler: any;
};

const SocketContext = React.createContext({} as ContextValues);
export const useSocket = () => useContext(SocketContext);

const SOCKET_RECONNECT_TIMER = 100000;
const SOCKET_BACKGROUND_UNTIL_CLOSED = 5000;

// TODO: this is not completely general, the endpoint is not general, and how the data looks is not general because we use socketmessageserverdata and type is socketmessageservertype
export const SocketProvider = ({ children, token }: { children: JSX.Element; token: string }) => {
  // socketMessage can be used in the app to react to new messages
  const [socketIsConnected, setSocketIsConnected] = useState(false);
  const url = () => endpoints.seekApi.socket(token);
  const [socket, setSocket] = useState(() => getSocket(url()));
  const backgroundClosedTimeoutRef = useRef<NodeJS.Timeout>();

  const [messageHandlers, setMessageHandlers] = useState<MessageHandlerState[]>([]);
  const messageHandlersRef = useRef<MessageHandlerState[]>([]);
  useEffect(() => {
    messageHandlersRef.current = messageHandlers;
  }, [messageHandlers]);

  const addSocketMessageHandler = <T extends SocketMessageServerData>(
    type: SocketMessageServerType,
    handler: MessageHandler<T>,
  ) => {
    console.log('handler', handler, 'type', type);
    const handlerExists = messageHandlersRef.current.find(
      ({ handler: h, type: t }) => h === handler && type === t,
    );
    if (!handlerExists) {
      setMessageHandlers((p) => [...p, { type, handler }]);
    }
  };

  // TODO: should also look at "type"
  const removeSocketMessageHandler = (handlerToRemove) => {
    setMessageHandlers((prevList) => prevList.filter(({ handler }) => handlerToRemove !== handler));
  };

  const connectToSocket = () => {
    setSocket(() => getSocket(url()));
  };

  // Handle change in state on app
  // TODO: the backgroundtimer right now only works for ANDROID i think
  const handleAppInBackground = () => {
    backgroundClosedTimeoutRef.current = BackgroundTimer.setTimeout(() => {
      socket.close();
    }, SOCKET_BACKGROUND_UNTIL_CLOSED);
    BackgroundTimer.start();
  };
  const handleAppIsActive = () => {
    BackgroundTimer.stop();
    BackgroundTimer.clearTimeout(backgroundClosedTimeoutRef.current);
    if (!socketIsConnected) {
      connectToSocket();
    }
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

  // TODO: if we were to make it all generic, this must be moved outside
  const handleOnMessage = (e) => {
    console.log('s', socket);
    const msg = JSON.parse(e.data) as SocketMessageServer;
    console.log('sm', msg);
    console.log('messageHandlers', messageHandlersRef.current.length);

    messageHandlersRef.current.forEach(
      ({ type, handler }) => type === msg.type && handler(msg.data),
    );
  };

  useEffect(() => {
    socket.onopen = () => {
      setSocketIsConnected(true);
    };

    socket.onmessage = (e) => {
      handleOnMessage(e);
    };

    socket.onerror = (e) => {
      console.log('error: ', e);
    };

    socket.onclose = (e) => {
      console.log('socket closing');
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
  // TODO: I think if you enter the app via a notification, then put it in background, and then enter the app again, it will be seen as i you opened the app with the notificiation again
  // because it will rerender and initialNotification is still same
  if (!socketIsConnected) {
    return <></>;
  }

  const value = {
    socket,
    addSocketMessageHandler,
    removeSocketMessageHandler,
  } as ContextValues;

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
