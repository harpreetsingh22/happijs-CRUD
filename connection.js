var mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hagemaru",
  database: "STUDENT",
  port: 3306,
  charset: "utf8mb4"
});



module.exports=connection ;


