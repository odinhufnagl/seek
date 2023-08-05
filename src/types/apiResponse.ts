import { AxiosResponse } from 'axios';

export interface ResponseBodyAuthUser {
  accessToken: string;
  user: any;
}
export interface ResponseBodyAuthUser {
  accessToken: string;
  user: any;
}
export interface ResponseBodyGetPlural<T> {
  rows: T[];
  count: number;
}

export type ResponseBodyGetOne<T> = T;
export type ResponseBodyAuth = ResponseBodyAuthUser;

export interface ResponseBodySignupUser {
  accessToken: string;
  user: any;
}
export type ResponseBodySignup = ResponseBodySignupUser;

export interface ResponseBodySigninUser {
  accessToken: string;
  user: any;
}
export type ResponseBodySignin = ResponseBodySigninUser;

export type Response = AxiosResponse;

export interface ResponseAuth extends Response {
  data: ResponseBodyAuth;
}
export interface ResponseSignup extends Response {
  data: ResponseBodySignup;
}
export interface ResponseSignin extends Response {
  data: ResponseBodySignin;
}
export interface ResponseDBGetPlural<T> {
  data: ResponseBodyGetPlural<T>;
}
