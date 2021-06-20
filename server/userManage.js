const express = require('express')
const bodyParser = require('body-parser')
const usersRouter = express.Router()
const cors = require("cors")
usersRouter.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET', 'POST'],
    credentials:true
}));
usersRouter.use(bodyParser.urlencoded({
    extended: true
}))
usersRouter.use(bodyParser.json());
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------//
usersRouter.post("/insertRegisStore",(req, res)=> {//เพิ่มข้อมูลใบสมัคร
    const name = req.body.name
    const storeName = req.body.storeName
    const dob = req.body.dob
    const race = req.body.race
    const nationality = req.body.nationality
    const religion = req.body.religion
    const idcard = req.body.idcard
    const idstart = req.body.idstart
    const idend = req.body.idend
    const adress = req.body.adress
    const phone = req.body.phone
    const email = req.body.email
    const type = req.body.type
    const type1 = req.body.type1
    const locations = req.body.locations
    const promosion = req.body.promosion
    const inputfild = req.body.inputfild
    const date = req.body.date
    db.query(`INSERT INTO regisstore (name,store_name,dob,race,nationality,religion,idcard,idstart,idend,adress,phone,email,id_type,id_type1,id_locations,promosion,date_regis,status) 
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,'รอดำเนินการ');`,
    [name,storeName,dob,race,nationality,religion,idcard,idstart,idend,adress,phone,email,type,type1,locations,promosion,date],((err)=>{
        if(err){
            console.log(err);
            res.send({ message: "เพิ่มข้อมูลไม่สำเร็จ" })
        }
        else{
         db.query("SELECT id FROM regisstore WHERE idcard=?",[idcard],((err,result)=>{
                if (err) {
                    console.log("err2 "+err);
                }
                else{               
                inputfild.forEach(inputfild => {
                   db.query("INSERT INTO menustore (idstore,menu,price) VALUES (?,?,?)",[result[0].id,inputfild.menu,inputfild.price],((err,)=>{
                     if(err){
                         console.log(err);
                     }
                   })) 
                })
                res.send('เพิ่มข้อมูลเรียบร้อย')
                }             
            }))   
        }   
        }))  
})
usersRouter.post("/getIdCard",(req, res)=>{//ดึงข้อมูลรหัสบัตรประชาชนในปีที่สมัคร
    const year = req.body.year
    db.query("SELECT idcard FROM regisstore WHERE year(date_regis)=?",[year],((err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }))  
})
usersRouter.get("/getType",(req, res)=>{//ดึงข้อมูลประเภทร้าน
    db.query("SELECT * FROM type",((err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }))  
})
usersRouter.get("/getType1",(req, res)=>{//ดึงข้อมูลประเภทร้าน 1
    db.query("SELECT * FROM type1",((err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }))  
})
usersRouter.get("/getLocation",(req, res)=>{//ดึงข้อมูลสถานที่ที่เปิดขาย
    db.query("SELECT * FROM location",((err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }))  
})
module.exports = usersRouter

