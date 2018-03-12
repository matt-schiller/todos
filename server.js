// Dependencies
const express = require('express');
const hbars = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

// .env
require('dotenv').config();

// Express app
const app = express();
const PORT = process.env.PORT || 8080;

// Models
const db = require('./models');

// Data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static directory
app.use(express.static('public'));

// Handlebars view engine
app.engine('handlebars', hbars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// // Routes [superseded by controller]
// require("./routes/html-routes.js")(app);
// require("./routes/api-routes.js")(app);

// Controller routes
const routes = require('./controllers/todos_controller.js');
app.use(routes);

// Sequelize and start app
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log('App listening on port '+PORT);
    });
});