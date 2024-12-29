//          1.)createTask      2.)updateTask      3.)deleteTask      4.)getTask

const Task=require("../models/Task");
const User=require("../models/User");

exports.createTask=async(req,res)=>{
    try {
        //validating the tadk data
        const {title,startTime,endTime,priority,status}=req.body; 
        console.log(title,startTime,endTime,priority,status);   
        if(!title || !startTime || !endTime || !priority || !status){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        console.log("req.user._id",req.user.id);
        //validating if user is registered or not 
        const user=await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"You Need to Resigetr First"
            })
        }

        const task=await Task.create({
            title,
            startTime,
            endTime,
            priority,
            status,
        });
        console.log("Task",task);
        const userTask=await User.findById(req.user.id);
        userTask.tasks.push(task._id);
        await userTask.save();
        
        res.status(201).json({
            success:true,
            message:"Task created successfully",
            task
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
    
        })
    }
}

exports.updateTask=async(req,res)=>{
    try {
        //validating the task data
        const {title,startTime,endTime,priority,status,taskId}=req.body; 
        if(!title || !startTime || !endTime || !priority || !status || !taskId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        
        //validating if user is registered or not 
        const user=await User.findById(req.user.id);
        if(!user){    
            return res.status(404).json({
                success:false,
                message:"You Need to Resigeter or login First"
            })
        }       

        const task=await Task.findByIdAndUpdate(taskId,{
            title,
            startTime,
            endTime,
            priority,
            status
        },{new:true});

        res.status(200).json({
            success:true,
            message:"Task updated successfully",
            task
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.deleteTask=async(req,res)=>{
    try {
        //validating the task data
        const {taskId}=req.body; 
        if(!taskId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        
        //validating if user is registered or not 
        const user=await User.findById(req.user.id);
        if(!user){    
            return res.status(404).json({
                success:false,
                message:"You Need to Resigetr First"
            })
        }       
        
        const task=await Task.findByIdAndDelete(taskId);

        user.tasks.pull(taskId);
        await user.save(); 

        res.status(200).json({
            success:true,
            message:"Task deleted successfully",
            data:task
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.getAllTask=async(req,res)=>{
    try{    
        //validating if user is registered or not 
        const user=await User.findById(req.user.id).populate("tasks");
        if(!user){    
            return res.status(404).json({
                success:false,
                message:"You Need to Resigeter or login First"
            })
        }       

        res.status(200).json({
            success:true,
            message:"Task fetched successfully",
            data:user.tasks
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
