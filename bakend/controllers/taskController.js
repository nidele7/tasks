const Task = require('../models/Task');

// Logique métier pour les tâches
const taskController = {
  async getAllTasks(req, res) {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async createTask(req, res) {
    const task = new Task({
      description: req.body.description,
      deadline: req.body.deadline,
      priority: req.body.priority
    });
    try {
      const newTask = await task.save();
      res.status(201).json(newTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getTaskById(req, res) {
    try {
      const task = await Task.findById(req.params.taskId);
      if (task === null) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateTask(req, res) {
    try {
      const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
      if (updatedTask === null) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async deleteTask(req, res) {
    try {
      const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
      if (deletedTask === null) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json({ message: 'Task deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = taskController;