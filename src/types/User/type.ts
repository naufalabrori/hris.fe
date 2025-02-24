import { BaseType } from '../BaseType';

export type User = BaseType & {
  employeeId: string;
  username: string;
  email: string;
  lastLogin: string;
};

export type UserLogin = {
  email?: string;
  password?: string;
};

export type UserLoginResponse = {
  token: string;
  user: User;
};
