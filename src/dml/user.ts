import { PrismaClient } from '@prisma/client';
import prisma from '../db';
import { IUser } from '../interfaces/models';
import { ISignUpInput, IUpdateUserInput } from '../services/auth/interfaces';

async function createUser(userData: IUser): Promise<IUser> {
  return prisma.user.create({
    data:{
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role
    }
  });
}

async function getUserById(id: string): Promise<IUser | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

async function getUserByEmail(email: string): Promise<IUser | null> {
  return prisma.user.findUnique({
    where: { email },
  });
}

async function updateUser(id: string, input: IUpdateUserInput): Promise<IUser> {
  return prisma.user.update({
    where: { id },
    data: input,
  });
}

async function deleteUser(id: string): Promise<IUser> {
  return prisma.user.delete({
    where: { id },
  });
}

async function listUsers(page: number = 1, limit: number = 10): Promise<IUser[]> {
  return prisma.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });
}

export const UserDML = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  listUsers,
};
