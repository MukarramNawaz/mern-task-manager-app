
const Task = require("../model/taskModel");


// creating a task
const createTask = async (req, res) => {

    try {
        const task = await Task.create(req.body);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

// fetching all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// fetching one task using the id
const getTask = async (req, res) => {
    try {
        const {id: taskID} = req.params;
        const task = await Task.findById({_id: taskID});
        if(!task) {
            return res.status(404).json({msg: `No task with id : ${taskID}`})
        }
        res.status(200).json({task});
    } catch (error) { 
        res.status(500).json({msg: error.message});
    }
}

// fetching completed Tasks
// const getCompletedTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find();
//         const completedTasks = tasks.filter((task) => task.completed === true);

//         res.status(200).json(completedTasks);
//     } catch (error) {
//         res.status(500).json({msg: error.message});
//     }
// }

// deleting a task
const deleteTask = async (req, res) => {
    try {
        const {id: taskID} = req.params;
        const task = await Task.findByIdAndDelete({_id: taskID});
        if(!task) {
            return res.status(404).json({msg: `No task with id : ${taskID}`})
        }
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


// updating a task using the PUT methode

// const updateTask = async (req, res) => {
//     try {
//         const {id: taskID} = req.params
//         const task = await Task.findByIdAndUpdate({_id: taskID}, req.body, { new: true,runValidators: true })

//         if(!task) {
//             return res.status(404).json({msg: `No task with id : ${taskID}`})
//         }
//         res.status(200).json(task)
    
//     } catch (error) {
//          res.status(500).json({msg: error.message});
//     }
// }


// updating a task using the patch methode

const updateTask = async (req, res) => {
    try {
        const {id: taskID} = req.params
        const task = await Task.findByIdAndUpdate({_id: taskID}, req.body, { new: true,runValidators: true })

        if(!task) {
            return res.status(404).json({msg: `No task with id : ${taskID}`})
        }
        res.status(200).json(task)
    
    } catch (error) {
         res.status(500).json({msg: error.message});
    }
}


module.exports = {createTask, getTasks, deleteTask, getTask, updateTask}