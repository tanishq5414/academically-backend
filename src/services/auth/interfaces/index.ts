import { UserRole } from "../../../interfaces/enums";
import { IUser } from "../../../interfaces/models";

export interface IAuthToken {
  token: string;
  expiryDate: Date;
  userId: string;
}

export interface ISignUpOutput {
  user: Omit<IUser, 'password'>;
  token: IAuthToken;
}

export interface ISignUpInput {
  email: string;
  name: string;
  password: string;
  role?: UserRole;
}

export interface IUpdateUserInput {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}

export interface ISignInInput {
  email: string;
  password: string;
}

export interface ISignInOutput {
  user: Omit<IUser, 'password'>;
  token: IAuthToken;
}

export interface IGetUserByTokenInput {
  token: string;
}

