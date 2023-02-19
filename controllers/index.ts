const ObjectId = require('mongodb').ObjectId;
const mongodb = require('../db/connect.ts');

const getTodos = async (req, res, next) => {
    try {
        const result = await mongodb.getDb().db('todo').collection('todolist').find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (err) {
        console.log(err)
    }
    
};

const getSingle = async (req, res, next) => {
    const userId = req.params.user;
    const result = await mongodb.getDb().db('todo').collection('todolist').find({ user: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });

}

const insertTodo = async (req, res, next) => {
    
    let person = {
        user: req.body.user,
        todo: req.body.todo
    };
    console.log(person);
    // console.log()
    const result = await mongodb.getDb().db('todo').collection('todolist')
        .insertOne(person);
    if (result.acknowledged) {
            res.status(201).json(result)
    } else {
        res.status(500).json({err: 'Could not create a new Todo.'})
    }

}

const updateTodo = async (req, res, next) => {
    
    let user = req.params.user;
    let update = {
        user: req.body.user,
        todo: req.body.todo
    };
    console.log(update);
    
    let result = await mongodb.getDb().db('todo').collection('todolist')
        .replaceOne({ user : user }, update);//({_id: id}, {$set: update});
    if (result.modifiedCount > 0) {
        res.status(204).json(result);
    } else {
        res.status(500).json({err: 'Could not update Todo with id: ' + user})
    }

}

const deleteTodo = async (req, res, next) => {
    
    let user = req.params.user;
    
    let result = await mongodb.getDb().db('todo').collection('todolist')
        .findOneAndDelete({user: user});
    if (result) {
            res.status(200).json(result)
    }
    else {
        res.status(500).json({err: 'There was an error deleting Todo with id: ' + user});
    }

}

module.exports = { getTodos, getSingle, insertTodo, updateTodo, deleteTodo };