const express = require('express');
const router = express.Router();

const todosFunc = require('../controllers/index.ts');

router.get('/', todosFunc.getTodos);

router.get('/:id', todosFunc.getSingle);

router.post('/', todosFunc.insertTodo);

router.put('/:id', todosFunc.updateTodo);

router.delete('/:id', todosFunc.deleteTodo);

module.exports = router;