const mysql = require("mysql2");
let connection = null;

module.exports = function () {
  if (!connection) {
    connection = mysql.createPool({
      connectionLimit: 50,
      host: "mysql-36312aa4-natify.a.aivencloud.com",
      port: 11495,
      user: "avnadmin",
      password: "AVNS_oNfUSJmeucfujRaKMW3",
      database: "defaultdb",
    });
  }
  return connection;
};
