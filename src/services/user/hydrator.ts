import { IUser } from "../../interfaces/models";
import bcrypt from "bcrypt";

function generatePasswordHash(password: string): string {
    return bcrypt.hashSync(password, 10);
}

function checkPassword(password: string, passwordHash: string): boolean {
    return bcrypt.compareSync(password, passwordHash);
}

export const UserHydrator = {
  generatePasswordHash,
  checkPassword
};