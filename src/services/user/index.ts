import { InvalidRequestError } from "../../common/constants/errors";
import { UserDML } from "../../dml/user";
import { IUser } from "../../interfaces/models";
import { ISignUpInput, IUpdateUserInput } from "../auth/interfaces";
import { UserHydrator } from "./hydrator";
import { IGetUserByIdInput } from "./interfaces/interfaces";

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

async function getUserById(params: IGetUserByIdInput): Promise<Omit<IUser, 'password'> | null> {
  const user = await UserDML.getUserById(params.userId);    
  if (!user) {
    throw new InvalidRequestError('User not found');
  }
  //remove password from user 
  const userWithoutPassword = { ...user, password: undefined };
  return userWithoutPassword;
}

async function getUserByEmail(email: string): Promise<Omit<IUser, 'password'> | null> {
  const user = await UserDML.getUserByEmail(email);
  if (!user) {
    throw new InvalidRequestError('User not found');
  }
  //remove password from user 
  const userWithoutPassword = { ...user, password: undefined };
  return userWithoutPassword;
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


