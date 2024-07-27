const express = require("express");
const Task = require("../model/taskModel");
const { createTask, getTasks, deleteTask,getTask, updateTask }= require("../controllers/taskControllers");
const router = express.Router();


    
router.post ("/" , createTask); // Task Creation API
       
router.get ("/" , getTasks)  // Get/Read Data API
  
router.get ("/:id" , getTask)   // Get/Read one task Data

router.delete ("/:id" , deleteTask)    // Deleteing a task

// router.put ("/:id" , updateTask)  // UUpdate a task PUT
    
router.patch ("/:id" , updateTask)     // UUpdate a task Patch
   
module.exports = router