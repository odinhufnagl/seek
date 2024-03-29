import React, { useContext, useEffect, useRef, useState } from 'react';

import { firebase, FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import {
  NotificationMessageServerData,
  NotificationMessageServerType,
  RecievedNotificationMessage,
} from '../types';

type NotificationMode = 'background' | 'openedApp' | 'inApp';

type MessageHandler<T extends NotificationMessageServerData> = (data: T) => Promise<void> | void;
type ContextValues = {
  addNotificationHandler: <T extends NotificationMessageServerData>(
    mode: NotificationMode,
    type: NotificationMessageServerType,
    handler: MessageHandler<T>,
  ) => void;
  removeNotificationHandler: <T extends NotificationMessageServerData>(
    handlerToRemove: MessageHandler<T>,
    type: NotificationMessageServerType,
    mode: NotificationMode,
  ) => void;
  onNotificationOpenedAppFromClose: <T extends NotificationMessageServerData>(
    handlers: { handler: MessageHandler<T>; type: NotificationMessageServerType }[],
  ) => Promise<void>;
};

type MessageHandlerState = {
  type: NotificationMessageServerType;
  mode: NotificationMode;
  handler: any;
};

const NotificationContext = React.createContext({} as ContextValues);
export const useNotification = () => useContext(NotificationContext);

// TODO: this is not completely general, the endpoint is not general, and how the data looks is not general because we use Notificationmessageserverdata and type is Notificationmessageservertype
export const NotificationProvider = ({ children }: { children: JSX.Element }) => {
  const [messageHandlers, setMessageHandlers] = useState<MessageHandlerState[]>([]);
  const initialMessageRef = useRef<FirebaseMessagingTypes.RemoteMessage | null>();
  const [notificationOpenedApp, setNotificationOpenedApp] = useState(false);
  const [notificationOpenedAppMessage, setNotificationOpenedAppMessage] =
    useState<RecievedNotificationMessage | null>(null);
  const messageHandlersRef = useRef<MessageHandlerState[]>([]);
  useEffect(() => {
    messageHandlersRef.current = messageHandlers;
  }, [messageHandlers]);

  const requestNotificationUserPermission = async () => {
    const authStatus = await firebase.messaging().requestPermission();
    const enabled =
      authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === firebase.messaging.AuthorizationStatus.PROVISIONAL;
  };
  const getInitialNotification = async (): Promise<FirebaseMessagingTypes.RemoteMessage | null> => {
    console.log('initmessageref', initialMessageRef.current);
    if (initialMessageRef.current) {
      return initialMessageRef.current;
    }
    const initialMessage = await firebase.messaging().getInitialNotification();
    console.log('initalMessage', initialMessage);
    initialMessageRef.current = initialMessage;
    return initialMessage;
  };

  const onNotificationOpenedAppFromClose = async (
    handlers: {
      handler: MessageHandler<NotificationMessageServerData>;
      type: NotificationMessageServerType;
    }[],
  ) => {
    await requestNotificationUserPermission();
    const initialMessage = await getInitialNotification();
    console.log('initialMessage from notification', initialMessage, handlers);
    if (initialMessage) {
      const data = initialMessage.data as NotificationMessageServerData;
      const type = initialMessage.data?.type as NotificationMessageServerType;

      handlers.forEach(({ type: t, handler }) => t === type && handler(data));
    }
  };

  // TODO: this is just temporary because we have to find a way to be able to pass handlers to on "openedApp"
  /* useEffect(() => {
    if (notificationOpenedAppMessage && notificationOpenedApp) {
      console.log('opened by', notificationOpenedAppMessage, messageHandlers);
      const data = notificationOpenedAppMessage.data as NotificationMessageServerData;
      const type = notificationOpenedAppMessage.data?.type as NotificationMessageServerType;
      const handlers = messageHandlers.filter(
        ({ mode, type: t }) => mode === 'openedApp' && type === t,
      );
      handlers.forEach((h) => {
        h.handler(data);
      });
      if (handlers.length > 0) {
        setMessageHandlers((prevList) =>
          prevList.filter(({ type: t, mode }) => type !== t || mode !== 'openedApp'),
        );
        setNotificationOpenedApp(false);
        setNotificationOpenedAppMessage(null);
      }
    }
  }, [messageHandlers, notificationOpenedAppMessage, notificationOpenedApp]);*/

  useEffect(() => {
    const unsubscribeInApp = firebase.messaging().onMessage(handleOnNotificationInApp);
    firebase.messaging().setBackgroundMessageHandler(handleOnNotificationInBackground);
    const unsubcribeOpenedApp = firebase
      .messaging()
      .onNotificationOpenedApp(handleOnNotificationOpenedApp);

    return () => {
      unsubscribeInApp();
      unsubcribeOpenedApp();
    };
  }, []);

  useEffect(() => {
    requestNotificationUserPermission();
  }, []);

  const addNotificationHandler = <T extends NotificationMessageServerData>(
    mode: NotificationMode,
    type: NotificationMessageServerType,
    handler: MessageHandler<T>,
  ) => {
    console.log('nott', handler, type, mode);
    const handlerExists = messageHandlersRef.current.find(
      ({ handler: h, type: t }) => h === handler && type === t,
    );
    if (!handlerExists) {
      setMessageHandlers((p) => [...p, { type, handler, mode }]);
    }
  };

  // TODO: should also look at "type" and "mode"
  const removeNotificationHandler = (
    handlerToRemove,
    typeToRemove: NotificationMessageServerType,
    modeToRemove: NotificationMode,
  ) => {
    setMessageHandlers((prevList) =>
      prevList.filter(
        ({ handler, type, mode }) =>
          handlerToRemove !== handler || typeToRemove !== type || modeToRemove !== mode,
      ),
    );
  };

  // listeners for events on the Notification

  const handleOnNotificationOpenedApp = (message: RecievedNotificationMessage) => {
    const data = message.data as NotificationMessageServerData;
    const type = message.data?.type as NotificationMessageServerType;
    console.log('messageHandlers', messageHandlersRef.current);
    messageHandlersRef.current.forEach(
      ({ type: t, handler, mode }) => t === type && mode === 'openedApp' && handler(data),
    );
  };

  const handleOnNotificationInBackground = async (message: RecievedNotificationMessage) => {
    const data = message.data as NotificationMessageServerData;
    const type = message.data?.type as NotificationMessageServerType;

    messageHandlersRef.current.forEach(
      ({ type: t, handler, mode }) => t === type && mode === 'background' && handler(data),
    );
  };

  const handleOnNotificationInApp = (message: RecievedNotificationMessage) => {
    const data = message.data as NotificationMessageServerData;
    const type = message.data?.type as NotificationMessageServerType;

    messageHandlersRef.current.forEach(
      ({ type: t, handler, mode }) => t === type && mode === 'inApp' && handler(data),
    );
  };

  const value = {
    addNotificationHandler,
    removeNotificationHandler,
    onNotificationOpenedAppFromClose,
  } as ContextValues;

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};
