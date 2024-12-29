import React, { useState } from 'react'
import "./Card.css"
import UpdateTask from './UpdateTask'
import { deleteTask } from '../Services/Operations/taskOperation';
import { useSelector,useDispatch } from 'react-redux';


function Card({title,status,priority,start,end,taskId,onUpdateTask}) {
  const [showUpdateTask, setShowUpdateTask] = useState(false);
  const dispatch = useDispatch();
  const {change} = useSelector((state) => state.tasks);
  const {token} = useSelector((state)=> state.auth);

  const handleEditClick = () => {
    setShowUpdateTask(true);
  };

  const task = {
    id: taskId,
    taskTitle: title,
    status: status,
    priority: priority,
    startTime: start,
    endTime: end
  };

  const handleDelete=(taskId)=>{
    console.log("IHHHH");
     deleteTask(taskId,token,dispatch,change);
  }

  return (
    <>
      <div  className='card'>
          <p className='card-title'>{title}</p>
          <div className='card1'>
              <p style={{
                  color: status=="Pending" ? "red" : "green" 
              }}>{status}</p>
              <p>Priority: {priority}</p>
          </div>
          <div className='card2'>
              <div >
                  <p style={{textAlign:"left",color:"grey"}}>Start</p>
                  <p>{start}</p>
              </div>
              <div>
                  <p style={{textAlign:"left",color:'grey'}}>End</p>
                  <p>{end}</p>
              </div>
          </div>
          <div className='card3'>
              <button 
                  style={{color:"green"}}
                  onClick={handleEditClick}
              >
                  Edit
              </button>
              <button style={{color:"red"}} onClick={()=>handleDelete(taskId)}>Delete</button>
          </div>
      </div>

      {showUpdateTask && (
        <UpdateTask
          task={task}
          setShowUpdateTask={setShowUpdateTask}
          showUpdateTask={showUpdateTask}
          onUpdateTask={onUpdateTask}
        />
      )}
    </>
  )
}

export default Card
