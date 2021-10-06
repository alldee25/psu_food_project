const express = require('express')
const bodyParser = require('body-parser')
const authRouter = express.Router()
const bcrypt = require('bcrypt')
const cors = require("cors")
const session = require('express-session')
const saltRounds = 10;
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

authRouter.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET', 'POST'],
    credentials:true
}));
authRouter.use(bodyParser.urlencoded({
    extended: true
}))
authRouter.use(bodyParser.json());
authRouter.use(
    session({
      key: "userId",
      secret: "subscribe",
      resave: false,
      saveUninitialized: true,     
    })
);
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------//
authRouter.post("/Admin",(req, res)=> {//เข้าสู่ระบบโดยแอดมิน
    const Username = req.body.Username;
    const Password = req.body.Password;
    const UserType = req.body.UserType;
    db.query(`SELECT admin.*,role.role 
    FROM (admin
        INNER JOIN role ON role.id = admin.id_role )
    WHERE USERNAME=? AND 	PASSWORD=?;`,[Username,Password],((err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"Internet Error"})          
        }
        else if(result.length > 0){
                    req.session.UserType = UserType;
                    req.session.user = result;
                    req.session.img = result[0].img;
                    res.send(result)                   
                
            }else{
           res.send({message:"User dossn't exist"}) 
        }
    }))
})

authRouter.post("/customer",(req, res)=> {//เข้าสู่ระบบโดย ลูกค้าทั่วไป
    const Username = req.body.username;
    const Password = req.body.password;
    const UserType = req.body.userType;
    db.query("SELECT * FROM customer WHERE username=?",[Username],((err,result)=>{
        if(err){
            console.log(err);
            res.send({err:err})
        }
        else if(result.length > 0){
                bcrypt.compare(Password, result[0].password, (error, response)=>{                 
                    if(response){                       
                        req.session.UserType = UserType;
                        req.session.user = result;
                        req.session.img = result[0].img;
                        res.send(result)  
                    }else{
                        console.log("Wrong username/password combination!");
                    res.send({ message: "Wrong username/password combination!" });
                    }
                })                                 
            }else{
           res.send({message:"User dossn't exist"})
           console.log("User dossn't exist"); 
        }
    }))
})
authRouter.post("/student",(req, res)=> {//เข้าสู่ระบบโดย นักศึกษา
    const Username = req.body.username;
    const Password = req.body.password;
    const UserType = req.body.userType;
    db.query("SELECT * FROM student WHERE student_id=?",[Username],((err,result)=>{
        if(err){
            console.log(err);
        }
        else if(result.length > 0){
                bcrypt.compare(Password, result[0].password,(error, response)=>{  
                    if(response){                       
                        req.session.UserType = UserType;
                        req.session.user = result;
                        req.session.img = result[0].img;
                        res.send(result)  
                    }else{
                    res.send({ message: "Wrong username/password combination!" });
                    }
                })                    
                
            }else{
           res.send({message:"User dossn't exist"}) 
        }
    }))
})
authRouter.post("/store",(req, res)=> {//เข้าสู่ระบบโดย ร้านค้า
    const Username = req.body.username;
    const Password = req.body.password;
    const UserType = req.body.userType;
    db.query("SELECT * FROM store_owner WHERE store_id=?",[Username],((err,result)=>{
        if(err){
            console.log(err);
        }
        else if(result.length > 0){         
                bcrypt.compare(Password, result[0].password,(error, response)=>{  
                    if(response){                       
                        req.session.UserType = UserType;
                        req.session.user = result;
                        req.session.img = result[0].img;
                        res.send(result)  
                    }else{
                    res.send({ message: "Wrong username/password combination!" });
                    }
                })                    
               
            }else{
           res.send({message:"User dossn't exist"}) 
        }
    }))
})

authRouter.post("/Teacher",(req, res)=> {//เข้าสู่ระบบโดย อาจารย์
    const Username = req.body.username;
    const Password = req.body.password;
    const UserType = req.body.userType;
    db.query("SELECT * FROM store WHERE username=?",[Username],((err,result)=>{
        if(err){
            console.log(err);
        }
        else if(result.length > 0){                    
                bcrypt.compare(Password, result[0].password,(error, response)=>{  
                    if(response){                 
                        req.session.UserType = UserType;
                        req.session.user = result;
                        req.session.img = result[0].img
                        res.send(result)  
                    }else{
                    res.send({ message: "Wrong username/password combination!" });
                    }
                })                                  
            }else{
           res.send({message:"User dossn't exist"}) 
        }
    }))
})
authRouter.post("/signup" ,(req, res) => {//สมัครสมาชิก
    const name = req.body.name 
    const lastname = req.body.lastname 
    const username = req.body.username
    const password = req.body.password
    const phone = req.body.phone 
    const email = req.body.email
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        } else {
         db.query(`INSERT INTO customer (name,lastname,username,password,phone,email) VALUES(?,?,?,?,?,?)`
            ,[name,lastname,username,hash,phone,email],(err)=>{
        if (err) {
            console.log(err);
        } else {
            res.send({message:'Scuccessful Regigting!'})
        }
    })   
        }
    })
             
})
authRouter.get("/getSession" ,(req, res) => {//ตรวจสอบเซสชั่น
    if(req.session.user){   
    res.send({logedIn:true, usersData:req.session.user, UserType:req.session.UserType, usersImg:req.session.img })
    }else{
    res.send({logedIn:false})
    }         
})

authRouter.get("/logout" ,(req, res) => { //ออกจากระบบ
    req.session.destroy()
    res.send({message:'unLogin'})
})
module.exports = authRouter

