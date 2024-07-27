const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: [true, "please ad a task"]
    },

    completed  : {

        type: Boolean,
        default: false,
        required: true
    }

},
{
    timestamps: true
}
)


const Task = mongoose.model("Task", taskSchema);

module.exports = Task;