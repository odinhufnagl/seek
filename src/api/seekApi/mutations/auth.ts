import axios from 'axios';
import { TOKEN_HEADER_KEY } from '../../../constants';
import { IUser } from '../../../types';
import { API_ENDPOINT } from '../constants';

type Response =
  | {
      user: IUser;
      accessToken: string;
    }
  | undefined;

export const signInUser = async (email: string, password: string): Promise<Response> => {
  try {
    const res = await axios.post(API_ENDPOINT.SIGN_IN, { email, password });
    return res?.data;
  } catch (e) {
    console.log(e);
  }
};

export const signUpUser = async (userData: IUser): Promise<Response> => {
  try {
    const res = await axios.post(API_ENDPOINT.SIGN_UP, userData);
    return res?.data;
  } catch (e) {
    console.log(e);
  }
};

export const authenticateUser = async (token: string): Promise<Response> => {
  try {
    const res = await axios.get(API_ENDPOINT.AUTHENTICATE, {
      headers: { [TOKEN_HEADER_KEY]: token },
    });
    return res?.data;
  } catch (e) {
    console.log(e);
  }
};
