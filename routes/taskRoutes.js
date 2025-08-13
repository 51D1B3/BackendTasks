const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const taskController = require('../controllers/taskController');
const { taskValidationRules, validateTask } = require('../middlewares/validateTask');

router.use(auth);

router.get('/', taskController.list);
router.get('/:id', taskController.get);
router.post('/', taskValidationRules, validateTask, taskController.create);
router.put('/:id', taskValidationRules, validateTask, taskController.update);
router.delete('/:id', taskController.delete);

module.exports = router;
