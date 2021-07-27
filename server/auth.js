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
    db.query("SELECT * FROM admin WHERE USERNAME=? AND 	PASSWORD=?;",[Username,Password],((err,result)=>{
        if(err){
            console.log(err);
            
        }
        else if(result.length > 0){
                    req.session.UserType = UserType;
                    req.session.user = result;
                    res.send(result)                   
                
            }else{
           res.send({message:"User dossn't exist"}) 
        }
    }))
})

authRouter.post("/Student",(req, res)=> {//เข้าสู่ระบบโดย นักศึกษา
    const Username = req.body.Username;
    const Password = req.body.Password;
    const UserType = req.body.UserType;
    db.query("SELECT * FROM student WHERE username=? AND 	password=? ;",[Username,Password],((err,result)=>{
        if(err){
            console.log(err);

        }
        else if(result.length > 0){
            bcrypt.hash(result[0].password, saltRounds, (err, hash) => {
                if (err) {
                  console.log(err);
                }else{
                bcrypt.compare(Password, hash,(error, response)=>{  
                    if(response){                       
                        req.session.UserType = UserType;
                        req.session.user = result;
                        res.send(result)  
                    }else{
                    res.send({ message: "Wrong username/password combination!" });
                    }
                })                    
                }
            })
            }else{
           res.send({message:"User dossn't exist"}) 
        }
    }))
})

authRouter.post("/Teacher",(req, res)=> {//เข้าสู่ระบบโดย อาจารย์
    const Username = req.body.Username;
    const Password = req.body.Password;
    const UserType = req.body.UserType;
    db.query("SELECT * FROM user_details WHERE username=? AND password=? ;",[Username,Password],((err,result)=>{
        if(err){
            console.log(err);
        }
        else if(result.length > 0){           
            bcrypt.hash(result[0].password, saltRounds, (err, hash) => {
                if (err) {
                  console.log(err);
                }else{
                bcrypt.compare(Password, hash,(error, response)=>{  
                    if(response){                 
                        req.session.UserType = UserType;
                        req.session.user = result;
                        res.send(result)  
                    }else{
                    res.send({ message: "Wrong username/password combination!" });
                    }
                })                    
                }
            })
            }else{
           res.send({message:"User dossn't exist"}) 
        }
    }))
})
authRouter.get("/getSession" ,(req, res) => {//ตรวจสอบ เซสชั่น
    sleep(0).then(()=>{
        if(req.session.user){   
        res.send({logedIn:true, usersData:req.session.user, UserType:req.session.UserType })
        }else{
        res.send({logedIn:false})
        }
    }  
    )      
})

authRouter.get("/logout" ,(req, res) => { //ออกจากระบบ
    sleep(5000).then(
        req.session.destroy()
    )
})
module.exports = authRouter

