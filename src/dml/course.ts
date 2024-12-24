import { Course, CourseStatus, CourseCategory, CourseEnrollment, CourseProgress, CourseProgressStatus } from '@prisma/client';
import prisma from '../db';
import { ICreateCourseInput, IUpdateCourseInput } from '../services/course/interfaces';

async function createCourse(courseData: ICreateCourseInput): Promise<Course> {
  return prisma.course.create({
    data: courseData
  });
}

async function getCourseById(id: string): Promise<Course | null> {
  return prisma.course.findUnique({
    where: { id },
  });
}

async function updateCourse(
  courseData: IUpdateCourseInput
): Promise<Course> {
  return prisma.course.update({
    where: { id: courseData.id },
    data: courseData,
  });
}

async function deleteCourse(id: string): Promise<Course> {
  return prisma.course.delete({
    where: { id },
  });
}

async function listCourses(
  page: number = 1,
  limit: number = 10,
  filters?: {
    status?: CourseStatus;
    category?: CourseCategory;
  }
): Promise<Course[]> {
  return prisma.course.findMany({
    where: filters,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: 'desc'
    }
  });
}

async function getCoursesByStatus(status: CourseStatus): Promise<Course[]> {
  return prisma.course.findMany({
    where: { status },
  });
}

async function getCoursesByCategory(category: CourseCategory): Promise<Course[]> {
  return prisma.course.findMany({
    where: { category },
  });
}

// Course Enrollment functions
async function enrollUserInCourse(userId: string, courseId: string): Promise<CourseEnrollment> {
  return prisma.courseEnrollment.create({
    data: {
      userId,
      courseId,
    },
  });
}

async function unenrollUserFromCourse(userId: string, courseId: string): Promise<CourseEnrollment> {
  return prisma.courseEnrollment.delete({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  });
}

async function getUserEnrollments(userId: string): Promise<CourseEnrollment[]> {
  return prisma.courseEnrollment.findMany({
    where: { userId },
    include: {
      course: true
    },
  });
}

async function getCourseEnrollments(courseId: string): Promise<CourseEnrollment[]> {
  return prisma.courseEnrollment.findMany({
    where: { courseId },
  });
}

// Course Progress functions
async function updateCourseProgress(
  data: {
    userId: string;
    courseId: string;
    videoId: string;
    progress: number;
    courseProgressStatus?: CourseProgressStatus;
  }
): Promise<CourseProgress> {
  return prisma.courseProgress.upsert({
    where: {
      userId_courseId_videoId: {
        userId: data.userId,
        courseId: data.courseId,
        videoId: data.videoId,
      },
    },
    update: {
      progress: data.progress,
      courseProgressStatus: data.courseProgressStatus,
    },
    create: data,
  });
}

async function getUserCourseProgress(
  userId: string,
  courseId: string
): Promise<CourseProgress[]> {
  return prisma.courseProgress.findMany({
    where: {
      userId,
      courseId,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
}

async function getVideoProgress(
  userId: string,
  courseId: string,
  videoId: string
): Promise<CourseProgress | null> {
  return prisma.courseProgress.findUnique({
    where: {
      userId_courseId_videoId: {
        userId,
        courseId,
        videoId,
      },
    },
  });
}

export const CourseDML = {
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
  listCourses,
  getCoursesByStatus,
  getCoursesByCategory,
  enrollUserInCourse,
  unenrollUserFromCourse,
  getUserEnrollments,
  getCourseEnrollments,
  updateCourseProgress,
  getUserCourseProgress,
  getVideoProgress,
};
