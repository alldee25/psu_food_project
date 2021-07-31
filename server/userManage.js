const express = require('express')
const bodyParser = require('body-parser')
const usersRouter = express.Router()
const cors = require("cors")
const path = require('path')
const multer = require('multer')
usersRouter.use(express.static(path.join(__dirname, './public/images/')));
usersRouter.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET', 'POST'],
    credentials:true
}));
usersRouter.use(bodyParser.urlencoded({
    extended: true
}))
usersRouter.use(bodyParser.json());
const userStorage = multer.diskStorage({
    destination: (req , file, cb) =>{
        cb(null, './public/images/userUploaded/');
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const userUpload = multer({
    storage: userStorage,
    limits:{fileSize: 1000000},
    fileFilter: function(req,file,cb){
        checkFileType(file, cb);
    }
})
const checkFileType =(file,cb)=>{
    const filetype = /jpeg|jpg|png|gif/;
    const extname = filetype.test(path.extname
        (file.originalname).toLocaleLowerCase())
    const mimetype = filetype.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb('Error: Image Only!')
    }
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------//
usersRouter.post("/insertRegisStore",userUpload.single('file'),(req, res)=> {//เพิ่มข้อมูลใบสมัคร

    if (req.file == undefined) {
        res.send({msg:'Error: No File Selected!'})
    } else {
    const img = req.file.filename
    const name = req.body.name
    const lastName = req.body.lastName
    const gender = req.body.gender
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
    const typeId = req.body.typeId
    const type1Id = req.body.type1Id
    const locationsId = req.body.locationsId
    const promosion = req.body.promosion
    const date = req.body.date
    db.query(`INSERT INTO regisstore (name,lastname,gender,store_name,dob,race,nationality,religion,idcard,idstart,idend,adress,phone,email,id_type,id_type1,id_locations,promosion,img,date_regis,status) 
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,'รอดำเนินการ');`,
    [name,lastName,gender,storeName,dob,race,nationality,religion,idcard,idstart,idend,adress,phone,email,typeId,type1Id,locationsId,promosion,img,date],((err)=>{
        if(err){
            console.log(err);
            res.send({ message: "เพิ่มข้อมูลไม่สำเร็จ" })
        }
        else{
            res.send('เพิ่มข้อมูลเรียบร้อย')   
        }   
        })
    )}
      
})
usersRouter.post("/insertRegisStoreMenuList",(req, res)=>{//เพิ่มข้อมุลเมนู
    const date = req.body.date
    const idcard = req.body.idcard
    const inputfild = req.body.inputfild
    inputfild.forEach(inputfild => {
        db.query("INSERT INTO menustore (idstore,menu,price) VALUES ((SELECT id FROM regisstore WHERE idcard = ? AND date_regis = ?),?,?)",[idcard,date,inputfild.menu,inputfild.price],((err,)=>{
          if(err){
              console.log(err);
              res.send({ message: "เพิ่มข้อมูลไม่สำเร็จ" })
          }
        })) 
     })
     res.send('เพิ่มข้อมูลเรียบร้อย')
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

