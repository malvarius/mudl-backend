require('dotenv').config()
const express = require('express');
const app = express();
const connection = require('./models/connection.js')
const orm = require('./models/orm.js')
const apiRoutes = require('./models/apiRoutes.js');

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
let PORT = process.env.PORT||3001;
// connection to db
connection.connect()
app.use('/apiroutes',apiRoutes);




app.listen(PORT, function () {   
   console.log("Example app listening at port", PORT)
})