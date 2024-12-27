import { ServiceWrappers } from "../common/utils/service_wrappers";
import { AuthService } from "../services/auth";
import { CourseService } from "../services/course";
import { UserService } from "../services/user";

export default {
    auth: { ...ServiceWrappers.wrapApiCollection(AuthService)},
    user: { ...ServiceWrappers.wrapApiCollection(UserService)},
    course: { ...ServiceWrappers.wrapApiCollection(CourseService)},
}

