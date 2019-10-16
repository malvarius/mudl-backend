require('dotenv').config()
const { Client } = require('pg');
client = new Client({
    host: 'ec2-54-204-37-92.compute-1.amazonaws.com',
    user: 'kvonzygxcgxkqp',
    password: process.env.DBPass,
    database: 'd7qghto2fbbiip',
    ssl:true
});

module.exports=client;