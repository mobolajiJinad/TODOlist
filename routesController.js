const Tasks = require("./Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await new Tasks({ title, description }).save();
    res.status(201).json({
      msg: {
        status: "Task saved",
        task,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTaskByID = async (req, res) => {
  res.status(200).json({ task: req.task });
};

const updateTaskByID = async (req, res) => {
  const { title, description } = req.body;
  const update = {};

  if (title) {
    update.title = title;
  }

  if (description) {
    update.description = description;
  }

  try {
    await req.task.updateOne(update);
    res.json({ msg: "Task has been updated" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTaskByID = async (req, res) => {
  try {
    await Tasks.findByIdAndDelete(req.params.taskID);
    res.status(200).json({ msg: "Task deleted." });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTaskByID,
  updateTaskByID,
  deleteTaskByID,
};
