import { CourseStatus, CourseCategory, CourseProgressStatus } from '@prisma/client';

export interface ICourse {
  id: string;
  title: string;
  description: string;
  instructorName: string;
  status: CourseStatus;
  category: CourseCategory;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateCourseInput {
  title: string;
  description: string;
  instructorName: string;
  status?: CourseStatus;
  category?: CourseCategory;
}

export interface IUpdateCourseInput {
  id: string;
  title?: string;
  description?: string;
  instructorName?: string;
  status?: CourseStatus;
  category?: CourseCategory;
}

export interface ICourseEnrollment {
  id: string;
  userId: string;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICourseProgress {
  id: string;
  userId: string;
  courseId: string;
  videoId: string;
  progress: number;
  courseProgressStatus: CourseProgressStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDeleteCourseInput {
  id: string;
}

export interface IGetCourseByIdInput {
  id: string;
}

export interface IGetCourseByUserIdInput {
  userId: string;
}

export interface IGetCourseByStatusInput {
  status: CourseStatus;
}

export interface IGetCourseByCategoryInput {
  category: CourseCategory;
}

export interface IGetAllCoursesInput {
  userId: string;
}

export interface IEnrollInCourseInput {
  userId: string;
  courseId: string;
}
  
export interface IUnenrollFromCourseInput {
  userId: string;
  courseId: string;
}
