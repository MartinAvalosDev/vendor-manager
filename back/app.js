var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var agreementsRouter = require('./routes/agreements.router');
const submissionsRouter = require('./routes/submissions.router')

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
// var options = {
//     explorer: true
// };
// const swaggerSpec = swaggerJSDoc(options);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/aggreements', agreementsRouter);
app.use('/submissions', submissionsRouter);
app.use('/balances', submissionsRouter);


module.exports = app;
