const mysql2 = require('mysql2');
const dotenv = require('dotenv');

const db = require('../models/db');

const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

module.exports = pool.promise();