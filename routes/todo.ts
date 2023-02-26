const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');


const todosFunc = require('../controllers/index.ts');

router.get('/', requiresAuth(), todosFunc.getTodos);

router.get('/:user', requiresAuth(), todosFunc.getSingle);

router.post('/', requiresAuth(), todosFunc.insertTodo);

router.put('/:user', requiresAuth(), todosFunc.updateTodo);

router.delete('/:user', requiresAuth(), todosFunc.deleteTodo);

module.exports = router;