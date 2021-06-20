const express = require('express')
const app = express();
const mysql = require('mysql')
const authRouter = require('./auth') 
const adminRouter = require('./adminManage')
const usersRouter = require('./userManage')

app.use(authRouter,adminRouter,usersRouter)

db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"food_center_psu_pn"
})
app.listen(3001,() => {
    console.log("connect sucsessful!");
})



