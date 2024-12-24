import { PrismaClient } from '@prisma/client';
import prisma from '../db';
import { CreateUserInput, IUser, UpdateUserInput } from '../interfaces/models';
import { UserArgs } from '@prisma/client/runtime/library';

async function createUser(input: CreateUserInput): Promise<IUser> {
  return prisma.user.create({
    data: input,
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

async function updateUser(id: string, input: UpdateUserInput): Promise<IUser> {
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
