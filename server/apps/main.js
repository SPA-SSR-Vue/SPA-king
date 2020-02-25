const express = require('express')
const app = express()

app.use(require('cors')());
app.use(express.json())

app.set('SECRET', '0ci14s50fn23u7f6t39ui6ht4ng90tu55vs60cd7b7n8mb');

// static file
app.use('/uploads', express.static(__dirname + '/../public/uploads'));

// db
require('./../libs/db/db')(app)

// web admin routes
require('./web/routes')(app)
require('./admin/routes')(app)

// error catch and handle
app.use('/', (err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    message: err.message
  });
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});