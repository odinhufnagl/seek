import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { NetworkError } from '../classes';
import { ENDPOINTS, LOCAL_STORAGE } from '../constants';
import { authenticateUser, signInUser, signUpUser } from '../services';

import { Text } from '../common';
import { SigninUserModel, SignupUserModel, UserModel } from '../types';
import { storageGet, storageRemove, storageSet } from '../utils';

interface ContextValues {
  currentUser?: UserModel;
  logIn: (body: SignInBody) => Promise<boolean>;
  signUp: (body: SignUpBody) => Promise<boolean>;
  token: string | null;
  logOut: () => void;
}

const AuthContext = React.createContext<ContextValues>({
  currentUser: undefined,
  logIn: async () => false,
  signUp: async () => false,
  logOut: () => false,
  token: null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

type SignUpBody = SignupUserModel;
type SignInBody = SigninUserModel;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserModel>();
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState<Error>();
  const [token, setToken] = useState<string | null>(null);

  const logIn = async (body: SignInBody): Promise<boolean> => {
    console.log(body, ENDPOINTS.seekApi.auth);
    const { token, user } = await signInUser(body);
    if (!token) {
      console.log('login failed');
      return false;
    }
    await storageSet(LOCAL_STORAGE.keys.userToken, token);
    setCurrentUser(user);
    return true;
  };

  const signUp = async (body: SignUpBody): Promise<boolean> => {
    console.log('hello?');
    const { token, user } = await signUpUser(body);
    console.log('token', token);
    if (!token) {
      console.log('signup failed');
      return false;
    }
    await storageSet(LOCAL_STORAGE.keys.userToken, token);
    setCurrentUser(user);
    return true;
  };

  const logOut = async () => {
    storageRemove(LOCAL_STORAGE.keys.userToken);
    setCurrentUser(undefined);
  };

  const authenticate = async () => {
    try {
      const { token: newToken, user } = await authenticateUser();
      if (!newToken) {
        console.log('authentication failed');
        return false;
      }
      storageSet(LOCAL_STORAGE.keys.userToken, newToken);
      setCurrentUser(user);
      return true;
    } catch (e) {
      if (e instanceof NetworkError) {
        setNetworkError(e as Error);
      }
      console.log(e);
    }
  };
  const getUserToken = async () => {
    return await storageGet(LOCAL_STORAGE.keys.userToken);
  };

  useEffect(() => {
    (async () => {
      await authenticate();
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const t = await getUserToken();
      setToken(t);
    })();
  }, [currentUser]);

  const value = {
    currentUser,
    logIn,
    signUp,
    logOut,
    token,
  };

  if (networkError) {
    return (
      <>
        <Text>Oooops... Our servers seems to be down</Text>
      </>
    );
  }
  if (loading) {
    return (
      <>
        <Text>Loading..</Text>
      </>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
