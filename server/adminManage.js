const express = require('express')
const bodyParser = require('body-parser')
const adminRouter = express.Router()
const bcrypt = require('bcrypt')
const cors = require("cors")
const session = require('express-session')
const saltRounds = 10;
const path = require('path')
let fs = require('fs');
adminRouter.use(express.static(path.join(__dirname, './public/images/')));

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req , file, cb) =>{
        cb(null, './public/images/adminUploaded/');
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req,file,cb){
        checkFileType(file, cb);
    }
})
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
adminRouter.post('/upload', upload.single('file'), (req, res)=>{
    if (req.file == undefined) {
        res.send({msg:'Error: No File Selected!'})
    } else {
        const image =  req.file.filename
        const id = req.body.id
        if (req.body.oldFile && req.file !== undefined) {
            fs.unlink('./public/images/adminUploaded/'+req.body.oldFile, function(err){
                if (err) {
                    throw err;
                }
            })
        }
         db.query(`UPDATE admin SET img = ? WHERE id = ?`,[image,id],((err,result)=>{
            if (err) {
                console.log(err);
                res.send({
                    msg: err
                })
            } if (result){
                req.session.img = image;
                res.send({
                  data: result,
                  msg:"good",
                  
                })
                
            }
        }))
    }
        
       
})
adminRouter.post("/insert",(req,res)=>{//เพิ่มข้อมูลประกาศ
    const title = req.body.title
    const content = req.body.content 
    const date = req.body.Date 
    db.query("INSERT INTO announce (Title,Content,date) VALUE (?,?,?)",[title,content,date],
    (err) => {
        if(err){
            console.log(err);
        }else{
            res.send('Success for insert')
        }
    })
})

