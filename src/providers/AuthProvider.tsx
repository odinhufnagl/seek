import React, { Dispatch, useContext, useEffect, useState } from 'react';
import { authenticateUser, signInUser, signUpUser, updateUser } from '../api/seekApi/mutations';
import { LOCAL_STORAGE_KEY } from '../constants';
import { APIFunctionResponse, IUser } from '../types';
import { storageGet, storageRemove, storageSet } from '../utils';

type ContextValues = {
  currentUser?: IUser;
  setCurrentUser?: Dispatch<IUser>;
  logIn: (email: string, password: string) => Promise<APIFunctionResponse>;
  signUp: (userData: IUser) => Promise<APIFunctionResponse>;
  updateCurrentUser: (userData: IUser) => Promise<boolean>;
  logOut: () => Promise<boolean>;
};

type Props = {
  children: JSX.Element;
};

const AuthContext = React.createContext({} as ContextValues);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authenticate();
  }, []);

  const storeUser = (res) => {
    setCurrentUser(res.user);
    storageSet(LOCAL_STORAGE_KEY.ACCESS_TOKEN, res.accessToken);
  };

  const authenticate = async () => {
    setLoading(true);
    setLoading(false);
    const token = await storageGet(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    if (!token) {
      setLoading(false);
      return;
    }

    const res = await authenticateUser(token);

    if (!res) {
      logOut();
      setLoading(false);
      return;
    }
    storeUser(res.data);
    setLoading(false);
  };

  const logOut = async (): Promise<boolean> => {
    storageRemove(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    setCurrentUser(undefined);
    return true;
  };

  const logIn = async (email: string, password: string): Promise<APIFunctionResponse> => {
    try {
      const res = await signInUser(email.trim(), password);

      if (res.isError) {
        console.log(res.data);
        return res;
      }
      storeUser(res.data);
      return { isError: false };
    } catch (e) {
      console.log(e);
      return { isError: true };
    }
  };

  const signUp = async (userData: IUser): Promise<APIFunctionResponse> => {
    try {
      const res = await signUpUser(userData);
      if (res.isError) {
        return res;
      }
      storeUser(res.data);
      return { isError: false };
    } catch (e) {
      console.log(e);
      return { isError: true };
    }
  };

  const updateCurrentUser = async (toUpdate: IUser): Promise<boolean> => {
    if (!currentUser?.id) {
      return false;
    }
    const res = await updateUser(currentUser.id, toUpdate);

    if (!res) {
      return false;
    }
    setCurrentUser(res.data);
    return true;
  };

  const value = {
    currentUser,
    setCurrentUser,
    logIn,
    signUp,
    updateCurrentUser,
    logOut,
  };

  if (loading) {
    return <></>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
