import React from 'react'
import { getTask } from '../Services/Operations/taskOperation';
import "./Dashboard.css"
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';

function Dashboard() {
    const {change} = useSelector((state) => state.tasks);
    const {token} = useSelector((state) => state.auth);
    const [taskList1, setTaskList1] = useState([]);
    
       // Calculating percentages
    const completedTasks = taskList1.filter(task => task.status === "Finished").length;
    const pendingTasks = taskList1.filter(task => task.status === "Pending").length;
    const completedPercentage = taskList1.length ? Math.round((completedTasks / taskList1.length) * 100) : 0;
    const pendingPercentage = taskList1.length ? Math.round((pendingTasks / taskList1.length) * 100) : 0;
  

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getTask(token);
                if (response) {
                    setTaskList1(response);
               
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
                setTaskList1([]);
                
            }
        };
        
        fetchTasks();
    }, [change]);
  return (
    <div className='dashboard'>
       <h2>Dashboard</h2>
       <div>
        <div 
        style={{
            width:"100%",
            height:"50px",
            fontFamily:"900",
            color:"white",
            display:"flex",
            fontSize:"22px",
            alignItems:"start"
        }}
        >Summary</div>
        <div className='summary-container'>
            <div className='summary-box'>
                <p style={{margin:"0rem",fontSize:"25px"}}>{taskList1.length}</p>
                <p style={{margin:"0rem",color:"blue"}}>Total Tasks</p>
            </div>
            <div className='summary-box'>
                <p style={{margin:"0rem",fontSize:"25px"}}>{`${completedPercentage}%`}</p>
                <p style={{margin:"0rem",color:"blue"}}>Tasks Completed</p>
            </div>
            <div className='summary-box'>
                <p style={{margin:"0rem",fontSize:"25px"}}>{`${pendingPercentage}%`}</p>
                <p style={{margin:"0rem",color:"blue"}}>Tasks Pending</p>
            </div>
            
        </div>
        <div className='pending-container'>
            <div
            style={{
            width:"100%",
            height:"50px",
            fontFamily:"900",     
            display:"flex",
            color:"white",
            fontSize:"22px",
            alignItems:"start"
        }}
            >
                Pending Tasks Summary
            </div>
            <div className='summary-box'>
                <p style={{margin:"0rem",fontSize:"25px"}}>{pendingTasks}</p>
                <p style={{margin:"0rem",color:"blue"}}>Pending Tasks</p>
            </div>
        </div>
        <div>
            <div
                style={{
                    width: "100%",
                    height: "50px",
                    fontFamily: "900",
                    color: "white",
                    fontSize: "22px",
                    display: "flex",
                    alignItems: "start",
                    marginBottom: "1rem"
                }}
            >
                Tasks Overview
            </div>
            <div style={{
                overflowX: "auto",
                width: "100%"
            }}>
                <table style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    color: "white",
                    marginBottom: "2rem",
                    border: "1px solid grey"
                }}>
                    <thead>
                        <tr style={{
                            borderBottom: "1px solid grey",
                            textAlign: "left"
                        }}>
                            <th style={{padding: "1rem", color: "blue", border: "1px solid grey"}}>Task Priority</th>
                            <th style={{padding: "1rem", color: "blue", border: "1px solid grey"}}>Pending Tasks</th>
                            <th style={{padding: "1rem", color: "blue", border: "1px solid grey"}}>Time to finish in hrs</th>
                        </tr>
                    </thead>
                    <tbody>
                       {[1, 2, 3, 4, 5].map((priority) => {
                        
                         const pendingTasksForPriority = taskList1.filter(
                           task => task.priority === priority && task.status === "Pending"
                         );
              
                        
                         const totalTimeForPriority = pendingTasksForPriority.reduce((total, task) => {
                             if (task.endTime && task.startTime) {
                                 const endTime = new Date(task.endTime);
                                 const startTime = new Date(task.startTime);
                                 const diffInHours = (endTime - startTime) / (1000 * 60 * 60); // Convert milliseconds to hours
                                 return total + diffInHours;
                             }
                             return total;
                         }, 0);
              
                         return (
                           <tr key={priority} style={{ borderBottom: "1px solid grey", textAlign: "left" }}>
                             <td style={{ padding: "1rem", border: "1px solid grey",textAlign:"center" }}>{priority}</td>
                             <td style={{ padding: "1rem", border: "1px solid grey",textAlign:"center" }}>
                               {pendingTasksForPriority.length}
                             </td>
                             <td style={{ padding: "1rem", border: "1px solid grey",textAlign:"center" }}>
                               {totalTimeForPriority}
                             </td>
                           </tr>
                         );
                       })}
                     </tbody>
                </table>
            </div>
        </div>
        
        
       </div>
    </div>
  )
}

export default Dashboard
