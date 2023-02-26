const ObjectId = require('mongodb').ObjectId;
const mongodb = require('../db/connect.ts');
const valid = require("../helper");


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
    try {
        const userId = req.params.user;
        const result = await mongodb.getDb().db('todo').collection('todolist').find({ user: userId });
        result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
        });
    } catch (err) {
        console.log(err)
    }

}

const insertTodo = async (req, res, next) => {
    
    try {
        type Todo = {
            user: string,
            monday: Array<string>,
            tuesday: Array<string>,
            wednesday: Array<string>,
            thursday: Array<string>,
            friday: Array<string>,
            saturday: Array<string>,
            sunday: Array<string>
        };
        let todo:Todo = {
            user: req.body.user,
            monday: req.body.monday,
            tuesday: req.body.tuesday,
            wednesday: req.body.wednesday,
            thursday: req.body.thursday,
            friday: req.body.friday,
            saturday: req.body.saturday,
            sunday: req.body.sunday
        };
        // console.log(todo);
        // console.log()

        const response = valid.validateContact(todo);
        if (response.error) {
            res.status(422).json(response.error.message);
            return;
        }

        const result = await mongodb.getDb().db('todo').collection('todolist')
            .insertOne(todo);
        if (result.acknowledged) {
                res.status(201).json(result)
        } else {
            res.status(500).json({err: 'Could not create a new Todo.'})
        }
    } catch (err) {
        console.log("insertTodo: ",err)
    }

}

const updateTodo = async (req, res, next) => {
    
    try {
        type Todo = {
        user: string,
        monday: Array<string>,
        tuesday: Array<string>,
        wednesday: Array<string>,
        thursday: Array<string>,
        friday: Array<string>,
        saturday: Array<string>,
        sunday: Array<string>
        };
        let user:Todo = req.params.user;
        let update = {
            user: req.body.user,
            monday: req.body.monday,
            tuesday: req.body.tuesday,
            wednesday: req.body.wednesday,
            thursday: req.body.thursday,
            friday: req.body.friday,
            saturday: req.body.saturday,
            sunday: req.body.sunday
        };
        console.log(update);
        
        const response = valid.validateContact(update);
        if (response.error) {
            res.status(422).json(response.error.message);
            return;
        }

        let result = await mongodb.getDb().db('todo').collection('todolist')
            .replaceOne({ user : user }, update);//({_id: id}, {$set: update});
        if (result.modifiedCount > 0) {
            res.status(204).json(result);
        } else {
            res.status(500).json({err: 'Could not update Todo with id: ' + user})
        }
    } catch (err) {
        console.log(err)
    }

}

const deleteTodo = async (req, res, next) => {
    try {
        let user = req.params.user;
        
        const response = valid.validateDelete(user);
        if (response.error) {
            res.status(422).json(response.error.message);
            return;
        }


        let result = await mongodb.getDb().db('todo').collection('todolist')
            .findOneAndDelete({user: user});
        if (result) {
                res.status(200).json(result)
        }
        else {
            res.status(500).json({err: 'There was an error deleting Todo with id: ' + user});
        }
    } catch (err) {
        console.log(err)
    }

}

module.exports = { getTodos, getSingle, insertTodo, updateTodo, deleteTodo };