const mysql = require('mysql2');

// Database Connection Configuration
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_password',  // Change this
  database: 'support_ticket_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Promise wrapper for database queries
const promisePool = pool.promise();

module.exports = promisePool;
