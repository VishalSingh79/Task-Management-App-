import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import "./AddTasks.css";
import { addTask } from "../Services/Operations/taskOperation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setChange } from "../slices/tasksSlice";


export default function AddTasks({ setShowAddTask , showAddTask }) {
  const [isOpen, setIsOpen] = useState(true);
  const {token} = useSelector((state) => state.auth);
  const {change} = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddTask = async (data) => {
    try {
      console.log("New Task Data:", data);
      await addTask(data,token,dispatch,change);
      setShowAddTask(false);
      
    } catch (error) {
      console.error("Error adding task:", error);
      // Handle error appropriately (e.g., show error message to user)
    }
  };

 
  const handleCancel = () => {
    setShowAddTask(!showAddTask);
  };

 

  return (
    <div className="modal-background">
      <div className="modal-container">
        {/* Modal Header */}
        <div className="modal-header">
          <p className="modal-title">Add New Task</p>
          <button onClick={handleCancel}>
            <RxCross2 />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit(handleAddTask)} className="form-container">
          {/* Task Title */}
          <div className="each-input">
            <label htmlFor="taskTitle" style={{textAlign:"left"}}>
              Task Title 
            </label>
            <input
              id="taskTitle"
              placeholder="Enter Task Title"
              {...register("taskTitle", { required: true })}
            />
            {errors.taskTitle && <span className="error-message">Task title is required</span>}
          </div>

          {/* Priority */}
          <div className="each-input">
            <label htmlFor="priority" style={{textAlign:"left"}}>
              Priority 
            </label>
            <input
              id="priority"
              type="number"
              min={1}
              max={5}
              placeholder="Enter Priority"
              {...register("priority", { required: true, min: 1 })}
            />
            {errors.priority && <span className="error-message">Priority is required</span>}
          </div>

          {/* Status */}
          <div className="each-input">
            <label style={{textAlign:"left"}}>Status</label>
            <div className="status-toggle">
              <label>
                <input type="radio" value="Pending" {...register("status", { required: true })}  id="radio1"/>
                <span style={{fontSize:"13px"}}>Pending</span>
              </label>
              <label>
                <input type="radio" value="Finished" {...register("status", { required: true })}  id="radio2"/>
                <span style={{fontSize:"13px"}}>Finished</span>
              </label>
            </div>
            {errors.status && <span className="error-message">Status is required</span>}
          </div>

        
        <div className="div-container">
          <div className="each-input">
            <label htmlFor="startTime">
              Start Time 
            </label>
            <input
              id="startTime"
              type="datetime-local"
              {...register("startTime", { required: true })}
            />
            {errors.startTime && <span className="error-message">Start time is required</span>}
          </div>

      
          <div className="each-input">
            <label htmlFor="endTime">
              End Time 
            </label>
            <input
              id="endTime"
              type="datetime-local"
              {...register("endTime", { required: true })}
            />
            {errors.endTime && <span className="error-message">End time is required</span>}
          </div>
        </div>
         

          {/* Buttons */}
          <div className="button-container">
            <button type="submit" className="submit-button">
              Add Task
            </button>
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
