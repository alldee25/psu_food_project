const express = require('express')
const bodyParser = require('body-parser')
const appRouter = express.Router()
const bcrypt = require('bcrypt')
const cors = require("cors")
const session = require('express-session')
const saltRounds = 10;
const path = require('path')
let fs = require('fs');
appRouter.use(express.static(path.join(__dirname, './public/images/')));

const multer = require('multer')
const userStorage = multer.diskStorage({
    destination: (req , file, cb) =>{
        cb(null, './public/images/userUploaded/');
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
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
appRouter.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET', 'POST'],
    credentials:true
}));

appRouter.use(bodyParser.urlencoded({
    extended: true
}))
appRouter.use(bodyParser.json());

//----------------------------------------------------------------------------------------------------------------------------------------------------------//
appRouter.post('/uploadFoodImage', upload.single('file'), (req, res)=>{
    if (req.file == undefined) {
        res.send({msg:'Error: No File Selected!'})
    } else {
        const image =  req.file.filename
        const id = req.body.id
        if (req.body.oldFile && req.file !== undefined) {
        console.log('non');
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
appRouter.post('/getFoodMenuList',(req,res)=>{
    const store_id = req.body.store_id
    db.query('SELECT * FROM food_menu WHERE store_id = ?',[store_id],(err,result)=>{
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})
module.exports = appRouter
