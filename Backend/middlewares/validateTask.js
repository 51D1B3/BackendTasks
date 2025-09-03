const { check, validationResult } = require('express-validator');

const taskValidationRules = [
  check('title', 'Title is required').not().isEmpty(),
  check('priority').optional().isIn(['low', 'medium', 'high']),
  check('status').optional().isIn(['todo', 'in_progress', 'done'])
];

const validateTask = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

module.exports = { taskValidationRules, validateTask };
