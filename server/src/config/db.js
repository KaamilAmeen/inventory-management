const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const path=require('path');
dotenv.config({path:path.resolve(__dirname,'../../../.env')});

const app = express();
app.use(express.json());

const pool = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT||3306,
});

module.exports=pool.promise();