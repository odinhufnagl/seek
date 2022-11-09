import axios from 'axios';
import { TOKEN_HEADER_KEY } from '../../../constants';
import { APIFunctionResponse, IUser } from '../../../types';
import { API_ENDPOINT, API_ERROR_MESSAGE } from '../constants';

interface APIFunctionAuthResponse extends APIFunctionResponse {
  data?: { user: IUser; accessToken: string };
}

export const signInUser = async (
  email: string,
  password: string,
): Promise<APIFunctionAuthResponse> => {
  try {
    const res = await axios.post(API_ENDPOINT.SIGN_IN, { email, password });
    return res;
  } catch (e) {
    console.log(e);
    return API_ERROR_MESSAGE(e);
  }
};

export const signUpUser = async (userData: IUser): Promise<APIFunctionAuthResponse> => {
  try {
    const res = await axios.post(API_ENDPOINT.SIGN_UP, userData);
    return res;
  } catch (e) {
    console.log(e);
    return API_ERROR_MESSAGE(e);
  }
};

export const authenticateUser = async (token: string): Promise<APIFunctionAuthResponse> => {
  try {
    const res = await axios.get(API_ENDPOINT.AUTHENTICATE, {
      headers: { [TOKEN_HEADER_KEY]: token },
    });
    return res;
  } catch (e) {
    console.log(e);
    return API_ERROR_MESSAGE(e);
  }
};
