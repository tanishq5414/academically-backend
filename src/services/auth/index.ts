import { InvalidRequestError } from "../../common/constants/errors";
import { Validator } from "../../common/utils/validator";
import { IUser } from "../../interfaces/models";
import { UserService } from "../user";
import { SignUpSchema } from "../user/interfaces/schema";
import { AuthHydrator } from "./hydrator";
import { ISignUpInput, ISignUpOutput } from "./interfaces";


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

  return {
    user: createUser,
    token
  };
}

export const AuthService = {
    signUp,
};
