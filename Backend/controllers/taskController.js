const Task = require('../models/Task');
const mongoose = require('mongoose');

exports.list = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const query = {};
    
    // Si l'utilisateur est un membre, il ne peut voir que ses tâches assignées
    if (req.user.role === 'member') {
      query.assignedTo = req.user._id;
    } else {
      // Admin peut voir toutes les tâches avec filtres optionnels
      if (req.query.status) query.status = req.query.status;
      if (req.query.priority) query.priority = req.query.priority;
      if (req.query.assignedTo) query.assignedTo = req.query.assignedTo;
    }

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
    
    // Les membres ne peuvent voir que leurs tâches assignées
    if (req.user.role === 'member' && task.assignedTo._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied. You can only view tasks assigned to you.' });
    }
    
    res.json(task);
  } catch(err) { 
    next(err); 
  }
};

exports.create = async (req, res, next) => {
  try {
    // Seuls les admins peuvent créer des tâches
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admins can create tasks.' });
    }
    
    const payload = { ...req.body, createdBy: req.user._id };
    const task = new Task(payload);
    await task.save();
    
    const populatedTask = await Task.findById(task._id)
      .populate('assignedTo createdBy', 'name email');
    
    res.status(201).json({
      message: 'Tâche ajoutée avec succès !',
      task: populatedTask
    });
  } catch(err) { 
    next(err); 
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('Update task request:', { id, body: req.body, user: req.user });
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }
    
    const task = await Task.findById(id);
    if(!task) return res.status(404).json({ message: 'Task not found' });
    
    console.log('Task found:', task);
    console.log('User role:', req.user.role);
    console.log('Task assignedTo:', task.assignedTo);
    console.log('User ID:', req.user._id);
    
    // Seuls les admins peuvent modifier les tâches (titre, description, assignation, priorité, etc.)
    if (req.user.role !== 'admin') {
      // Les membres ne peuvent que changer le statut de leurs tâches assignées
      if (!task.assignedTo || task.assignedTo.toString() !== req.user._id.toString()) {
        console.log('Access denied - not assigned to user');
        return res.status(403).json({ message: 'Access denied. You can only update tasks assigned to you.' });
      }
      
      // Vérifier que le membre ne modifie que le statut
      const allowedFields = ['status'];
      const updateFields = Object.keys(req.body);
      const hasUnauthorizedFields = updateFields.some(field => !allowedFields.includes(field));
      
      if (hasUnauthorizedFields) {
        console.log('Unauthorized fields:', updateFields);
        return res.status(403).json({ message: 'Members can only update task status.' });
      }
    }

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true })
      .populate('assignedTo createdBy', 'name email');
    
    console.log('Task updated successfully:', updatedTask);
    res.json(updatedTask);
  } catch(err) { 
    console.error('Error updating task:', err);
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
    
    // Seuls les admins peuvent supprimer des tâches
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admins can delete tasks.' });
    }

    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted successfully' });
  } catch(err) { 
    next(err); 
  }
};
