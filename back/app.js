var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { db } = require('./lib/orm.js');

const agreementsRouter = require('./routes/agreements.router');
const submissionsRouter = require('./routes/submissions.router')
const balancesRouter = require('./routes/balances.router');
const adminRouter = require('./routes/admin.router');


// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
// var options = {
//     explorer: true
// };
// const swaggerSpec = swaggerJSDoc(options);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

db.authenticate()
    .then(() => console.log('Database Connected'))
    .catch(err => console.log('Error: ', err))

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/agreements', agreementsRouter);
app.use('/submissions', submissionsRouter);
app.use('/balances', balancesRouter);
app.use('/balances', adminRouter);


module.exports = app;
