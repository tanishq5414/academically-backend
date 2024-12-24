import { UserRole } from "./enums";

export interface IUser {
  id: string;
  email: string;
  name: string;
  password: string;
  role?: UserRole;
}

export interface CreateUserInput {
  email: string;
  name: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}