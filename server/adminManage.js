const express = require('express')
const bodyParser = require('body-parser')
const adminRouter = express.Router()
const bcrypt = require('bcrypt')
const cors = require("cors")
const session = require('express-session')
const saltRounds = 10;
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

adminRouter.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET', 'POST'],
    credentials:true
}));
adminRouter.use(bodyParser.urlencoded({
    extended: true
}))
adminRouter.use(bodyParser.json());
//----------------------------------------------------------------------------------------------------------------------------------------------------------//
adminRouter.post("/insert",(req,res)=>{//เพิ่มข้อมูลประกาศ
    const title = req.body.title
    const content = req.body.content 
    db.query("INSERT INTO announce (Title,Content) VALUE (?,?)",[title,content],
    (err) => {
        if(err){
            console.log(err);
        }else{
            res.send('Success for insert')
        }
    })
})

adminRouter.get("/get",(req,res)=>{//ดึงข้อมูลประกาศ
    db.query("SELECT * FROM announce ",((err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }))
})

adminRouter.post("/delete",(req,res)=>{//ลบข้อมูประกาศ
    const id = req.body.id;
    db.query("DELETE FROM announce WHERE id=?",[id],(err) => {
        if(err){
            console.log(err);
        }else{
            res.send('Success for delete')
        }
    })
})

adminRouter.post("/getStoreApplicationsList",(req, res) => {//ดึงข้อมูลใบสมัคทั้งหมด
    const date = req.body.date;
    db.query(`SELECT regisstore.*,admin.name AS adminName 
                FROM ((regisstore 
                LEFT JOIN applicationcheck ON regisstore.id = applicationcheck.regis_id ) 
                LEFT JOIN admin ON applicationcheck.admin_id = admin.id) 
                WHERE year(date_regis)=?;`,
                [date],((err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }))
})
adminRouter.post("/getStoreInterViewList",(req, res) => {//ดึงข้อมูลร้านที่ผ่านการสมัค
    const date = req.body.date;
    db.query(`SELECT regisstore.*,interview.admin_id,admin.name AS admin_name 
                FROM ((((regisstore 
                INNER JOIN applicationcheck ON applicationcheck.regis_id = regisstore.id) 
                INNER JOIN applicationcheck_detial ON applicationcheck.id = applicationcheck_detial.applicationcheck_id 
                AND applicationcheck_detial.image = 1 
                AND applicationcheck_detial.copyIdcard = 1 
                AND applicationcheck_detial.copyHome = 1 
                AND applicationcheck_detial.MedicalCertificate = 1 
                AND applicationcheck_detial.Certificate = 1 
                AND applicationcheck_detial.Applicationfee = 1) 
                LEFT JOIN interview ON interview.regis_id = regisstore.id) 
                LEFT JOIN admin ON admin.id = interview.admin_id) 
                WHERE year(date_regis) = ? AND status = ?`,[date,'หลักฐานครบ'],((err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }))
})

adminRouter.post("/getStoreApplicationsDetial",(req, res) => {//ดึงข่้อมูลรายละเอียดใบสมัค
    const id = req.body.id;
    db.query(`SELECT regisstore.*,type.store_type AS type,type1.religion AS type1, location.location AS locations 
                FROM ((regisstore 
                INNER JOIN type ON type.id = regisstore.id_type )
                INNER JOIN type1 ON type1.id = regisstore.id_type1) 
                INNER JOIN location ON location.id = regisstore.id_locations 
                WHERE regisstore.id=?`,[id],((err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }))
})

adminRouter.post("/getMenuList",(req, res) => {//ดึงข้อมูลรายชื่ออาหารของแต่ละร้าน
    const id = req.body.id;
    db.query("SELECT * FROM menustore WHERE idstore=?",[id],((err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }))
})

adminRouter.get("/getYears",(req,res)=>{//ดึงข้อมูลปีของร้านที่สมัคทั้งหมด
    db.query("SELECT year(date_regis) AS Year FROM regisstore",((err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }))
})

