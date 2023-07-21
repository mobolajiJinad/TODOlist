const express = require("express");

const Tasks = require("./Task");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const tasks = await Tasks.find();

      res.status(200).json({
        task: tasks,
      });
    } catch (err) {
      res.json({ error: err.message });
    }
  })
  .post(async (req, res) => {
    try {
      const { title, description } = req.body;

      if (!title) {
        return res.status().json({ msg: "You have to enter a title." });
      }

      if (!description) {
        return res
          .status()
          .json({ msg: "Cannot save task without description." });
      }

      const task = await new Tasks({ title, description }).save();

      res.status(200).json({
        msg: {
          status: "Task saved",
          task: task,
        },
      });
    } catch (err) {
      res.json({ error: err.message });
    }
  });

router
  .route("/:taskID")
  .get(async (req, res) => {
    try {
      const { taskID } = req.params;

      const task = await Tasks.findById(taskID);

      if (!task) {
        return res.json({ msg: "Invalid task id" });
      }

      res.status(200).json({ task });
    } catch (err) {
      res.json({ error: err.message });
    }
  })
  .put(async (req, res) => {
    try {
      const { taskID } = req.params;
      const { title, description } = req.body;

      if (!title && !description) {
        return res.json({ msg: "Please enter title and/or description" });
      }

      const task = await Tasks.findById(taskID);

      if (title && description) {
        await task.updateOne({ title, description });
      }

      if (title && !description) {
        await task.updateOne({ title });
      }

      if (!title && description) {
        await task.updateOne({ description });
      }

      res.json({ msg: "Task has been updated" });
    } catch (err) {
      res.json({ error: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const { taskID } = req.params;

      const task = await Tasks.findById(taskID);

      if (!task) {
        return res.json({ msg: "Invalid task id" });
      }

      await Tasks.findByIdAndDelete(taskID);

      res.status(200).json({ msg: "Task deleted." });
    } catch (err) {
      res.json({ error: err.message });
    }
  });

module.exports = router;
