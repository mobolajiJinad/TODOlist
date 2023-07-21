const Joi = require("joi");
const mongoose = require("mongoose");
const router = require("express").Router();

const Tasks = require("./Task");
const {
  getAllTasks,
  createTask,
  getTaskByID,
  updateTaskByID,
  deleteTaskByID,
} = require("./routesController");

const validateTask = (req, res, next) => {
  const taskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  });

  const { error } = taskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

const validateTaskID = async (req, res, next) => {
  const { taskID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskID)) {
    return res.status(400).json({ error: "Invalid task ID" });
  }

  try {
    const task = await Tasks.findById(taskID);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    req.task = task;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

router.route("/").get(getAllTasks).post(validateTask, createTask);

router
  .route("/:taskID")
  .get(validateTaskID, getTaskByID)
  .put(validateTaskID, updateTaskByID)
  .delete(validateTaskID, deleteTaskByID);

module.exports = router;