adminRouter.get("/get",(req,res)=>{//ดึงข้อมูลประกาศ
    db.query("SELECT * FROM announce",((err, result)=>{
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
                WHERE year(date_regis) = ? AND regisstore.status = ?`,[date,'หลักฐานครบ'],((err,result)=>{
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
                    db.query(`INSERT INTO applicationcheck_detial (applicationcheck_id,image,copyIdcard,copyHome,MedicalCertificate,Certificate,Applicationfee) VALUES ((SELECT id FROM applicationcheck WHERE regis_id = ?),?,?,?,?,?,?)`,
                    [regis_id,Detial.image,Detial.copyIdcard,Detial.copyHome,Detial.MedicalCertificate,Detial.Certificate,Detial.Applicationfee],((err,)=>{
                        if (err) {
                            console.log(err);
                        } else {
                            res.send('เพิ่มเรียบร้อย')
                        }
                    }))                                           
                    
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
adminRouter.post("/getInterViewDetialForSee",(req,res)=>{//ดึงรายละเอียดข้อมูลของร้านที่สมัคผ่าน
    const id = req.body.id
    db.query(`SELECT regisstore.*,type.store_type AS type,location.location AS location,
                interview.status,
                interview_detial.*,board_opinion.bord_opinion_detial
                FROM (((((regisstore INNER JOIN type ON type.id = regisstore.id_type) 
                INNER JOIN location ON location.id = regisstore.id_locations)
                INNER JOIN interview ON interview.regis_id = regisstore.id)
                INNER JOIN interview_detial ON interview_detial.interview_id = interview.id)
                INNER JOIN board_opinion ON board_opinion.interview_id = interview.id)
                WHERE regisstore.id = ?`,[id],((err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }))
})
adminRouter.post("/getInterViewDetialForSeeBoardlocationAdnType",(req,res)=>{//ดึงรายละเอียดข้อมูลของร้านที่สมัคผ่าน
    const id = req.body.id
    db.query(`SELECT type.store_type,location.location 
            FROM (((type 
                    INNER JOIN board_opinion ON board_opinion.type_id = type.id)
                    INNER JOIN location ON location.id = board_opinion.location_id)
                    INNER JOIN interview ON board_opinion.interview_id = interview.id)
            WHERE interview.regis_id = ?`,[id],((err,result)=>{
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
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    if (err) {
                        console.log(err);
                    } else {
                        db.query(`INSERT INTO store_owner (store_id,name,lastname,gender,dob,race,nationality,religion,idcard,idstart,idend,adress,phone,email,password) 
                        VALUES ((SELECT id FROM store WHERE regis_id=?),?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                        [regisId,
                        dataInterViewList[0].name,
                        dataInterViewList[0].lastname,
                        dataInterViewList[0].gender,
                        dataInterViewList[0].dob,
                        dataInterViewList[0].race,
                        dataInterViewList[0].nationality,
                        dataInterViewList[0].religion,
                        dataInterViewList[0].idcard,
                        dataInterViewList[0].idstart,
                        dataInterViewList[0].idend,
                        dataInterViewList[0].adress,
                        dataInterViewList[0].phone,
                        dataInterViewList[0].email,                                       
                        hash],
                        ((err)=>{
                            if (err) {
                                console.log(err);
                            }                                 
                        }))
                    }
                    
                    })                                           
            }
        }))
    }
    db.query("INSERT INTO interview (regis_id,admin_id,interview_date) VALUES (?,?,?)",[regisId,adminId,date],((err)=>{
        if(err){
            console.log(err);
        }else{
                db.query("INSERT INTO interview_detial (interview_id,score1,score2,score3,note1,note2,note3,feedback) VALUE ((SELECT id FROM interview WHERE regis_id=?),?,?,?,?,?,?,?)",
                    [regisId,score1,score2,score3,note1,note2,note3,feedback],((err)=>{
                        if (err) {
                            console.log(err);
                        }
                        else{
                            db.query(`INSERT INTO board_opinion (interview_id,bord_opinion_detial,type_id,location_id) VALUES ((SELECT id FROM interview WHERE regis_id=?),?,?,?)`,[regisId,bordOpenion,bType,bLocation],((err)=>{
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
adminRouter.get('/getStoreOwnerList',(req,res)=>{
    db.query(`SELECT store_owner.name,store.store_name,store.id 
            FROM (store 
            INNER JOIN store_owner ON store_owner.store_id = store.id)`,((err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    res.send(result)
                }
            }))
})
adminRouter.post('/geStoreDetialBynameList',(req, res)=>{
    const storeId = req.body.storeId
    db.query(`SELECT complaint.*,admin.name AS ad_name,store_owner.name
                FROM (((complaint 
                INNER JOIN store ON store.id = complaint.store_id)
                INNER JOIN store_owner ON store_owner.store_id = store.id)
                INNER JOIN admin ON admin.id = complaint.admin_id)
                WHERE complaint.store_id = ?`,[storeId],((err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    res.send(result)
                }
            }))
})
adminRouter.post('/getStoreInfo',(req, res)=>{
    const storeId = req.body.id
    db.query(`SELECT store_owner.name,location.location
            FROM ((store
            INNER JOIN store_owner ON store_owner.store_id = store.id)
            INNER JOIN location ON location.id = store.location_id)
            WHERE store.id = ?`,[storeId],((err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    res.send(result)
                }
            }))
})
adminRouter.post('/getStoreAndComplaintInfo',(req, res)=>{
    const complaintId = req.body.id
    db.query(`SELECT store_owner.name,location.location,complaint.*
            FROM (((store
            INNER JOIN store_owner ON store_owner.store_id = store.id)
            INNER JOIN location ON location.id = store.location_id)
            INNER JOIN complaint ON complaint.store_id = store.id)
            WHERE complaint.id = ?`,[complaintId],((err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    res.send(result)
                }
            }))
})
adminRouter.get('/getAdminInfoManager',(req, res)=>{
    const storeId = 'เจ้าหน้าที่บริหารงานทั่วไป'
    db.query(`SELECT role.role, admin.* FROM (role INNER JOIN admin ON admin.id_role = role.id) WHERE role.role = ?`,[storeId],((err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    res.send(result)
                }
            }))
})
adminRouter.get('/getAdminInfoAttendant',(req, res)=>{
    const storeId = 'ผู้ดูแล'
    db.query(`SELECT role.role, admin.* FROM (role INNER JOIN admin ON admin.id_role = role.id) WHERE role.role = ?`,[storeId],((err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    res.send(result)
                }
            }))
})
adminRouter.post('/UpdateDataofComplaint',(req, res)=>{
    const attendantComment = req.body.attendantComment
    const complaintId = req.body.id
    db.query(`UPDATE complaint SET attendant_comment = ? WHERE complaint.id = ?`,[attendantComment,complaintId],((err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    res.send(result)
                }
            }))
})

adminRouter.post('/InsertDataofComplaint',(req, res)=>{
    const storeId = req.body.storeId
    const topic = req.body.topic
    const adminId = req.body.adminId
    const topicDetial = req.body.topicDetial
    const dateACT = req.body.dateACT
    const date = req.body.date
    const time = req.body.time
    const complaintNumber = req.body.complaintNumber
    const action = req.body.action
    db.query(`INSERT INTO complaint (topic,topic_detial,action,complaint_number,store_id,admin_id,date,time,date_write) VALUE(?,?,?,?,?,?,?,?,?)`
    ,[topic,topicDetial,action,complaintNumber,storeId,adminId,dateACT,time,date],((err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    res.send(result)
                }
            }))
})
adminRouter.post('/getDataAnnounList',(req, res)=>{
    const yeartoday = req.body.yeartoday
    db.query(`SELECT * FROM announce WHERE year(date) = ?`,[yeartoday],((err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    res.send(result)
                }
            }))
})
adminRouter.get('/getAdminAll',(req, res)=>{
    const yeartoday = req.body.yeartoday
    db.query(`SELECT admin.* FROM (admin INNER JOIN role ON admin.id_role = role.id) 
    WHERE role.role != 'เจ้าหน้าที่บริหารงานทั่วไป' AND role.role != 'ผู้ดูแล'`,[yeartoday],((err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    res.send(result)
                }
            }))
})
adminRouter.post('/getInfoAdmin',(req, res)=>{
    const adminId = req.body.adminId
    db.query(`SELECT * FROM (admin INNER JOIN role ON admin.id_role = role.id) 
    WHERE admin.id = ?`,[adminId],((err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    res.send(result)
                }
            }))
})
module.exports = adminRouter