const express = require("express");
const router = express.Router();

const {createTask,updateTask,deleteTask,getAllTask}=require("../controllers/Tasks");
const {auth}=require("../middleware/auth");

//Route for creating task
router.post("/createTask",auth,createTask);

//Route for updating task   
router.put("/updateTask",auth,updateTask);

//Route for deleting task
router.delete("/deleteTask",auth,deleteTask);

//Route for getting all tasks
router.get("/allTask",auth,getAllTask);

module.exports=router;