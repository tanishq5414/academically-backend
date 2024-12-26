import { IUser } from "../../interfaces/models";
import jwt from "jsonwebtoken";
import { env } from "../../config";
import { IAuthToken } from "./interfaces";

function generateToken(userId: string): IAuthToken {
  const token = jwt.sign({ userId: userId }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRATION });
  const expiryDate = new Date();
  const expiryTime = env.JWT_EXPIRATION.slice(0,-1);
  expiryDate.setDate(expiryDate.getDate() + parseInt(expiryTime));

  return {
    token,
    expiryDate,
    userId
  } as IAuthToken;
}

function verifyToken(token: string): IAuthToken | null {
  return jwt.verify(token, env.JWT_SECRET) as IAuthToken | null;
}

export const AuthHydrator = {
  generateToken,
  verifyToken,
};

