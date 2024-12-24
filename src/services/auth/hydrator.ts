import { IUser } from "../../interfaces/models";
import jwt from "jsonwebtoken";
import { env } from "../../config";
import { IAuthToken } from "./interfaces";

function generateToken(userId: string): IAuthToken {
  const token = jwt.sign({ id: userId }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRATION });
  const expiryDate = new Date();
  const expiryTime = env.JWT_EXPIRATION.slice(0,-1);
  expiryDate.setDate(expiryDate.getDate() + parseInt(expiryTime));

  return {
    token,
    expiryDate,
    userId
  } as IAuthToken;
}

export const AuthHydrator = {
  generateToken,
};
