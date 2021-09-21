const express = require('express')
const bodyParser = require('body-parser')
const appRouter = express.Router()
const bcrypt = require('bcrypt')
const cors = require("cors")
const session = require('express-session')
const saltRounds = 10;
const path = require('path')
let fs = require('fs');
const multer = require('multer')


appRouter.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET', 'POST'],
    credentials:true
}));

appRouter.use(express.static(path.join(__dirname, './public/images/')));

const userStorage = multer.diskStorage({
    destination: (req , file, cb) =>{
        cb(null, './public/images/userUploaded/');
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: userStorage})

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


appRouter.use(bodyParser.urlencoded({
    extended: true
}))
appRouter.use(bodyParser.json());

//----------------------------------------------------------------------------------------------------------------------------------------------------------//
appRouter.post('/udateWithFoodMenu', upload.single('file'), (req, res)=>{
    if (req.file == undefined) {
        res.send({message:'Error: No File Selected!'})
    } else {
        fs.unlink('./public/images/userUploaded/'+req.body.oldFile, function(err){
            if (err) {
                throw err;
            }
        })
        const image =  req.file.filename
        const food_id = req.body.foodId
        const foodName = req.body.foodName
        const foodType = req.body.foodType
        const foodPrice = req.body.foodPrice
        db.query('UPDATE food_menu SET food_name=?, food_type=?, food_price=?, food_img=? WHERE id=?',[foodName,foodType,foodPrice,image,food_id],async(err)=>{
            if (err) {
                console.log(err);
                res.send({err:err});
            } else {
                res.send({message:"good",})
                
            }
        })
    }       
       
})

appRouter.post('/udateWithoutFoodMenu', (req, res)=>{
        const food_id = req.body.foodId
        const foodName = req.body.foodName
        const foodType = req.body.foodType
        const foodPrice = req.body.foodPrice
        console.log(food_id)
        db.query('UPDATE food_menu SET food_name=?, food_type=?, food_price=? WHERE id=?',[foodName,foodType,foodPrice,food_id],async(err)=>{
            if (err) {
                console.log(err);
                res.send({err:err});
            } else {
                res.send({message:"good",})             
            }
        })           
})

appRouter.post('/UpdateAddMenu_Mix',(req,res)=>{
    console.log(req.body.foodId);
    const specialOptionDisplayValues = req.body.specialOptionDisplayValues
    const storefreebiesDisplayValues = req.body.freebiesDisplayValues
    const food_id = req.body.foodId
    console.log(food_id);
    db.query('DELETE FROM food_and_option_mix WHERE food_id=?',[food_id],async(err)=>{
        if (err) {
            console.log(err);
        } else {
            await storefreebiesDisplayValues.forEach(element => {
                console.log(food_id);
               db.query(`INSERT INTO food_and_option_mix (food_id,option_id) 
               VALUES(?,?)`,[food_id,element.id],(err)=>{
                   if (err) {
                       console.log(err);
                   }
               }) 
            }
        )
        }
        
    })
    db.query('DELETE FROM food_and_special_option_mix WHERE food_id=?',[food_id],async(err)=>{
        if (err) {
            console.log(err);
        } else {
          await specialOptionDisplayValues.forEach(element => {
            db.query(`INSERT INTO food_and_special_option_mix (food_id,special_option_id) 
            VALUES(?,?)`,[food_id,element.id],(err)=>{
                if (err) {
                    console.log(err);
                }
            }) 
         }
     )
        }
    }
    )     
    res.send({message:'แก้ไข้เรียบร้อย'});
})

appRouter.post('/AddFoodMenu', upload.single('file'), (req, res)=>{
    if (req.file == undefined) {
        res.send({err:'Error: No File Selected!'})
    } else {
        console.log(req.body.id);
        const image =  req.file.filename
        const id =  req.body.id
        const store_id = req.body.storeId
        const foodName = req.body.foodName
        const foodType = req.body.foodType
        const foodPrice = req.body.foodPrice
        db.query('INSERT INTO food_menu (id,store_id,food_name,food_type,food_price,food_img) VALUES(?,?,?,?,?,?)',[id,store_id,foodName,foodType,foodPrice,image],async(err)=>{
            if (err) {
                console.log(err);
                res.send({err:err});
            } else {

                res.send({message:"good",})
                
            }
        })
    }       
       
})
appRouter.post('/addMenu_Mix',async(req,res)=>{
    console.log(req.body.id);
    const id =  req.body.id
    const specialOptionDisplayValues = req.body.specialOptionDisplayValues
    const storefreebiesDisplayValues = req.body.freebiesDisplayValues
          await  storefreebiesDisplayValues.forEach(element => {
               db.query(`INSERT INTO food_and_option_mix (food_id,option_id) 
               VALUES(?,?)`,[id,element.id],(err)=>{
                   if (err) {
                       console.log(err);
                   }
               }) 
            }
        )
       await specialOptionDisplayValues.forEach(element => {
            db.query(`INSERT INTO food_and_special_option_mix (food_id,special_option_id) 
            VALUES(?,?)`,[id,element.id],(err)=>{
                if (err) {
                    console.log(err);
                }
            }) 
         }
     )  
    res.send({message:'เพิ่มเรียบร้อย'});
})
appRouter.post('/getFoodMenuList',(req,res)=>{
    const store_id = req.body.storeId
    db.query('SELECT * FROM food_menu WHERE store_id = ?',[store_id],(err,result)=>{
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})
appRouter.post('/addOption',(req,res)=>{
    const store_id = req.body.storeId
    const optionName = req.body.optionName
    db.query('INSERT INTO food_option (store_id,option_name) VALUES(?,?)',[store_id,optionName],(err)=>{
        if (err) {
            res.send({err:err});
        } else {
            res.send({message:'เพิ่มเรียบร้อย'});
        }
    })
})
appRouter.post('/deleteSpOption',(req,res)=>{
    const sOption = req.body.sOption
    db.query(`DELETE food_special_option.*,food_and_special_option_mix.*
    FROM food_special_option
    INNER JOIN food_and_special_option_mix ON food_special_option.id = food_and_special_option_mix.special_option_id
    WHERE food_special_option.id = ?`,[sOption],(err)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send({message:'เพิ่มเรียบร้อย'});
        }
    })
})
appRouter.post('/deleteNOption',(req,res)=>{
    const nOption = req.body.nOption
    db.query(`DELETE food_option.*,food_and_option_mix.*
    FROM food_option
    INNER JOIN food_and_option_mix ON food_option.id = food_and_option_mix.option_id
    WHERE food_option.id = ?`,[nOption],(err)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send({message:'เพิ่มเรียบร้อย'});
        }
    })
})

