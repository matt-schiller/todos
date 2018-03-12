const express = require('express');
const router = express.Router();
var db = require('../models');

// Homepage route
router.get('/', function(req, res) {
    db.Todo.findAll({}).then(function(data) {
        var hbsObject = {
            todos: data
        };
        res.render('index', hbsObject)
    });
});

// API get all
router.get('/api/todos', function(req, res) {
    db.Todo.findAll({}).then(function(data) {
        res.json(data);
    });
});

// API post new
router.post('/api/todo', function(req, res) {
    db.Todo.create({
        description: req.body.description,
        done: false
    }).then(function(data) {
        res.json(data);
    });
});

// API change status
router.put('/api/todo/:id', function(req, res) {
    db.Todo.update({
        done: req.body.done
    }, {
        where: { id: req.params.id }
    }).then(function(data) {
        res.json(data);
    });
});

// Export routes
module.exports = router;



