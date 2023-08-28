import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

import BackgroundTimer from 'react-native-background-timer';
import { WelcomeView } from '../components';
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
const KEEP_ALIVE_TIMER = 20000;

// TODO: this is not completely general, the endpoint is not general, and how the data looks is not general because we use socketmessageserverdata and type is socketmessageservertype
export const SocketProvider = ({ children, token }: { children: JSX.Element; token: string }) => {
  const url = () => endpoints.seekApi.socket(token);

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const socketRef = useRef<WebSocket | null>();
  const [socketIsConnected, setSocketIsConnected] = useState(false);
  // socketMessage can be used in the app to react to new messages
  const backgroundClosedTimeoutRef = useRef<number>();
  const keepAliveIntervalRef = useRef<NodeJS.Timeout>();

  const [messageHandlers, setMessageHandlers] = useState<MessageHandlerState[]>([]);
  const messageHandlersRef = useRef<MessageHandlerState[]>([]);

  useEffect(() => {
    socketRef.current = socket;
  }, [socket]);
  const sendKeepAliveMessage = () => {
    if (socketRef.current && socketRef.current.readyState === socketRef.current.OPEN) {
      console.log('send keep alive message');
      socketRef.current.send('');
    }
  };
  const keepAlive = (timeout = KEEP_ALIVE_TIMER) => {
    keepAliveIntervalRef.current = setInterval(sendKeepAliveMessage, timeout);
  };
  useEffect(() => {
    messageHandlersRef.current = messageHandlers;
  }, [messageHandlers]);
  useEffect(() => {
    keepAlive();
    return () => clearInterval(keepAliveIntervalRef.current);
  }, []);

  const addSocketMessageHandler = <T extends SocketMessageServerData>(
    type: SocketMessageServerType,
    handler: MessageHandler<T>,
  ) => {
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
    if (socket && (socket.readyState === socket.OPEN || socket.readyState === socket.CONNECTING)) {
      socket.close();
    }
    const newSocket = getSocket(url());
    newSocket.onopen = () => {
      setSocketIsConnected(true);
    };

    newSocket.onmessage = (e) => {
      handleOnMessage(e);
    };

    newSocket.onerror = (e) => {
      console.log('error', e);
    };

    newSocket.onclose = (e) => {
      setSocketIsConnected(false);
      cleanupSocket(newSocket);
      /*  setTimeout(() => {
        connectToSocket();
      }, SOCKET_RECONNECT_TIMER);*/
    };
    setSocket(newSocket);
  };

  useEffect(() => {
    connectToSocket();
    () => {
      console.log('socket useEffect ended', socket);
      socket && socket.close();
    };
  }, []);

  // Handle change in state on app
  // TODO: the backgroundtimer right now only works for ANDROID i think
  const handleAppInBackground = () => {
    backgroundClosedTimeoutRef.current = BackgroundTimer.setTimeout(() => {
      console.log('socket is closing from backgrountimer');
      socketRef.current && socketRef.current.close();
    }, SOCKET_BACKGROUND_UNTIL_CLOSED);
    BackgroundTimer.start();
  };
  const handleAppIsActive = () => {
    BackgroundTimer.stop();
    BackgroundTimer.clearTimeout(backgroundClosedTimeoutRef.current);
    if (!socketRef.current || socketRef.current?.readyState === socketRef.current.CLOSED) {
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
    console.log('on message', e);
    const msg = JSON.parse(e.data) as SocketMessageServer;

    messageHandlersRef.current.forEach(
      ({ type, handler }) => type === msg.type && handler(msg.data),
    );
  };

  const cleanupSocket = (socket: WebSocket) => {
    if (!socket) {
      return;
    }
    socket.onopen = null;
    socket.onerror = null;
    socket.onmessage = null;
  };
  // TODO: I think if you enter the app via a notification, then put it in background, and then enter the app again, it will be seen as i you opened the app with the notificiation again
  // because it will rerender and initialNotification is still same
  if (!socketIsConnected) {
    return (
      <>
        <WelcomeView />
      </>
    );
  }

  const value = {
    socket,
    addSocketMessageHandler,
    removeSocketMessageHandler,
  } as ContextValues;

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
