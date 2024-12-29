import React from 'react'
import "./TaskList.css"
import { useState,useEffect } from 'react';
import Card from '../components/Card';
import AddTasks from '../components/AddTasks';
import { getTask } from '../Services/Operations/taskOperation';
import { useSelector } from 'react-redux';

function TaskList() {
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [sort, setSort] = useState('');
    const [showAddTask, setShowAddTask] = useState(false);
    const {token} = useSelector((state)=>state.auth); 
    const {change} = useSelector((state)=>state.tasks);
    const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getTask(token);
                if (response) {
                    setTaskList(response);
                    setFilteredTasks(response);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
                setTaskList([]);
                setFilteredTasks([]);
            }
        };
        
        fetchTasks();
    }, [change, token]);

    useEffect(() => {
        let result = [...taskList];
        
        // Filter by priority
        if (priority) {
            result = result.filter(task => task.priority.toString() === priority);
        }

        // Filter by status
        if (status) {
            result = result.filter(task => task.status === status);
        }

        // Apply sorting
        if (sort) {
            result.sort((a, b) => {
                switch(sort) {
                    case 'startTimeAsc':
                        return new Date(a.startTime) - new Date(b.startTime);
                    case 'startTimeDesc':
                        return new Date(b.startTime) - new Date(a.startTime);
                    case 'endTimeAsc':
                        return new Date(a.endTime) - new Date(b.endTime);
                    case 'endTimeDesc':
                        return new Date(b.endTime) - new Date(a.endTime);
                    default:
                        return 0;
                }
            });
        }

        setFilteredTasks(result);
    }, [taskList, priority, status, sort]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("name",name,"value",value);
        if (name === 'priority') {
            setPriority(value);
        } else if (name === 'status') {
            setStatus(value);
        } else if (name === 'sort') {
            setSort(value);
        }
    };

    const handleAddTaskClick = () => {
        setShowAddTask(!showAddTask);
    };

    return (
        <div className='tasklist'>
            <h2 style={{textAlign:"left",marginBottom:"0rem"}}>TaskList</h2>
            <div className='tasklist-header'>
                <div>
                    <p className='borderline' onClick={handleAddTaskClick}>+ Add task</p>
                </div>
                <div className='filters'>
                    <div>
                       <select style={{appearance:"none"}} className='borderline'
                        value={sort}
                        onChange={handleChange}
                        name="sort"
                       >
                           <option value="" disabled>Sort</option>
                           <option value="startTimeAsc">Start Time : ASC</option>
                           <option value="startTimeDesc">Start Time : DESC</option>
                           <option value="endTimeAsc">End Time : ASC</option>
                           <option value="endTimeDesc">End Time : DESC</option>
                       </select>
                    </div>

                    <div >
                       <select style={{appearance:"none"}} className='borderline'
                       value={priority}
                       onChange={handleChange}
                       name="priority"
                       >
                           <option value="" disabled>Priority</option>
                           <option value="1">1</option>
                           <option value="2">2</option>
                           <option value="3">3</option>
                           <option value="4">4</option>
                           <option value="5">5</option>
                       </select>
                    </div>

                    <div >
                       <select style={{appearance:"none"}} className='borderline'
                       value={status}
                       onChange={handleChange}
                       name="status"
                       >
                           <option value=""  disabled>Status</option>
                           <option value="Pending">Pending</option>
                           <option value="Finished">Finished</option>
                       </select>
                    </div>

                </div>
            </div>    
            
            {showAddTask && <AddTasks setShowAddTask={setShowAddTask} showAddTask={showAddTask} />}
            
            <div className='tasklist-body'>
                {
                    filteredTasks?.length > 0 && filteredTasks.map((task) => (
                        <Card 
                            key={task._id}
                            title={task.title} 
                            status={task.status} 
                            priority={task.priority} 
                            start={task.startTime} 
                            end={task.endTime} 
                            taskId={task._id}
                        />
                    ))
                }           
            </div> 
        </div>
    )
}

export default TaskList
