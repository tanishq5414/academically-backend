import { UserDML } from "../../dml/user";
import { IUser } from "../../interfaces/models";
import { ISignUpInput, IUpdateUserInput } from "../auth/interfaces";
import { UserHydrator } from "./hydrator";

async function createUser(params: ISignUpInput): Promise<IUser> {
  const passwordHash = UserHydrator.generatePasswordHash(params.password);
  const user: IUser = {
    ...params,
    password: passwordHash,
  }
  return UserDML.createUser(user);
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

async function checkPassword(userId: string, password: string): Promise<boolean> {
  const user = await UserDML.getUserById(userId);
  if (!user) {
    return false;
  }
  return UserHydrator.checkPassword(password, user.password!);
}

export const UserService = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUserByEmail,
  checkPassword
};


