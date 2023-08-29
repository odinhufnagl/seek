import { ApiError, AppError } from '../../classes';
import { ApiClient } from '../../classes/apiClient';
import { SigninUserModel, SignupUserModel, UserAccessToken } from '../../types';

// TODO: throw correct errors

const api = new ApiClient();

export const authenticateUser = async (): Promise<UserAccessToken> => {
  try {
    const res = await api.authenticate('users');
    if (!res?.data) {
      throw Error();
    }
    const { accessToken } = res.data;
    return { token: accessToken, user: res.data.user };
  } catch (e) {
    if (e instanceof ApiError) {
      throw AppError.fromApiError(e);
    }
    throw e;
  }
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
