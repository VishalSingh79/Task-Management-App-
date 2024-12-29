import { toast } from "react-toastify"
import { apiConnector } from "../apiConnector";
import { taskEndpoints } from "../allAPI";
import { setChange } from "../../slices/tasksSlice";


export const addTask = async (data,token,dispatch,change) => {

    console.log("DATA",data);
    console.log("TOKEN",token);

    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", taskEndpoints.CREATE_TASK_API , {
            title: data.taskTitle,
            priority: data.priority,
            status: data.status,
            startTime: data.startTime,
            endTime: data.endTime
        },
          {
            Authorization: `Bearer ${token}`,
        }
       );
        if (!response.data.success) {
            toast.dismiss(toastId);
            return toast.error(response.data.message);
        }
        toast.success("Task added successfully!");
        dispatch(setChange(!change));
        toast.dismiss(toastId);
        return response;
    } catch (error) {
        console.error("Error in API call:", error);  // Log the actual error
        toast.dismiss(toastId); // Dismiss loading toast
        toast.error("Error in adding task");
    }
};

export const updateTask = async (data,token,dispatch,change) => {
    console.log("ERRO Data",data);
    console.log("TOKENX",token);
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector(
            "PUT", 
            taskEndpoints.UPDATE_TASK_API, 
            { 
                taskId: data.id,
                title: data.taskTitle,
                priority: data.priority,
                status: data.status,
                startTime: data.startTime,
                endTime: data.endTime  
            },
            {
                Authorization: `Bearer ${token}`,
            }
        );
          
        if (!response.data.success) {
            toast.dismiss(toastId);
            return toast.error(response.data.message);
        }
        toast.success("Task updated successfully!");
        dispatch(setChange(!change))
        toast.dismiss(toastId);
        return response;
    } catch (error) {
        console.error("Error in API call:", error);  // Log the actual error
        toast.dismiss(toastId); // Dismiss loading toast     
        toast.error("Error in updating task");
    }
};

export const deleteTask = async (taskId,token,dispatch,change) => {

    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("DELETE", taskEndpoints.DELETE_TASK_API, {
            taskId
        },
        {
          Authorization: `Bearer ${token}`,
        });
        if (!response.data.success) {
            toast.dismiss(toastId);
            return toast.error(response.data.message);
        }
        toast.success("Task deleted successfully!");
        toast.dismiss(toastId);
        dispatch(setChange(!change));
        return response;
    } catch (error) {
        console.error("Error in API call:", error);  // Log the actual error
        toast.dismiss(toastId); // Dismiss loading toast
        toast.error("Error in deleting task");
    }
};

export const getTask = async (token) => {
  
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("GET", taskEndpoints.ALL_TASK_API, {}
            ,
          {
            Authorization: `Bearer ${token}`,
        }
        );
        if (!response.data.success) {
            toast.dismiss(toastId);
            return toast.error(response.data.message);
        }
      
        toast.dismiss(toastId);
        return response.data.data;
    } catch (error) {
        console.error("Error in API call:", error);  // Log the actual error
        toast.dismiss(toastId); // Dismiss loading toast
        toast.error("Error in getting task");
    }
};