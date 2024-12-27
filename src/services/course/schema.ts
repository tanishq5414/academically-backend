import { CourseStatus } from "@prisma/client";

import { CourseCategory } from "@prisma/client";
import { z } from "zod";

const createCourseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  instructorName: z.string().min(1),
  status: z.nativeEnum(CourseStatus).optional().default(CourseStatus.PUBLISHED),
  category: z.nativeEnum(CourseCategory).optional().default(CourseCategory.BEGINNER),
});

const updateCourseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  instructorName: z.string().min(1).optional(),
  status: z.nativeEnum(CourseStatus).optional(),
  category: z.nativeEnum(CourseCategory).optional(),
});

export const CourseSchema = {
  createCourseSchema,
  updateCourseSchema,
};