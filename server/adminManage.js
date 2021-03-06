const express = require('express')
const bodyParser = require('body-parser')
const adminRouter = express.Router()
const bcrypt = require('bcrypt')
const cors = require("cors")
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');
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
    limits:{fileSize: 10000000},
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
adminRouter.post('/UploadeImageAdvi', upload.single('file'), (req, res)=>{
    if (req.file == undefined) {
        res.send({msg:'Error: No File Selected!'})
    } else {
        const image =  req.file.filename
        const AdminId = req.body.AdminId
        const date = req.body.date
        db.query(`INSERT INTO img_advert (img,admin_id,date) VALUES(?,?,?)`,[image,AdminId,date],(err)=>{
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                res.send('upload success')
            }
        })
    }     
       
})

adminRouter.post("/deleteImageAdvi",(req,res)=>{//???????????????????????????????????????????????????
    const id = req.body.id
    fs.unlink('./public/images/adminUploaded/'+req.body.oldFile, function(err){
        if (err) {
            throw err;
        }else{ 
          db.query("DELETE FROM img_advert WHERE id=?",[id],
    (err) => {
        if(err){
            console.log(err);
        }else{
            res.send('Success for insert')
        }
    })  
       }
    }) 
})
adminRouter.post("/insert",(req,res)=>{//???????????????????????????????????????????????????
    const title = req.body.title
    const content = req.body.content 
    const date = req.body.Date 
    const type = req.body.type 
    db.query("INSERT INTO announce (Title,Content,date,type) VALUE (?,?,?,?)",[title,content,date,type],
    (err) => {
        if(err){
            console.log(err);
        }else{
            res.send('Success for insert')
        }
    })
})
adminRouter.post("/updateAnnoun",(req,res)=>{//???????????????????????????????????????????????????
    const title = req.body.title
    const content = req.body.content 
    const date = req.body.Date 
    const type = req.body.type 
    const id = req.body.id 
    db.query("UPDATE announce SET Title=?,Content=?,date=?,type=? WHERE id = ?",[title,content,date,type,id],
    (err) => {
        if(err){
            console.log(err);
        }else{
            res.send('Success for insert')
        }
    })
})

adminRouter.get("/get",(req,res)=>{//?????????????????????????????????????????????
    db.query("SELECT * FROM announce",((err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }))
})
adminRouter.post("/UpdateStatusRegis",(req,res)=>{//?????????????????????????????????????????????
    const regisStatus = req.body.regisStatus
    db.query("UPDATE status SET status = ? WHERE status_name = ?",[regisStatus,'regis_status'],((err)=>{
        if(err){
            console.log(err);
            res.send({err:err});
        }else{
            res.send({message:'Ok'});
        }
    }))
})
adminRouter.get("/getRegisStatus",(req,res)=>{
    db.query("SELECT status FROM status WHERE status_name = ?",['regis_status'],((err,result)=>{
        if(err){
            console.log(err);
            res.send({err:err});
        }else{
            res.send(result);
        }
    }))
})

adminRouter.post("/delete",(req,res)=>{//???????????????????????????????????????
    const id = req.body.id;
    db.query("DELETE FROM announce WHERE id=?",[id],(err) => {
        if(err){
            console.log(err);
        }else{
            res.send('Success for delete')
        }
    })
})

