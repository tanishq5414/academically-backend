import { InvalidRequestError } from "../../common/constants/errors";
import { Validator } from "../../common/utils/validator";
import { IUser } from "../../interfaces/models";
import { UserService } from "../user";
import { SignInSchema, SignUpSchema } from "./interfaces/schema";
import { AuthHydrator } from "./hydrator";
import { IGetUserByTokenInput, ISignInInput, ISignInOutput, ISignUpInput, ISignUpOutput } from "./interfaces";
import { UserHydrator } from "../user/hydrator";


async function signUp(params: ISignUpInput): Promise<ISignUpOutput> {
  const vParams = Validator.validateSchema(SignUpSchema, params);
  //check if user already exists
  const user = await UserService.getUserByEmail(vParams.email);
  if (user) {
    throw new InvalidRequestError('User already exists');
  }
  //create user
  const createUser:IUser = await UserService.createUser(vParams);
  //create token
  const token = AuthHydrator.generateToken(createUser.id!);

  //remove password from user 
  const userWithoutPassword = { ...createUser, password: undefined };

  return {
    user: userWithoutPassword,
    token
  };
}

async function signIn(params: ISignInInput): Promise<ISignInOutput> {
  const vParams = Validator.validateSchema(SignInSchema, params);
  //check if user exists
  const user = await UserService.getUserByEmail(vParams.email);
  if (!user) {
    throw new InvalidRequestError('User not found');
  }
  //check if password is correct
  const isPasswordCorrect = UserHydrator.checkPassword(vParams.password, user.password!);
  if (!isPasswordCorrect) {
    throw new InvalidRequestError('Invalid password');
  }
  const token = AuthHydrator.generateToken(user.id!);
  //remove password from user 
  const userWithoutPassword = { ...user, password: undefined };
  return {
    user: userWithoutPassword,
    token
  };
}



export const AuthService = {
    signUp,
    signIn,
};
