import { UserModel } from './dbModels';

export interface UserAccessToken {
  token: string;
  user: UserModel;
}
export type SigninUserModel = Partial<UserModel> & {
  password: string;
  email: string;
};
export type SignupUserModel = Partial<UserModel> & {
  password: string;
  email: string;
  name: string;
};
