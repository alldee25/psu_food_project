const express = require('express')
const app = express();
const mysql = require('mysql')
const authRouter = require('./auth') 
const adminRouter = require('./adminManage')
const usersRouter = require('./userManage')
const appRouter = require('./appManage')
<<<<<<< HEAD
const path = require('path');
const socket = require('socket.io')

=======
const path = require('path')
const socket = require('socket.io')
>>>>>>> 8cea6c4331339c741b0dff06a18b9fabaff13b79


app.use(authRouter,adminRouter,usersRouter,appRouter)
app.use(express.static(path.join(__dirname, './public')));

db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"food_center_psu_pn"
})
const server = app.listen(3001,() => {
    console.log("connect sucsessful!");
})
io = socket(server)

module.exports = app;


