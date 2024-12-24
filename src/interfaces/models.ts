import { UserRole } from "./enums";

export interface IUser {
  id?: string;
  email: string;
  name: string;
  password: string;
  role?: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}
