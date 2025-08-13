const { check, validationResult } = require('express-validator');

const memberValidationRules = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail()
];

const validateMember = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

module.exports = { memberValidationRules, validateMember };