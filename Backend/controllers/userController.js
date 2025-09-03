const User = require('../models/User');

exports.getAllUsers = async (req, res, next) => {
  try {
    // Seuls les admins peuvent voir tous les utilisateurs
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }

    const users = await User.find({}, '-password')
      .sort({ createdAt: -1 });

    res.json({
      message: 'Users retrieved successfully',
      data: users
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Les utilisateurs peuvent voir leur propre profil, les admins peuvent voir tous les profils
    if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    const user = await User.findById(id, '-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    // Seuls les admins peuvent modifier d'autres utilisateurs
    if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    // Seuls les admins peuvent modifier le rôle
    if (role && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can modify user roles.' });
    }

    const updateData = { name, email };
    if (role && req.user.role === 'admin') {
      updateData.role = role;
    }

    const user = await User.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Seuls les admins peuvent supprimer des utilisateurs
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }

    // Empêcher la suppression de son propre compte
    if (req.user._id.toString() === id) {
      return res.status(400).json({ message: 'Cannot delete your own account.' });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};
