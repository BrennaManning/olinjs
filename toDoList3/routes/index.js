//require dependencies
var express  = require('express');
var router = express.Router();                          
var mongoose = require('mongoose'); 
var Todo = require('../models/todoModel.js')

router.get('/api/todos', function(req, res) {
//get all tasks from database
  Todo.find(function(err, todos) {
  
    if (err) { res.send(err) }
    res.json(todos); // return all todos in JSON format
  });
});

router.post('/api/todos', function(req, res) {
//create a new task
  Todo.create({
    text : req.body.text,
    done : false
  }, function(err, todo) {
    if (err) {res.send(err);}

    Todo.find(function(err, todos) {
      if (err) {res.send(err)} //send error if error
      res.json(todos);
    });
  });

});

//edit  task
router.put('/api/todos/:todo_id', function(req, res) {
// update task after editing
  Todo.update({
    _id: req.params.todo_id
  }, {
    text: req.body.text
  }, {}, function(err, todo) {
    if (err) {res.send(err);}

  Todo.find(function(err, todos) {
    if (err) {res.send(err); return;} 
    res.json(todos);
    });
  });

});

//complete  task
router.post('/api/todos/:todo_id', function(req, res) {

  Todo.update({
    _id: req.params.todo_id
  }, {
    done: true
  }, {}, function(err, todo) {
    console.log('Todo completed!');
    if (err) {res.send(err);}

  Todo.find(function(err, todos) {
    if (err) {res.send(err); return;} 
    res.json(todos);
    });
  });

});
//delete a task from the list
router.delete('/api/todos/:todo_id', function(req, res) {
  Todo.remove({
      _id : req.params.todo_id
  }, function(err, todo) {
    if (err)
      res.send(err);
    Todo.find(function(err, todos) {
      if (err) {res.send(err)}
      res.json(todos);
    });
  });
});

router.get('*', function(req, res) {
    res.sendfile('./public/index.html'); });

module.exports = router;



