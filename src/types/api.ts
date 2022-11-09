import { AxiosError, AxiosResponse } from 'axios';
import { IUser } from './models';

// In many endpoints we want to be able to send Databaseoptions
// So this is a type that we can use in our apiFunctions
// Note that you could extend it to fit the exact apiFunction

export type DBOptions = {
  limit?: number;
  offset?: number;
  where?: Record<any, any>;
  sortBy?: string;
  orderBy?: 'ASC' | 'DESC';
};

export interface GetUsersOptions extends DBOptions {
  where?: IUser;
}

export interface APIFunctionResponse extends Partial<AxiosResponse> {
  isError?: boolean;
  error?: AxiosError;
  errorMessage?: string;
}
