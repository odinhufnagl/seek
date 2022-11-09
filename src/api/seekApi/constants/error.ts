import { AxiosError } from 'axios';
import { APIFunctionResponse } from '../../../types';

export const API_ERROR_MESSAGE = (e: AxiosError): APIFunctionResponse => {
  const data = e.response?.data as { message?: string };
  return {
    isError: true,
    error: e,
    errorMessage: data.message,
    ...e.response,
  };
};
