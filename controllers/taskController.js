const Task = require('../models/Task');
const mongoose = require('mongoose');

exports.list = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const query = {};
    if (req.query.status) query.status = req.query.status;
    if (req.query.priority) query.priority = req.query.priority;
    if (req.query.assignedTo) query.assignedTo = req.query.assignedTo;

    const total = await Task.countDocuments(query);
    const tasks = await Task.find(query)
      .sort(req.query.sort || '-createdAt')
      .skip(skip).limit(limit)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email');

    res.json({ 
      meta: { total, page, limit, pages: Math.ceil(total/limit) }, 
      data: tasks 
    });
  } catch(err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }
    const task = await Task.findById(id)
      .populate('assignedTo createdBy', 'name email');
    if(!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch(err) { 
    next(err); 
  }
};

exports.create = async (req, res, next) => {
  try {
    const payload = { ...req.body, createdBy: req.user._id };
    const task = new Task(payload);
    await task.save();
    res.status(201).json({
      message: 'Tâche ajoutée avec succès !',
      task
    });
  } catch(err) { 
    next(err); 
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }
    
    const task = await Task.findById(id);
    if(!task) return res.status(404).json({ message: 'Task not found' });
    
    // Vérifier si l'utilisateur est le créateur ou admin
    if (task.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedTask);
  } catch(err) { 
    next(err); 
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }
    
    const task = await Task.findById(id);
    if(!task) return res.status(404).json({ message: 'Task not found' });
    
    // Vérifier si l'utilisateur est le créateur ou admin
    if (task.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this task' });
    }

    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted successfully' });
  } catch(err) { 
    next(err); 
  }
};
