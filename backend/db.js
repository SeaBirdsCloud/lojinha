const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "10.34.5.85",
  user: "userlojinha",
  password: "userlojinha",
  database: "lojinha",
});

module.exports = connection.promise();
