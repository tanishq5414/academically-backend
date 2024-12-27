import { ICourseEnrollment, IDeleteCourseInput, IEnrollInCourseInput, IGetAllCoursesInput, IGetCourseByIdInput, IGetCourseByStatusInput, IGetCourseByUserIdInput, IUnenrollFromCourseInput, IUpdateCourseInput } from "./interfaces";
import { ICourse } from "./interfaces";
import { CourseDML } from "../../dml/course";
import { ICreateCourseInput } from "./interfaces";
import { EntityNotFoundError, InvalidRequestError } from "../../common/constants/errors";
import { Validator } from "../../common/utils/validator";
import { CourseSchema } from "./schema";
import { UserDML } from "../../dml/user";

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

async function getCourseByUserId(params: IGetCourseByUserIdInput): Promise<ICourse[]> {
  const course = await CourseDML.getUserEnrollments(params.userId);
  const courseIds = course.map((course) => course.courseId);
  const courseDetails = await Promise.all(courseIds.map((id) => CourseDML.getCourseById(id)));
  const filteredCourseDetails = courseDetails.filter((course) => course !== null);
  if (!filteredCourseDetails) {
    throw new EntityNotFoundError("User not enrolled in any course");
  }
  return filteredCourseDetails;
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

async function enrollInCourse(params: IEnrollInCourseInput): Promise<ICourseEnrollment> {
  //check if the course is already enrolled
  const enrollment = await CourseDML.getEnrollmentByUserIdAndCourseId(params.userId, params.courseId);
  if (enrollment) {
    throw new InvalidRequestError("User already enrolled in the course");
  }

  const course = await CourseDML.enrollUserInCourse(params.userId, params.courseId);
  if (!course) {
    throw new EntityNotFoundError("Course not found");
  }
  return course;
}

async function unenrollFromCourse(params: IUnenrollFromCourseInput): Promise<ICourseEnrollment> {
  const course = await CourseDML.unenrollUserFromCourse(params.userId, params.courseId);
  return course;
}

export const CourseService = {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseById,
  getCourseByUserId,
  getCourseByStatus,
  getAllCourses,
  enrollInCourse,
  unenrollFromCourse,
};
