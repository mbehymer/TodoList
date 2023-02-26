const express = require('express');
const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send("<a href='./todo/'>Todo</a>")
});
routes.use('/todo', require('./todo.ts'));



module.exports = routes;