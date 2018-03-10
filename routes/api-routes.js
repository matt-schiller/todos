var db = require('../models');

module.exports = function(app) {
    app.get('/api/todos', function(req, res) {
        db.Todo.findAll({}).then(function(dbTodo) {
            res.json(dbTodo);
        });
    });
};