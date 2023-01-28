const express = require('express');
const routes = require('./routes');

// import sequelize connection
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "raindrop",
  database: "ecommerce_db",
});

connection.connect(function (err) {
  if (err) {
    return;
  }
});
// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
