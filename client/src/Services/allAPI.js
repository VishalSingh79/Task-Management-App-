const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

//Auth endpoints
export const endpoints ={
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
}

//All Task Endpoints

export const taskEndpoints = {
    CREATE_TASK_API: BASE_URL + "/task/createTask",
    UPDATE_TASK_API: BASE_URL + "/task/updateTask",
    DELETE_TASK_API: BASE_URL + "/task/deleteTask",
    ALL_TASK_API: BASE_URL + "/task/allTask"

}