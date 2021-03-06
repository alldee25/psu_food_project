const express = require('express')
const app = express();
const mysql = require('mysql')
const authRouter = require('./auth') 
const adminRouter = require('./adminManage')
const usersRouter = require('./userManage')
const appRouter = require('./appManage')
const path = require('path');
const socket = require('socket.io')



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


