import { IDeleteCourseInput, IGetAllCoursesInput, IGetCourseByIdInput, IGetCourseByStatusInput, IGetCourseByUserIdInput, IUpdateCourseInput } from "./interfaces";
import { ICourse } from "./interfaces";
import { CourseDML } from "../../dml/course";
import { ICreateCourseInput } from "./interfaces";
import { EntityNotFoundError } from "../../common/constants/errors";
import { Validator } from "../../common/utils/validator";
import { CourseSchema } from "./schema";

async function createCourse(params: ICreateCourseInput): Promise<ICourse> {
  const validation = await Validator.validateSchema(CourseSchema.createCourseSchema, params);
  const course = await CourseDML.createCourse(validation);
  return course;
}

async function updateCourse(params: IUpdateCourseInput): Promise<ICourse> {
  const validation = await Validator.validateSchema(CourseSchema.updateCourseSchema, params);
  const course = await CourseDML.updateCourse(validation);
  return course;
}

async function deleteCourse(params: IDeleteCourseInput): Promise<ICourse> {
  const course = await CourseDML.deleteCourse(params.id);
  return course;
}

async function getCourseById(params: IGetCourseByIdInput): Promise<ICourse> {
  const course = await CourseDML.getCourseById(params.id);
  if (!course) {
    throw new EntityNotFoundError("Course not found");
  }
  return course;
}

async function getCourseByUserId(params: IGetCourseByUserIdInput): Promise<any> {
  const course = await CourseDML.getUserEnrollments(params.userId);
  if (!course) {
    throw new EntityNotFoundError("User not enrolled in any course");
  }
  return course;
}

async function getCourseByStatus(params: IGetCourseByStatusInput): Promise<any> {
  const course = await CourseDML.getCoursesByStatus(params.status);
  if (!course) {
    throw new EntityNotFoundError("Course not found");
  }
  return course;
}

async function getAllCourses(params: IGetAllCoursesInput): Promise<ICourse[]> {
  const courses = await CourseDML.getAllCourses();
  return courses;
}

export const CourseService = {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseById,
  getCourseByUserId,
  getCourseByStatus,
  getAllCourses,
};