appRouter.post('/addSpecialOption',(req,res)=>{
    const store_id = req.body.storeId
    const optionName = req.body.optionName
    const price = req.body.optionprice
    db.query('INSERT INTO food_special_option (store_id,special_option_name,price) VALUES(?,?,?)',[store_id,optionName,price],(err)=>{
        if (err) {
            res.send({err:err});
        } else {
            res.send({message:'เพิ่มเรียบร้อย'});
        }
    })
})

appRouter.post('/getOption',(req,res)=>{
    const store_id = req.body.storeId
    db.query('SELECT * FROM food_option WHERE store_id = ?',[store_id],(err,result)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send(result);
        }
    })
})
appRouter.post('/getSpecialOption',(req,res)=>{
    const store_id = req.body.storeId
    db.query('SELECT * FROM food_special_option WHERE store_id = ?',[store_id],(err,result)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send(result);
        }
    })
})
appRouter.post('/changStatus',(req,res)=>{
    const store_id = req.body.storeId
    const status = req.body.status
    db.query('UPDATE food_menu SET food_status = ? WHERE id = ?',[status,store_id],(err)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send({message:'เปลี่ยนเรียบร้อย'});
        }
    })
})

appRouter.post('/getLeaveList',(req,res)=>{
    const user_id = req.body.userId
    db.query(`SELECT leave_store.id AS leaveStoreId,leave_store.*
    FROM leave_store 
    WHERE leave_store.store_owner_id = ?`,[user_id],(err,result)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send(result);
        }
    })
})
appRouter.post('/InsertLeave',(req,res)=>{
    const ownerId = req.body.ownerId
    const title = req.body.title
    const detial = req.body.detial
    const dateFrom = req.body.dateFrom
    const dateTo = req.body.dateTo
    const dateWrite = req.body.dateWrite
    const status = req.body.status
    db.query(`INSERT INTO leave_store(store_owner_id,title_leave,datial,frome_date,to_date,date_write,status) VALUES(?,?,?,?,?,?,?)`,[ownerId,title,detial,dateFrom,dateTo,dateWrite,status],(err)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {

            res.send({message:'เพิ่มเรียบร้อย'});   
        }
    })
})
appRouter.post('/deleteLeaveList',(req,res)=>{
    const leaveId = req.body.leaveId
    db.query(`DELETE FROM leave_store WHERE id = ?`,[leaveId],(err)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send({message:'ลบเรียบร้อย'});
        }
    }
    )
}
)
appRouter.post('/deleteMenu',(req,res)=>{
    const menuId = req.body.menuId
    db.query(`DELETE FROM food_menu WHERE id = ?`,[menuId],(err)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            db.query('DELETE FROM food_and_special_option_mix WHERE food_id=?',[menuId],(err)=>{
                if (err) {
                    console.log(err);
                } else {
                  db.query('DELETE FROM food_and_option_mix WHERE food_id=?',[menuId],async(err)=>{
                        if (err) {
                            console.log(err);
                        } else {
                            res.send({message:'ลบเรียบร้อย'});
                        }
                        
                    })
                }
            }
            ) 
        }
    }
    )
}
)
appRouter.post('/getCleaneseLevelList',(req,res)=>{
    const storeId = req.body.storeId
    db.query(`SELECT cleanliness_level.*, SUM(cleanliness_level_detial.point) AS point FROM cleanliness_level
    INNER JOIN cleanliness_level_detial ON cleanliness_level_detial.cleanliness_level_id = cleanliness_level.id WHERE store_id = ?
    GROUP BY (cleanliness_level.id)`,[storeId],(err,results)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {

            res.send(results);   
        }
    })
})
appRouter.post('/getCleaneseLevelListDetial',(req,res)=>{
    const CleansId = req.body.Cleaneseid
    db.query(`SELECT cleanliness_level_detial.point AS point,cleanliness_topic.detial AS topic, cleanliness_topic.id AS title
    FROM cleanliness_level_detial 
    INNER JOIN cleanliness_topic ON cleanliness_level_detial.topic_id = cleanliness_topic.id 
    WHERE cleanliness_level_detial.cleanliness_level_id = ?`,[CleansId],(err,results)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {

            res.send(results);   
        }
    })
})
appRouter.post('/ComplaintList',(req,res)=>{
    const storeId = req.body.storeId
    db.query(`SELECT * FROM complaint WHERE store_id = ?`,[storeId],(err,results)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {

            res.send(results);   
        }
    })
})

appRouter.get('/getFoodMenuListCustomer',(req,res)=>{
    const store_id = req.body.storeId
    db.query('SELECT * FROM food_menu',[store_id],(err,result)=>{
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})
module.exports = appRouter
