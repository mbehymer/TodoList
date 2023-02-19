const express = require('express');
const router = express.Router();

const todosFunc = require('../controllers/index.ts');

router.get('/', todosFunc.getTodos);

router.get('/:user', todosFunc.getSingle);

router.post('/', todosFunc.insertTodo);

router.put('/:user', todosFunc.updateTodo);

router.delete('/:user', todosFunc.deleteTodo);

module.exports = router;