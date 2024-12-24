import { ServiceWrappers } from "../common/utils/service_wrappers";

export default {
    user: { ...ServiceWrappers.wrapApiCollection(UserApiCollection)}
}

