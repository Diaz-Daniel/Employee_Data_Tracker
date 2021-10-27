const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "j1uSQLj1t5u!",
  database: "employeedb",
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
