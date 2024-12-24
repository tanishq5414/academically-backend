import { UserDML } from "../../dml/user";
import { IUser } from "../../interfaces/models";
import { ISignUpInput, IUpdateUserInput } from "../auth/interfaces";

async function createUser(params: ISignUpInput): Promise<IUser> {
  return UserDML.createUser(params);
}

async function updateUser(id: string, input: IUpdateUserInput): Promise<IUser> {
  return UserDML.updateUser(id, input);
}

async function deleteUser(id: string): Promise<IUser> {
  return UserDML.deleteUser(id);
}

async function getUserById(id: string): Promise<IUser | null> {
  return UserDML.getUserById(id);
}

async function getUserByEmail(email: string): Promise<IUser | null> {
  return UserDML.getUserByEmail(email);
}

export const UserService = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUserByEmail,
};