adminRouter.post("/getStoreApplicationsList",(req, res) => {//??????????????????????????????????????????????????????????????????
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
adminRouter.post("/getStoreInterViewList",(req, res) => {//?????????????????????????????????????????????????????????????????????????????????
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
                WHERE year(date_regis) = ? AND regisstore.status = ?`,[date,'??????????????????????????????'],((err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }))
})

adminRouter.post("/getStoreApplicationsDetial",(req, res) => {//??????????????????????????????????????????????????????????????????????????????
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

adminRouter.post("/getMenuList",(req, res) => {//???????????????????????????????????????????????????????????????????????????????????????????????????
    const id = req.body.id;
    db.query("SELECT * FROM menustore WHERE idstore=?",[id],((err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }))
})

adminRouter.get("/getYears",(req,res)=>{//????????????????????????????????????????????????????????????????????????????????????????????????
    db.query("SELECT year(date_regis) AS Year FROM regisstore",((err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }))
})

adminRouter.post('/CheckApplication',(req, res)=>{//??????????????????????????????????????????????????????????????????????????????
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
                            res.send('??????????????????????????????????????????')
                        }
                    }))                                           
                    
                }
            
            })
        }
    })) 
})
adminRouter.post("/getInterViewDetial",(req,res)=>{//???????????????????????????????????????????????????????????????????????????????????????????????????????????????
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
adminRouter.post("/getChectpoint",(req,res)=>{//???????????????????????????????????????????????????????????????????????????????????????????????????????????????
    const idCard = req.body.idCard
    db.query(`SELECT regisstore.status,regisstore.name,regisstore.lastname,regisstore.store_name,applicationcheck_detial.*,board_opinion.*,location.location,type.store_type,store.right_status,store.id AS store_id 
    FROM regisstore 
    LEFT JOIN applicationcheck ON applicationcheck.regis_id = regisstore.id 
    LEFT JOIN applicationcheck_detial ON applicationcheck_detial.applicationcheck_id = applicationcheck.id 
    LEFT JOIN interview ON interview.regis_id = regisstore.id LEFT JOIN interview_detial ON interview_detial.interview_id = interview.id 
    LEFT JOIN board_opinion ON board_opinion.interview_id = interview.id 
    LEFT JOIN location ON board_opinion.location_id = location.id 
    LEFT JOIN store ON store.regis_id = regisstore.id 
    LEFT JOIN type ON type.id = board_opinion.type_id WHERE idcard = ?`,[idCard],((err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }))
})
adminRouter.post("/getInterViewDetialForSee",(req,res)=>{//???????????????????????????????????????????????????????????????????????????????????????????????????????????????
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
adminRouter.post("/getInterViewDetialForSeeBoardlocationAdnType",(req,res)=>{//???????????????????????????????????????????????????????????????????????????????????????????????????????????????
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
adminRouter.post("/insertInterview",(req,res)=>{//???????????????????????????????????????????????????????????????????????????????????????
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
    const storeLock = req.body.storeLock
    if (sum>=80 && bordOpenion) {
        db.query(`INSERT INTO store (regis_id,store_name,location_id,type_id,type1_id,promosion,log_id) VALUES (?,?,?,?,?,?,?)`,
        [regisId,dataInterViewList[0].store_name,dataInterViewList[0].id_locations,dataInterViewList[0].id_type,dataInterViewList[0].id_type1,dataInterViewList[0].promosion,storeLock],((err)=>{
            if (err) {
                console.log(err);
            }
            else{ 
                bcrypt.hash(String(dataInterViewList[0].idcard), saltRounds, (err, hash) => {
                    console.log(dataInterViewList[0].img);
                    if (err) {
                        console.log(err);
                    } else {
                        db.query(`INSERT INTO store_owner (store_id,name,lastname,gender,dob,race,nationality,religion,idcard,idstart,idend,adress,phone,email,img,password) 
                        VALUES ((SELECT id FROM store WHERE regis_id=?),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
                        dataInterViewList[0].img,                                       
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
                                    db.query(`UPDATE store_lock SET status=? WHERE id=?`,['?????????????????????',storeLock],(err)=>{
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            res.send('Good Bye')
                                        }
                                    })
                                    
                                }
                            }))
                        }
                }))                                                        
        }
    }))    
})
adminRouter.post("/UpdateRightStatus",(req,res)=>{//??????????????????????????????????????????????????????
    const idCard = req.body.idCard
    const rightStatus = req.body.rightStatus
    if (rightStatus=='??????????????????') {
        db.query(`UPDATE store SET right_status=?`,[rightStatus],((err)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send({message:'?????????????????????????????????????????????'})
        }
    }))
    } else {
        db.query(`DELETE store.*,store_owner.* 
        FROM store INNER JOIN store_owner 
        ON store_owner.store_id = store.id 
        WHERE store_owner.idcard = ?`,[idCard],((err)=>{
            if(err){
                console.log(err);
            }
            else{
                db.query(`UPDATE regisstore SET status=?`,['??????????????????'],(err)=>{
                    if (err) {
                        console.log(err);
                    } else {
                        db.query(`UPDATE store_lock
                            INNER JOIN store_owner ON store_owner.idcard=?
                            INNER JOIN store ON store.id = store_owner.store_id
                            SET store_lock.status=''
                            WHERE store_lock.id = store.log_id
                            `,[idCard],(err)=>{
                                if (err) {
                                    res.send(err)
                                    console.log(err);
                                } else {
                                 res.send({message:'?????????????????????????????????????????????'})
                                }
                            })
                        
                    }
                })              
            }
        })) 
    }
                  
})
adminRouter.post("/getStoreList",(req,res)=>{
    db.query(`SELECT store.*,store.id AS s_id, store_owner.*,location.location 
        FROM store 
        INNER JOIN store_owner ON store_owner.store_id = store.id 
        INNER JOIN location ON location.id = store.location_id`,((err,result)=>{
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
adminRouter.post("/getlock",(req,res)=>{
    const idLocation = req.body.idLocation
    db.query(`SELECT * 
            FROM store_lock 
            WHERE store_lock.location_id = ? AND store_lock.status != '?????????????????????'`,[idLocation],((err,result)=>{
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
adminRouter.post("/getStoreMenuList",(req, res) => {//???????????????????????????????????????????????????????????????????????????????????????????????????
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
adminRouter.get("/getDetialList",(req, res) => {//????????????????????????????????????????????????????????????????????????????????????
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
    db.query(`SELECT store.store_name,store.id AS s_id,cleanliness_level.*,admin.name,SUM(cleanliness_level_detial.point) AS point
    FROM ((store 
    LEFT JOIN cleanliness_level ON cleanliness_level.store_id = store.id AND year(cleanliness_level.date) = ? AND month(cleanliness_level.date) = ?)
    LEFT JOIN admin ON admin.id = cleanliness_level.admin_id)
    LEFT JOIN cleanliness_level_detial ON cleanliness_level_detial.cleanliness_level_id = cleanliness_level.id
    WHERE store.right_status = '??????????????????'
    GROUP BY store.id`,[year,month],((err, result)=>{
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
            INNER JOIN store_owner ON store_owner.store_id = store.id)
            WHERE store.right_status = '??????????????????'`,((err, result)=>{
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
    db.query(`SELECT store_owner.name,store.log_id,location.location
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
    const storeId = '??????????????????????????????????????????????????????????????????????????????'
    db.query(`SELECT role.role, admin.* FROM (role INNER JOIN admin ON admin.id_role = role.id) WHERE role.role = ?`,[storeId],((err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    res.send(result)
                }
            }))
})
adminRouter.get('/getAdminInfoAttendant',(req, res)=>{
    const storeId = '?????????????????????'
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
    db.query(`SELECT * FROM announce WHERE year(date) = ? AND type = 'general'`,[yeartoday],((err, result)=>{
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
    WHERE role.role != '??????????????????????????????????????????????????????????????????????????????' AND role.role != '?????????????????????'`,[yeartoday],((err, result)=>{
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
adminRouter.post('/getStoreListLeave',(req, res)=>{
    const ThisYears = req.body.ThisYears
    db.query(`SELECT leave_store.id AS leaveStoreId,leave_store.*,store.*,store_owner.*,leave_store.status AS lfs
    FROM leave_store
    INNER JOIN store_owner ON store_owner.id = leave_store.store_owner_id 
    INNER JOIN store ON store.id = store_owner.store_id
    WHERE YEAR(leave_store.date_write) = ? AND store.right_status = '??????????????????'`,[ThisYears],((err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    res.send(result)
                }
            }))
})
adminRouter.post('/getStoreListLeaveDetial',(req, res)=>{
    const leaveId = req.body.leaveId
    db.query(`SELECT leave_store.id AS leaveStoreId,leave_store.*,store.*,store_owner.*,location.location,leave_store.status AS STATUS 
    FROM leave_store
    INNER JOIN store_owner ON store_owner.id = leave_store.store_owner_id 
    INNER JOIN store ON store.id = store_owner.store_id
    INNER JOIN location ON location.id = store.location_id
    WHERE leave_store.id = ?`,[leaveId],((err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    res.send(result)
                }
            }))
})

adminRouter.post('/InsertStoreListLeaveDetialAdmin1',(req, res)=>{

    const leaveId = req.body.leaveId
    const admimId = req.body.admimId
    const attendantComment = req.body.attendantComment
    const status = req.body.status
        db.query(`UPDATE leave_store SET admin_id=?, admin_opinion=?, status = ?
            WHERE id = ?`,[admimId,attendantComment,status,leaveId],((err)=>{
                if (err) {
                    console.log(err);
                    res.send({err:err})
                } else {
                    res.send({message:'???????????????????????????'}) 
                }
            }
        )
    )
})
adminRouter.post('/InsertStoreListLeaveDetialAdmin2',(req, res)=>{
    const admimId = req.body.admimId
    const attendantComment1 = req.body.attendantComment1
    const leaveId = req.body.leaveId
    db.query('UPDATE leave_store SET admin_id1=?, admin_opinion1=? WHERE id=?',[admimId,attendantComment1,leaveId],(err)=>{
        if (err) {
            console.log(err);
            res.send({err:err})
        } else {
         res.send({message:'???????????????????????????'})   
        }
    })
})
adminRouter.post('/insertRen',(req, res)=>{
    const adminId = req.body.adminId
    const sroreId = req.body.sroreId
    const date = req.body.date
    const price = req.body.price
    db.query('INSERT INTO rent_fel (store_id,admin_id,date,price) VALUES(?,?,?,?)',[sroreId,adminId,date,price],(err)=>{
        if (err) {
            console.log(err);
            res.send({err:err})
        } else {
         res.send({message:'???????????????????????????'})   
        }
    })
})
adminRouter.post("/getRenListByYearAndMonth",(req, res) => {
    const year = req.body.yearToday
    const month = req.body.month
    db.query(`SELECT store.store_name,store.id AS s_id,rent_fel.*,admin.name 
    FROM ((store 
    LEFT JOIN rent_fel ON rent_fel.store_id = store.id AND year(rent_fel.date) = ? AND month(rent_fel.date) = ?)
    LEFT JOIN admin ON admin.id = rent_fel.admin_id)
    WHERE store.right_status = '??????????????????'`,[year,month],((err, result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result)
        }
    })
    )
})
adminRouter.post('/insertStatusRen',(req, res)=>{
    const status = req.body.status
    const sroreId = req.body.sroreId
    const datePay = req.body.datePay
    db.query('UPDATE rent_fel SET status=?,date_pay=? WHERE store_id=?',[status,datePay,sroreId],(err)=>{
        if (err) {
            console.log(err);
            res.send({err:err})
        } else {
         res.send({message:'???????????????????????????'})   
        }
    })
})
adminRouter.get("/getYearsOfRen",(req, res) => {
    db.query(`SELECT year(date) AS Year FROM rent_fel`,((err, result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result)
        }
    }))
})  
  
adminRouter.post("/getDachboardInfomation",(req, res) => {
    const date = req.body.date
    db.query(`SELECT MAX(MaxOrder) AS quantity,food_name,orderToday 
    FROM (SELECT food_menu.food_name AS food_name,SUM(order_food_detial.quantity) AS MaxOrder,(SELECT SUM(order_food_detial.quantity) FROM order_food_detial
    INNER JOIN food_menu ON food_menu.id = order_food_detial.food_id
    INNER JOIN order_food ON order_food.id = order_food_detial.order_food_id
    WHERE date(order_food.date) = ?) AS orderToday
    FROM order_food_detial 
    INNER JOIN food_menu ON food_menu.id = order_food_detial.food_id
    INNER JOIN order_food ON order_food.id = order_food_detial.order_food_id
    GROUP BY food_menu.food_name) MaxOrder`,[date,date],((err, result)=>{
        if(err){
            console.log(err);
            res.send({err:err})
        }
        else{
            res.send({sum:result[0].orderToday,menuPop:result[0].food_name,numMenuPop:result[0].quantity})
        }
    }))
}) 
adminRouter.get("/getDataChart",(req, res) => {
    db.query(`SELECT SUM(order_food_detial.quantity) AS quantity ,MONTH(order_food.date) month
    FROM order_food_detial 
    INNER JOIN order_food ON order_food.id = order_food_detial.order_food_id 
    GROUP BY MONTH(order_food.date)`,((err, result)=>{
        if(err){
            console.log(err);
            res.send({err:err})
        }
        else{
            res.send(result)
        }
    }))
})
adminRouter.post("/getFoodMenuListByAdmin",(req, res) => {
    storeId = req.body.storeId
    db.query(`SELECT food_menu.* FROM food_menu WHERE food_menu.store_id = ?`,[storeId],((err, result)=>{
        if(err){
            console.log(err);
            res.send({err:err})
        }
        else{
            res.send(result)
        }
    }))
})

adminRouter.post("/getLeaveByprecess",(req, res) => {
    storeId = req.body.storeId
    db.query(`SELECT leave_store.status AS SUMnoti,leave_store.store_owner_id,store_owner.name,store_owner.lastname,store.store_name
    FROM leave_store 
    INNER JOIN store_owner ON store_owner.id = leave_store.store_owner_id
    INNER JOIN store ON store.id = store_owner.store_id
    WHERE leave_store.status ='?????????????????????????????????'`,[storeId],((err, result)=>{
        if(err){
            console.log(err);
            res.send({err:err})
        }
        else{
            res.send(result)
        }
    }))
})
adminRouter.post("/deleteStore",(req, res) => {
    const storeId = req.body.storeId
    db.query(`DELETE *
    FROM store 
    INNER JOIN store_owner ON store_owner.store_id = store.id
    INNER JOIN food_menu ON food_menu.store_id = store.id
    INNER JOIN food_option ON food_option.store_id = store.id
    INNER JOIN food_special_option ON food_special_option.store_id = store.id
    WHERE store.id = ?`,[storeId],((err)=>{
        if(err){
            console.log(err);
            res.send({err:err})
        }
        else{
            db.query(`UPDATE store_lock
            INNER JOIN store ON store.log_id = store_lock.id
            SET store_lock.status='?????????????????????'
            WHERE store.id = ?
                `,[storeId],(err)=>{
                    if (err) {
                        res.send({err:err})
                        console.log(err);
                    } else {
                    res.send('Deleted') 
                    }
                })       
        }
    }))
})
adminRouter.get("/getAdviList",(req, res) => {
    db.query(`SELECT img_advert.*,admin.name AS name, admin.lastname AS lastname
         FROM img_advert
        INNER JOIN admin ON admin.id = img_advert.admin_id
    `,((err, result)=>{
        if(err){
            console.log(err);
            res.send({err:err})
        }
        else{
            res.send(result)
        }
    }))
})
adminRouter.post("/insertScholarship",(req, res) => {
    studentNumber = req.body.studentNumber
    dateEnd = req.body.dateEnd
    date = req.body.date
    type = req.body.type
    name = req.body.name
    adminId = req.body.adminId
    db.query(`INSERT INTO scholarship (scholarship_name, type,admin_id, date, date_end, number_student) VALUES(?,?,?,?,?,?)`,
    [name, type, adminId, date, dateEnd, studentNumber],((err)=>{
        if(err){
            console.log(err);
            res.send({err:err})
        }
        else{
            res.send('???????????????????????????')
        }
    }))
})
adminRouter.post("/getSchohalarList",(req, res) => {
    yearToday = req.body.yearToday
    db.query(`SELECT * FROM scholarship WHERE YEAR(date)`,
    [yearToday],((err,result)=>{
        if(err){
            console.log(err);
            res.send({err:err})
        }
        else{
            res.send(result)
        }
    }))
})
adminRouter.get("/getYearsOfSchohalar",(req, res) => {
    db.query(`SELECT YEAR(date) AS YEAR FROM scholarship`,((err,result)=>{
        if(err){
            console.log(err);
            res.send({err:err})
        }
        else{
            res.send(result)
        }
    }))
})
adminRouter.post("/getStudentScholarship",(req, res) => {
    id = req.body.id
    db.query(`SELECT student_scholarship.*,student_scholarship.id AS sch_id,admin.name AS ad_name,admin.lastname AS ad_lastname,student.name,student.lastname,student.id 
    FROM student_scholarship 
    INNER JOIN student ON student.id = student_scholarship.student_id 
    INNER JOIN admin ON admin.id = student_scholarship.admin_id 
    WHERE student_scholarship.scholarship_id = ?`,
    [id],((err,result)=>{
        if(err){
            console.log(err);
            res.send({err:err})
        }
        else{
            res.send(result)
        }
    }))
})
adminRouter.get("/getSchohalarList",(req, res) => {
    db.query(`SELECT *  FROM scholarship`,((err,result)=>{
        if(err){
            console.log(err);
            res.send({err:err})
        }
        else{
            res.send(result)
        }
    }))
})
adminRouter.get("/getStudentList",(req, res) => {
    db.query(`SELECT student.*
    FROM student 
    INNER JOIN student_scholarship ON student_scholarship.student_id != student.id`,((err,result)=>{
        if(err){
            console.log(err);
            res.send({err:err})
        }
        else{
            res.send(result)
        }
    }))
})
adminRouter.post("/insertStudenScholarships",(req, res) => {

    const scholarshipId = req.body.scholarshipId
    const adminId = req.body.adminId
    const studentId = req.body.studentId
    const date = req.body.date    

    db.query(`INSERT INTO student_scholarship (scholarship_id,admin_id,student_id,date) VALUES(?,?,?,?)`,
    [scholarshipId,adminId,studentId,date],
    ((err)=>{
        if(err){
            console.log(err);
            res.send({err:err})
        }
        else{
            res.send('???????????????????????????')
        }
    }))
})
adminRouter.post("/deleteStudentSch",(req, res) => {
    const id = req.body.id
    db.query(`DELETE student_scholarship.* FROM student_scholarship WHERE id = ?`,
    [id],
    ((err)=>{
        if(err){
            console.log(err);
            res.send({err:err})
        }
        else{
            res.send('???????????????????????????')
        }
    }))
})
adminRouter.post("/getDetialListInfo",(req, res) => {
    const storeId = req.body.storeId
    const cleanId = req.body.cleanId
    db.query(`SELECT cleanliness_topic.*,cleanliness_level_detial.*,cleanliness_topic.id AS topic,cleanliness_topic.detial AS topic_detial
    FROM cleanliness_level 
    INNER JOIN cleanliness_level_detial ON cleanliness_level_detial.cleanliness_level_id = cleanliness_level.id 
    INNER JOIN cleanliness_topic ON cleanliness_topic.id = cleanliness_level_detial.topic_id 
    WHERE cleanliness_level.store_id = ? AND cleanliness_level.id = ?`,
    [storeId,cleanId],
    ((err,result)=>{
        if(err){
            console.log(err);
            res.send({err:err})
        }
        else{
            res.send(result)
        }
    }))
})
adminRouter.post('/getDetialClean',(req,res)=>{
    const storeId = req.body.storeId
    const cleanId = req.body.cleanId
    db.query(`SELECT store_owner.name,store.store_name,store.id ,cleanliness_level.date,cleanliness_level.time,cleanliness_level.feedback,location.location,type.store_type
    FROM store 
    INNER JOIN store_owner ON store_owner.store_id = store.id 
    INNER JOIN cleanliness_level ON cleanliness_level.store_id = store.id 
    INNER JOIN location ON location.id = store.location_id
    INNER JOIN type ON type.id = store.type_id
    WHERE store.id = ? AND cleanliness_level.id = ?`,[storeId,cleanId],((err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    res.send(result)
                }
            }))
})
adminRouter.post('/getRenInfo',(req,res)=>{
    const RenId = req.body.RenId
    db.query(`SELECT rent_fel.* FROM rent_fel WHERE id=?`,[RenId],((err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    res.send(result)
                }
    }))
})
adminRouter.get('/getScholarshipsList',(req,res)=>{
    db.query(`SELECT scholarship.* FROM scholarship WHERE type='??????????????????????????????????????????' `,((err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    res.send(result)
                }
    }))
})
adminRouter.post('/getTableList',(req,res)=>{
    const ScholarshipsId = req.body.ScholarshipsId
    db.query(`SELECT table_work.* ,admin.name,admin.lastname
    FROM table_work 
    INNER JOIN admin ON admin.id = table_work.admin_id
    WHERE table_work.scholarship_id=?`,[ScholarshipsId],((err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    res.send(result)
                }
    }))
})
adminRouter.post('/getFilterDate',(req,res)=>{
    const ScholarshipsId = req.body.ScholarshipsId
    db.query(`SELECT MAX(table_work.date_work) AS date_work
    FROM table_work 
    INNER JOIN admin ON admin.id = table_work.admin_id
    WHERE table_work.scholarship_id=?`,[ScholarshipsId],((err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    res.send(result)
                }
    }))
})
adminRouter.post('/insertDataTableWork',(req,res)=>{
    
    const tableWorkId = req.body.tableWorkId
    const rage = req.body.rage
    const dateInput = req.body.dateInput
    const scholarshipId = req.body.scholarshipId
    const dateStart = req.body.dateStart
    const dateEnd = req.body.dateEnd
    const date = req.body.date
    const adminId = req.body.adminId
    const state = req.body.state
    db.query(`INSERT INTO table_work (id,admin_id,date_start,date_end,date_work,scholarship_id,date) VALUES(?,?,?,?,?,?,?)`,
    [tableWorkId,adminId,dateInput,dateStart,dateEnd,scholarshipId,date],async(err)=>{
                if (err) {
                    console.log(err);
                    res.send({err:err})
                } else {
                const promises = state.map((data)=> {
                      db.query(`INSERT INTO table_work_detial (id,table_work_id,store_id) VALUES(?,?,?)`,[data.id,tableWorkId,data.sid],((err)=>{
                          if (err) {
                              console.log(err);
                              res.send({err:err})
                          } else {
                              rage.map((dataRage) => {
                                  db.query('INSERT INTO table_rage (table_work_detial_id,rage_name) VALUES(?,?)',[data.id,dataRage],((err) => {
                                      if (err) {
                                          console.log(err);
                                      }
                                  }))
                              })
                              
                          }
                      }))  
                    })
                   await Promise.all(promises) 
                   res.send('???????????????????????????')
                }
    })
})
adminRouter.post('/getStoreScListbyAdmin',(req,res)=>{
    const tableId = req.body.tableId
    db.query(`SELECT store.store_name,store.id
    FROM table_student_regis 
    RIGHT JOIN  table_rage ON table_rage.id = table_student_regis.table_rage_id
    INNER JOIN table_work_detial ON table_work_detial.id = table_rage.table_work_detial_id
    INNER JOIN table_work ON table_work.id = table_work_detial.table_work_id
    INNER JOIN store ON store.id = table_work_detial.store_id
    WHERE table_work.id = ?
    GROUP BY table_work_detial.store_id`,[tableId],(err,results)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send(results);   
        }
    })
})
adminRouter.post('/getWorkTableByAdmin',(req,res)=>{
    const tableId = req.body.tableId
    db.query(`SELECT table_rage.rage_name,store.store_name,store.id AS sid,table_rage.id
    FROM table_student_regis 
    RIGHT JOIN  table_rage ON table_rage.id = table_student_regis.table_rage_id
    INNER JOIN table_work_detial ON table_work_detial.id = table_rage.table_work_detial_id
    INNER JOIN table_work ON table_work.id = table_work_detial.table_work_id
    INNER JOIN store ON store.id = table_work_detial.store_id
    WHERE table_work.id = ?
   GROUP BY table_rage.id`,[tableId],(err,results)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send(results);   
        }
    })
})
adminRouter.post('/getWorkStudentTableByAdmin',(req,res)=>{
    const tableId = req.body.tableId
    db.query(`SELECT table_rage.id,student_scholarship.student_id,student.name,student.lastname
    FROM table_student_regis 
    RIGHT JOIN table_rage ON table_rage.id = table_student_regis.table_rage_id 
    INNER JOIN table_work_detial ON table_work_detial.id = table_rage.table_work_detial_id 
    INNER JOIN table_work ON table_work.id = table_work_detial.table_work_id 
    INNER JOIN store ON store.id = table_work_detial.store_id 
    INNER JOIN student_scholarship ON student_scholarship.student_id = table_student_regis.student_sc_id
    INNER JOIN student ON student.id = student_scholarship.student_id
    WHERE table_work.id = ?`,[tableId],(err,results)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send(results);   
        }
    })
})
adminRouter.post('/getStudentSCList',(req,res)=>{
    const ScholarshipsId = req.body.ScholarshipsId
    db.query(`SELECT student.id,student.name,student.lastname 
    FROM table_hour
    RIGHT JOIN table_student_regis ON table_hour.table_student_regis_id  = table_student_regis.id
    INNER JOIN table_rage ON table_rage.id = table_student_regis.table_rage_id
    INNER JOIN table_work_detial ON table_work_detial.id = table_rage.table_work_detial_id
    INNER JOIN table_work ON table_work.id = table_work_detial.table_work_id
    INNER JOIN scholarship ON scholarship.id = table_work.scholarship_id
    INNER JOIN student_scholarship ON student_scholarship.scholarship_id = scholarship.id
 	RIGHT JOIN student ON student_scholarship.student_id = student.id
    WHERE scholarship.id = ?
    GROUP BY student.id
    `,[ScholarshipsId],(err,results)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send(results);   
        }
    })
})
module.exports = adminRouter