adminRouter.post('/CheckApplication',(req, res)=>{//อัพเดทหลักฐานใบสมัคของร้าน
    const regis_id = req.body.id
    const status = req.body.status
    const Detial = req.body.Detial
    const adminId = req.body.adminId
    const date_check = req.body.date
    db.query("UPDATE regisstore SET status=? WHERE id=?",[status,regis_id],((err)=>{
        if(err){
            console.log(err);
        }else{
            db.query(`INSERT INTO applicationcheck (admin_id,date_check,regis_id) VALUES (?,?,?)`,[adminId,date_check,regis_id],(err)=>{
                if (err) {
                    console.log(err);
                }
                else{
                    db.query(`SELECT id FROM applicationcheck WHERE regis_id=?`,[regis_id],(err,result)=>{
                        if (err) {
                            console.log(err);
                        } else {
                          db.query(`INSERT INTO applicationcheck_detial (applicationcheck_id,image,copyIdcard,copyHome,MedicalCertificate,Certificate,Applicationfee) VALUES (?,?,?,?,?,?,?)`,
                          [result[0].id,Detial.image,Detial.copyIdcard,Detial.copyHome,Detial.MedicalCertificate,Detial.Certificate,Detial.Applicationfee],((err,)=>{
                              if (err) {
                                  console.log(err);
                              } else {
                                  res.send('เพิ่มเรียบร้อย')
                              }
                          }))  
                        }
                    })
                    
                }
            
            })
        }
    })) 
})
adminRouter.post("/getInterViewDetial",(req,res)=>{//ดึงรายละเอียดข้อมูลของร้านที่สมัคผ่าน
    const id = req.body.id
    db.query(`SELECT regisstore.*,type.store_type AS type,location.location AS location 
                FROM ((regisstore INNER JOIN type ON type.id = regisstore.id_type) 
                INNER JOIN location ON location.id = regisstore.id_locations) 
                WHERE regisstore.id = ?`,[id],((err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }))
})
adminRouter.post("/insertInterview",(req,res)=>{//เพิ่มข้อมูลร้านและเจ้าของร้าน
    const score1 = req.body.score1
    const score2 = req.body.score2
    const score3 = req.body.score3
    const note1 = req.body.note1
    const note2 = req.body.note2
    const note3 = req.body.note3
    const regisId = req.body.regisId
    const adminId = req.body.adminId
    const date = req.body.date
    const sum = req.body.sum
    const feedback = req.body.feedback
    const dataInterViewList = req.body.dataInterViewList
    const bordOpenion = req.body.bordOpenion
    const bType = req.body.bType 
    const bLocation = req.body.bLocation
    if (sum>=80 && bordOpenion) {
        db.query("INSERT INTO store (regis_id,store_name,location_id,type_id,type1_id,promosion) VALUES (?,?,?,?,?,?)",[regisId,dataInterViewList[0].store_name,dataInterViewList[0].id_locations,dataInterViewList[0].id_type,dataInterViewList[0].id_type1,dataInterViewList[0].promosion],((err)=>{
            if (err) {
                console.log(err);
            }
            else{
                db.query(`SELECT id FROM store WHERE regis_id=?`,[regisId],((err,result)=>{
                    if (err) {
                        console.log(err);
                    } else {
                     db.query(`INSERT INTO store_owner (store_id,name,dob,nationality,religion,idcard,idstart,idend,adress,phone,email) 
                                VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
                                [result[0].id,dataInterViewList[0].name,dataInterViewList[0].dob,dataInterViewList[0].nationality,dataInterViewList[0].religion,dataInterViewList[0].idcard,dataInterViewList[0].idstart,dataInterViewList[0].idend,dataInterViewList[0].adress,dataInterViewList[0].phone,dataInterViewList[0].email],
                                ((err)=>{
                                    if (err) {
                                        console.log(err);
                                    }                                 
                                }))   
                    }
                }))           
            }
        }))
    }
    db.query("INSERT INTO interview (regis_id,admin_id,interview_date) VALUES (?,?,?)",[regisId,adminId,date],((err)=>{
        if(err){
            console.log(err);
        }else{
            db.query("SELECT id FROM interview WHERE regis_id=?",[regisId],((err,result)=>{
                if (err) {
                    console.log(err);
                }
                else{
                    db.query("INSERT INTO interview_detial (interview_id,score1,score2,score3,note1,note2,note3,feedback) VALUE (?,?,?,?,?,?,?,?)",[result[0].id,score1,score2,score3,note1,note2,note3,feedback],((err)=>{
                        if (err) {
                            console.log(err);
                        }
                        else{
                            db.query(`INSERT INTO board_opinion (interview_id,bord_opinion_detial,type_id,location_id) VALUES (?,?,?,?)`,[result[0].id,bordOpenion,bType,bLocation],((err)=>{
                                if (err) {
                                    console.log(err);
                                }
                                else{
                                    res.send('Good Bye')
                                }
                            }))
                        }
                    }))
                        
                    
                    
                }
            }))
        }
    }))    
})
adminRouter.post("/getStoreList",(req,res)=>{
    db.query(`SELECT store.*,store.id AS s_id, store_owner.* 
                FROM store 
                INNER JOIN store_owner ON store_owner.store_id = store.id`,((err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result)
        }
    }))              
})
adminRouter.post("/getTypeList",(req,res)=>{
    const id = req.body.id
    db.query(`SELECT type.* 
                FROM type`,((err,result)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.send(result)
                    }
                }))
})
adminRouter.post("/getLocationList",(req,res)=>{
    db.query(`SELECT location.* 
                FROM location `,((err,result)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.send(result)
                    }
                }))
})
adminRouter.post("/getStoreAndStoreOwnerDetial",(req,res)=>{
    const id = req.body.id
    db.query(`SELECT store.*, store_owner.*,location.location,type.store_type AS type, type1.religion AS type1 
                FROM ((((store 
                INNER JOIN store_owner ON store.id = store_owner.store_id)
                INNER JOIN type ON type.id = store.type_id)
                INNER JOIN type1 ON type1.id = store.type1_id)
                INNER JOIN location ON location.id = store.location_id)
                WHERE store.id = ?`,[id],((err,result)=>{
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(result)
                    }
                }))
})
adminRouter.post("/getStoreMenuList",(req, res) => {//ดึงข้อมูลรายชื่ออาหารของแต่ละร้าน
    const id = req.body.id;
    db.query(`SELECT menustore.* 
                FROM (menustore
                INNER JOIN store ON store.regis_id = idstore)  
                WHERE store.id=?`,[id],((err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }))
})
adminRouter.get("/getDetialList",(req, res) => {//ดึงข้อมูลเงื่อนไขการให้คะแนน
    db.query(`SELECT * FROM cleanliness_topic`,((err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }))
})
adminRouter.get("/getYearsOfClean",(req, res) => {
    db.query(`SELECT year(date) AS Year FROM cleanliness_level`,((err, result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result)
        }
    }))
})
adminRouter.post("/getCleanListByYearAndMonth",(req, res) => {
    const year = req.body.yearToday
    const month = req.body.month
    db.query(`SELECT store.store_name,store.id AS s_id,cleanliness_level.*,admin.name 
            FROM ((store 
            LEFT JOIN cleanliness_level ON cleanliness_level.store_id = store.id AND year(cleanliness_level.date) = ? AND month(cleanliness_level.date) = ?)
            LEFT JOIN admin ON admin.id = cleanliness_level.admin_id)`,[year,month],((err, result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result)
        }
    }))
})
adminRouter.post("/InsertStoreCleanLevel",(req, res)=>{
    const scores = req.body.scores
    const date = req.body.date
    const adminid = req.body.adminId
    const time = req.body.time
    const storeId = req.body.storeId
    const status = req.body.status
    const feedback  = req.body.feedback 
    db.query(`INSERT INTO cleanliness_level (admin_id,store_id,status,time,date,feedback ) VALUE(?,?,?,?,?,?)`,[adminid,storeId,status,time,date,feedback],((err)=>{
        if (err) {
            console.log(err);
        }
        else{
            db.query(`SELECT id FROM cleanliness_level WHERE store_id = ? AND date = ?`,[storeId,date],((err,result)=>{
                if (err) {
                    console.log(err);
                } else {
                    result[0].id
                    scores.forEach(element => {
                       db.query(`INSERT INTO cleanliness_level_detial (cleanliness_level_id,topic_id,point,detial) VALUE(?,?,?,?)`,
                       [result[0].id,element.id,element.score,element.detial]) 
                    });
                    
                }
            }))
        }
    }))
})
module.exports = adminRouter