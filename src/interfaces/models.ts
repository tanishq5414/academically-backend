import { UserRole } from "./enums";

export interface IUser {
  id?: string;
  email: string;
  name: string;
  password: string;
  role?: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IVideo {
  id: string;
  title: string;
  description: string;
  url: string;
  courseId: string;
  uploadedBy: string;
  duration: number;
  createdAt?: Date;
  updatedAt?: Date;
}

