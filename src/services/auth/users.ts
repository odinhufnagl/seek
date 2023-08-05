import { ApiClient } from '../../classes/apiClient';
import { SigninUserModel, SignupUserModel, UserAccessToken } from '../../types';

// TODO: throw correct errors

const api = new ApiClient();

export const authenticateUser = async (): Promise<UserAccessToken> => {
  const res = await api.authenticate('users');
  if (!res?.data) {
    throw Error();
  }
  const { accessToken } = res.data;
  return { token: accessToken, user: res.data.user };
};

export const signUpUser = async (user: SignupUserModel): Promise<UserAccessToken> => {
  const res = await api.signUp('users', user);
  if (!res?.data) {
    throw Error();
  }
  const { accessToken } = res.data;
  return { token: accessToken, user: res.data.user };
};

export const signInUser = async (user: SigninUserModel): Promise<UserAccessToken> => {
  const res = await api.signIn('users', user);

  if (!res?.data) {
    throw Error();
  }
  const { accessToken } = res.data;
  return { token: accessToken, user: res.data.user };
};
