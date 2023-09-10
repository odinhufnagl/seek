import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { ApiError, AppError, NetworkError, ServerDownError } from '../classes';
import { ENDPOINTS, LOCAL_STORAGE } from '../constants';
import {
  authenticateUser,
  fetchUser,
  removeUsersNotificationTokens,
  signInUser,
  signUpUser,
} from '../services';

import SplashScreen from 'react-native-splash-screen';
import { Container, Text } from '../common';
import { SigninUserModel, SignupUserModel, UserModel } from '../types';
import { storageGet, storageRemove, storageSet } from '../utils';

interface ContextValues {
  currentUser?: UserModel;
  logIn: (body: SignInBody) => Promise<boolean>;
  signUp: (body: SignUpBody) => Promise<boolean>;
  token: string | null;
  logOut: () => void;
  refetchCurrentUser: () => void;
}

const AuthContext = React.createContext<ContextValues>({
  currentUser: undefined,
  logIn: async () => false,
  signUp: async () => false,
  logOut: () => false,
  token: null,
  refetchCurrentUser: async () => false,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

type SignUpBody = SignupUserModel;
type SignInBody = SigninUserModel;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserModel>();
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState<NetworkError>();
  const [serverDownError, setServerDownError] = useState<ServerDownError>();
  const [token, setToken] = useState<string | null>(null);

  const logIn = async (body: SignInBody): Promise<boolean> => {
    console.log(body, ENDPOINTS.seekApi.auth);
    try {
      const { token, user } = await signInUser(body);
      if (!token) {
        console.log('login failed');
        return false;
      }
      await storageSet(LOCAL_STORAGE.keys.userToken, token);
      setToken(token);
      setCurrentUser(user);
      return true;
    } catch (e) {
      switch (true) {
        case e instanceof ApiError: {
          throw AppError.fromApiError(e);
        }
        default:
          throw new AppError();
      }
    }
  };

  const signUp = async (body: SignUpBody): Promise<boolean> => {
    console.log('hello?');
    try {
      const { token, user } = await signUpUser(body);
      console.log('token', token);
      if (!token) {
        console.log('signup failed');
        return false;
      }
      await storageSet(LOCAL_STORAGE.keys.userToken, token);
      setToken(token);
      setCurrentUser(user);
      return true;
    } catch (e) {
      switch (true) {
        case e instanceof ApiError: {
          throw AppError.fromApiError(e);
        }
        default:
          throw new AppError();
      }
    }
  };

  const logOut = async () => {
    if (!currentUser) {
      return;
    }
    console.log('loggin out');

    try {
      const r = await removeUsersNotificationTokens(currentUser.id);
      storageRemove(LOCAL_STORAGE.keys.userToken);
      setToken(null);
      setCurrentUser(undefined);
    } catch (e) {
      console.log('error logging out', e);
      throw e;
    }
  };

  const authenticate = async () => {
    console.log('authing');
    try {
      const { token: newToken, user } = await authenticateUser();
      console.log('newToken', newToken, user);
      if (!newToken) {
        console.log('authentication failed');
        return false;
      }
      storageSet(LOCAL_STORAGE.keys.userToken, newToken);
      setToken(newToken);
      setCurrentUser(user);
      return true;
    } catch (e) {
      if (e instanceof NetworkError) {
        setNetworkError(e as Error);
      }
      if (e instanceof ServerDownError) {
        setServerDownError(e);
      }
      console.log(e);
    }
  };
  const getUserToken = async () => {
    return await storageGet(LOCAL_STORAGE.keys.userToken);
  };
  const refetchCurrentUser = async () => {
    const newUser = await fetchUser(currentUser?.id);
    setCurrentUser(newUser);
  };

  useEffect(() => {
    (async () => {
      await authenticate();
      setLoading(false);
    })();
  }, []);

  const value = {
    currentUser,
    logIn,
    signUp,
    logOut,
    token,
    refetchCurrentUser,
  };

  if (networkError) {
    SplashScreen.hide();
    return (
      <Container style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>No internet connection</Text>
      </Container>
    );
  }

  if (serverDownError) {
    SplashScreen.hide();
    return (
      <Container style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Our server seems to be down...</Text>
      </Container>
    );
  }

  if (!loading) {
    SplashScreen.hide();
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
