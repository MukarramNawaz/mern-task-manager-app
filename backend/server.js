const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Task = require("./model/taskModel");
const cors = require("cors");
const app = express();
const taskRoutes = require("./routes/taskManagerRoutes");
const Path = require("path");
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use (cors())
app.use("/api/task", taskRoutes);

// demploying to Heroku
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));
    app.get("*", (req, res) => {
        res.sendFile(Path.resolve(__dirname, "../frontend", "build", "index.html"));
    });
}
else
{
    app.get("/", (req, res) => {
        res.send("Home Page");
    });
}

// Connect to MongoDB and Start the server after connection to DB
mongoose.connect(process.env.MONGO_URI, {
})

.then(() => console.log("MongoDB connected"))

.then(() => { 
    app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    });
}).catch((err) => {
    console.log(err);
    process.exit(1);
});

