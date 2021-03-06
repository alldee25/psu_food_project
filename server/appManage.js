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
    res.send({message:'?????????????????????????????????????????????'});
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
    res.send({message:'??????????????????????????????????????????'});
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
            res.send({message:'??????????????????????????????????????????'});
        }
    })
})
appRouter.post('/InsertPayment',(req,res)=>{
    const store_id = req.body.storeId
    const paymentName = req.body.paymentName
    db.query('INSERT INTO payment (store_id,payment_name) VALUES(?,?)',[store_id,paymentName],(err)=>{
        if (err) {
            res.send({err:err});
        } else {
            res.send({message:'??????????????????????????????????????????'});
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
            res.send({message:'??????????????????????????????????????????'});
        }
    })
})
appRouter.post('/deletePayment',(req,res)=>{
    const paymentId = req.body.paymentId
    db.query(`DELETE payment.* FROM payment WHERE id = ?`,[paymentId],(err)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send({message:'??????????????????????????????????????????'});
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
            res.send({message:'??????????????????????????????????????????'});
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
            res.send({message:'??????????????????????????????????????????'});
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
appRouter.post('/getPayment',(req,res)=>{
    const store_id = req.body.storeId
    db.query('SELECT * FROM payment WHERE store_id = ?',[store_id],(err,result)=>{
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
            res.send({message:'????????????????????????????????????????????????'});
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

            res.send({message:'??????????????????????????????????????????'});   
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
            res.send({message:'?????????????????????????????????'});
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
                  db.query('DELETE FROM food_and_option_mix WHERE food_id=?',[menuId],(err)=>{
                        if (err) {
                            console.log(err);
                        } else {
                            res.send({message:'?????????????????????????????????'});
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
    db.query(`SELECT food_menu.*,store.store_name,store.id AS sId,store.status AS s_status,leave_store.to_date,leave_store.frome_date
    FROM food_menu
    INNER JOIN store ON store.id = food_menu.store_id
    INNER JOIN store_owner ON store.id = store_owner.store_id
   	LEFT JOIN leave_store ON leave_store.store_owner_id = store_owner.id AND leave_store.date_write = (SELECT MAX(leave_store.date_write) FROM leave_store WHERE leave_store.status='?????????????????????')
    `,[],(err,result)=>{
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})
appRouter.post('/getFoodMenuListCustomerByStore',(req,res)=>{
    const storeId = req.body.storeId
    db.query(`SELECT food_menu.*,store.store_name,store.id AS sId,store.status AS s_status,leave_store.to_date,leave_store.frome_date
    FROM food_menu
    INNER JOIN store ON store.id = food_menu.store_id
    INNER JOIN store_owner ON store.id = store_owner.store_id
   	LEFT JOIN leave_store ON leave_store.store_owner_id = store_owner.id AND leave_store.date_write = (SELECT MAX(leave_store.date_write) FROM leave_store WHERE leave_store.status='?????????????????????')
    WHERE store.id = ?`,[storeId],(err,result)=>{
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})
appRouter.post('/getOptionMixByfoodid',(req,res)=>{
    const fooId = req.body.fooId
    db.query(`SELECT food_option.option_name AS name,food_and_option_mix.option_id AS id
    FROM food_and_option_mix 
    INNER JOIN food_option ON food_option.id = food_and_option_mix.option_id
    WHERE food_and_option_mix.food_id = ?`,[fooId],(err,result)=>{
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})
appRouter.post('/getSpecialOptionMixByfoodid',(req,res)=>{
    const fooId = req.body.fooId
    db.query(`SELECT food_special_option.special_option_name AS name,food_and_special_option_mix.special_option_id AS id
    FROM food_and_special_option_mix 
    INNER JOIN food_special_option ON food_special_option.id = food_and_special_option_mix.special_option_id
    WHERE food_and_special_option_mix.food_id = ?`,[fooId],(err,result)=>{
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})
appRouter.post('/getAnnounCustomer',(req,res)=>{
    db.query(`SELECT * From announce WHERE type = 'general'`,(err,result)=>{
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})
appRouter.post('/insertOrder',(req,res)=> {
    const orderId = req.body.orderFoodId
    const customerId = req.body.customerId
    const Date = req.body.Date
    const data = req.body.data
    db.query(`INSERT INTO order_food (id,customer_id,date) VALUES(?,?,?) `,[orderId,customerId,Date],async(err)=>{
        if (err) {
            console.log(err);
            res.send({err:'?????????????????????????????????????????????'})
        } else {
         
               const promises = data.map(data => {
                db.query(`INSERT INTO order_food_detial (order_food_id,food_id,text,food_option_id,quantity,package) 
                VALUES(?,?,?,?,?,?)`,[orderId,data.fId,data.text,data.option,data.count,data.package],(err)=>{
                   if (err) {
                       console.log(err);
                       res.send({err:'?????????????????????????????????????????????'})
                   } 
               }) 
                  
           })

           await Promise.all(promises)
           db.query(`SELECT store.id, order_food.id AS oid, order_food.date,customer.name
           FROM store 
           INNER JOIN food_menu ON food_menu.store_id = store.id 
           INNER JOIN order_food_detial ON order_food_detial.food_id = food_menu.id 
           INNER JOIN order_food ON order_food.id = order_food_detial.order_food_id
           INNER JOIN	customer ON customer.id = order_food.customer_id
           WHERE order_food.id = ? GROUP BY store.id`,[orderId],(err,result)=>{
                    if (err) {
                        console.log(err);
                    } else {
                       result.map((data)=>{
                       io.emit(`withUser-id-${data.id}`,data);
                       })
                   res.send({message:'???????????????????????????'})      
                   }
           })
               
        }
    })
    
})
appRouter.post('/getOrder',(req,res)=>{
    const storeId = req.body.storeId
    const date = req.body.date
    db.query(`SELECT order_food.id AS oid, order_food.date,customer.name,customer.id AS cid
    FROM store 
    INNER JOIN food_menu ON food_menu.store_id = store.id 
    INNER JOIN order_food_detial ON order_food_detial.food_id = food_menu.id 
    INNER JOIN order_food ON order_food.id = order_food_detial.order_food_id
    INNER JOIN	customer ON customer.id = order_food.customer_id
    WHERE store.id = ? AND date(order_food.date) = ?
    GROUP BY order_food.id
    ORDER BY order_food.date ASC 
    `,[storeId,date],(err,result)=>{
             if (err) {
                 console.log(err);
             } else {
                res.send(result)
                }
            })  
})
appRouter.post('/getOrderOtherDay',(req,res)=>{
    const storeId = req.body.storeId
    const date = req.body.date
    db.query(`SELECT order_food.id AS oid, order_food.date,customer.name,customer.id AS cid
    FROM store 
    INNER JOIN food_menu ON food_menu.store_id = store.id 
    INNER JOIN order_food_detial ON order_food_detial.food_id = food_menu.id 
    INNER JOIN order_food ON order_food.id = order_food_detial.order_food_id
    INNER JOIN	customer ON customer.id = order_food.customer_id
    WHERE store.id = ? AND date(order_food.date) != ?
    GROUP BY order_food.id
    ORDER BY order_food.date ASC 
    `,[storeId,date],(err,result)=>{
             if (err) {
                 console.log(err);
             } else {
                res.send(result)
                }
            })  
})
appRouter.post('/getOrderDetial',(req,res)=>{
    const oid = req.body.oid
    const sid = req.body.sid
    db.query(`SELECT order_food_detial.*,food_menu.food_name,food_option.option_name
    FROM order_food_detial 
    INNER JOIN order_food ON order_food.id = order_food_detial.order_food_id 
    INNER JOIN food_menu ON food_menu.id = order_food_detial.food_id 
    LEFT JOIN food_option ON food_option.id = order_food_detial.food_option_id
    WHERE order_food.id = ? AND food_menu.store_id = ?`,[oid,sid],(err,result)=>{
             if (err) {
                 console.log(err);
             } else {
                res.send(result)
                }
            })  
})
appRouter.post('/updateStatusOrder',(req,res)=>{
    const id = req.body.id
    const status = req.body.status
    const cid = req.body.cid
    db.query(`UPDATE order_food_detial SET status = ? WHERE id = ?`,[status,id],(err)=>{
             if (err) {
                 console.log(err);
             } else {
                 db.query(`SELECT order_food_detial.* FROM order_food_detial WHERE id = ?`,[id],(err,result)=>{
                     if (err) {
                         console.log(err);
                         res.send(err)
                     } else {
                        io.emit(`withCus-id-${cid}`,result);
                        res.send({maessage:'???????????????????????????'})
                     }
                 })
                }
            })  
})
appRouter.post('/getOrderUserList',(req,res)=>{
    const userId = req.body.userId
    db.query(`SELECT order_food.* FROM order_food 
    INNER JOIN order_food_detial ON order_food_detial.order_food_id = order_food.id
    WHERE order_food.customer_id = ?
    GROUP BY order_food.id
    ORDER BY date ASC
    `,[userId],(err,result)=>{
             if (err) {
                 console.log(err);
             } else {
                 res.send(result)
                }
        })  
})
appRouter.post('/getOrderUserDetial',(req,res)=>{
    const userId = req.body.userId
    const oid = req.body.oid
    db.query(`SELECT order_food_detial.*,food_menu.food_name,food_option.option_name,store.store_name
    FROM order_food_detial 
    INNER JOIN order_food ON order_food.id = order_food_detial.order_food_id 
    INNER JOIN food_menu ON food_menu.id = order_food_detial.food_id
    INNER JOIN store ON store.id = food_menu.store_id 
    LEFT JOIN food_option ON food_option.id = order_food_detial.food_option_id
    WHERE order_food.id = ? AND order_food.customer_id = ?`,[oid,userId],(err,result)=>{
             if (err) {
                 console.log(err);
             } else {
                 res.send(result)
                }
            })  
})
appRouter.post('/getStoreStatusAndInfo',(req,res)=>{
    const storeId = req.body.storeId
    db.query(`SELECT store.store_name,store.status,location.location AS location, store.log_id AS log_id
    FROM store 
    INNER JOIN location ON location.id = store.location_id 
    INNER JOIN store_lock ON store_lock.id = store.log_id
    WHERE store.id = ?`,[storeId],(err,result)=>{
             if (err) {
                 console.log(err);
             } else {
                 res.send({name:result[0].store_name,status:result[0].status,log_id:result[0].log_id,location:result[0].location})
                }
            })  
})
appRouter.post('/getCustomerInfo',(req,res)=>{
    const userId = req.body.userId
    db.query(`SELECT *
    FROM customer
    WHERE id = ?`,[userId],(err,result)=>{
             if (err) {
                 console.log(err);
             } else {
                 res.send(result)
                }
            })  
})
appRouter.post('/ChangStoreStatus',(req,res)=>{
    
    const storeId = req.body.storeId
    const status = req.body.status
    db.query(`UPDATE store SET status = ? WHERE store.id = ?`,[status,storeId],(err)=>{
             if (err) {
                 console.log(err);
             } else {
                db.query(`SELECT status FROM store WHERE store.id = ?`,[storeId],(err,result)=>{
                    if (err) {
                        console.log(err);
                    } else {
                      res.send({status:result[0].status})  
                    }
                })
                 
                }
            })  
})
appRouter.post('/getsellInfomation',(req,res)=>{
    
    const storeId = req.body.storeId
    const date = req.body.date
    db.query(`SELECT MAX(MaxOrder) AS quantity,MAX(food_name) AS food_name,orderToday 
    FROM (SELECT food_menu.food_name AS food_name,SUM(order_food_detial.quantity) AS MaxOrder,(SELECT SUM(order_food_detial.quantity) FROM order_food_detial
    INNER JOIN food_menu ON food_menu.id = order_food_detial.food_id
    INNER JOIN order_food ON order_food.id = order_food_detial.order_food_id
    WHERE food_menu.store_id = ? AND date(order_food.date) = ?) AS orderToday
    FROM order_food_detial 
    INNER JOIN food_menu ON food_menu.id = order_food_detial.food_id
    INNER JOIN order_food ON order_food.id = order_food_detial.order_food_id
    WHERE food_menu.store_id = ? AND date(order_food.date) = ?
    GROUP BY food_menu.id) MaxOrder
    `,[storeId,date,storeId,date],(err,result)=>{
             if (err) {
                 console.log(err);
             } else {             
                res.send(result)  
            }
    })  
})
appRouter.post('/getRenList',(req,res)=>{
    const storeId = req.body.storeId
    db.query(`SELECT * FROM rent_fel WHERE store_id = ?`,[storeId],(err,results)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {

            res.send(results);   
        }
    })
})
appRouter.post('/getHistoryOfSell',(req,res)=>{
    const userId = req.body.userId
    db.query(`SELECT order_food_detial.*,store.store_name,food_menu.food_name
    FROM order_food_detial 
    INNER JOIN order_food ON order_food.id = order_food_detial.order_food_id
    INNER JOIN food_menu ON  food_menu.id = order_food_detial.food_id
    INNER JOIN store ON store.id = food_menu.store_id
    WHERE order_food.customer_id = ?
    `,[userId],(err,results)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send(results);   
        }
    })
})
appRouter.post('/getSellDetial',(req,res)=>{
    const storeId = req.body.storeId
    const date = req.body.date
    db.query(`SELECT order_food_detial.*,food_menu.food_name,food_menu.id,food_menu.food_price*order_food_detial.quantity AS num_of_price
    FROM order_food_detial 
    INNER JOIN order_food ON order_food.id = order_food_detial.order_food_id 
    INNER JOIN food_menu ON food_menu.id = order_food_detial.food_id 
    INNER JOIN store ON store.id = food_menu.store_id 
    WHERE food_menu.store_id = ? AND date(order_food.date) = ? GROUP BY order_food_detial.id
    `,[storeId,date],(err,results)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send(results);   
        }
    })
})
appRouter.post('/getPopularMenuSell',(req,res)=>{
    const storeId = req.body.storeId
    const date = req.body.date
    db.query(`SELECT MaxOrder AS quantity,food_name
    FROM (SELECT food_menu.food_name AS food_name,order_food_detial.quantity,SUM(order_food_detial.quantity) AS MaxOrder
    FROM order_food_detial 
    INNER JOIN food_menu ON food_menu.id = order_food_detial.food_id
    INNER JOIN order_food ON order_food.id = order_food_detial.order_food_id
    WHERE food_menu.store_id = ? AND date(order_food.date) = ?
    GROUP BY food_menu.food_name) MaxOrder
    `,[storeId,date],(err,results)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send(results);   
        }
    })
})
appRouter.post('/getHistoryOfSellStore',(req,res)=>{
    const storeId = req.body.storeId
    const date = req.body.date
    db.query(`SELECT order_food_detial.*,store.store_name,food_menu.food_name,food_menu.food_price*order_food_detial.quantity AS num_of_price,order_food.date
    FROM order_food_detial 
    INNER JOIN order_food ON order_food.id = order_food_detial.order_food_id
    INNER JOIN food_menu ON food_menu.id = order_food_detial.food_id
    INNER JOIN store ON store.id = food_menu.store_id
    WHERE food_menu.store_id = ?
    GROUP by order_food_detial.id
    `,[storeId,date],(err,results)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send(results);   
        }
    })
})
appRouter.post('/getScholarShipsbyStudent',(req,res)=>{
    const studentId = req.body.studentId
    db.query(`SELECT scholarship.* 
    FROM scholarship
    INNER JOIN student_scholarship ON student_scholarship.scholarship_id = scholarship.id
    WHERE student_scholarship.student_id = ? AND scholarship.type='??????????????????????????????????????????'`,[studentId],(err,results)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send(results);   
        }
    })
})
appRouter.post('/getScholarShipsbyStore',(req,res)=>{
    const storeId = req.body.storeId
    const date = req.body.date
    db.query(`SELECT scholarship.*,table_work.date_work
    FROM scholarship
    INNER JOIN table_work ON table_work.scholarship_id = scholarship.id
    INNER JOIN table_work_detial ON table_work_detial.table_work_id = table_work.id
    WHERE table_work.date_work = ? AND table_work_detial.store_id = ?`,[date,storeId],(err,results)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send(results);   
        }
    })
})
appRouter.post('/getWorkTableByStudent',(req,res)=>{
    const scId = req.body.scId
    db.query(`SELECT table_rage.rage_name,table_student_regis.student_sc_id,store.store_name,store.id AS sid,COUNT(table_rage.id) AS count,table_rage.id
    FROM table_student_regis 
    RIGHT JOIN  table_rage ON table_rage.id = table_student_regis.table_rage_id
    INNER JOIN table_work_detial ON table_work_detial.id = table_rage.table_work_detial_id
    INNER JOIN table_work ON table_work.id = table_work_detial.table_work_id
    INNER JOIN store ON store.id = table_work_detial.store_id
    WHERE table_work.id = ?
    GROUP BY table_rage.id`,[scId],(err,results)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send(results);   
        }
    })
})
appRouter.post('/getCheckWorkTableByStudent',(req,res)=>{
    const scId = req.body.scId
    const studentId = req.body.studentId
    db.query(`SELECT table_rage.rage_name,table_student_regis.student_sc_id,store.store_name,table_work.date_work
    FROM table_student_regis 
    RIGHT JOIN  table_rage ON table_rage.id = table_student_regis.table_rage_id
    INNER JOIN table_work_detial ON table_work_detial.id = table_rage.table_work_detial_id
    INNER JOIN table_work ON table_work.id = table_work_detial.table_work_id
    INNER JOIN store ON store.id = table_work_detial.store_id
    WHERE table_work.id = ?  AND table_student_regis.student_sc_id = ?`,[scId,studentId],(err,results)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send(results);   
        }
    })
})
appRouter.post('/getStoreScList',(req,res)=>{
    const scId = req.body.scId
    db.query(`SELECT store.store_name,store.id
    FROM table_student_regis 
    RIGHT JOIN  table_rage ON table_rage.id = table_student_regis.table_rage_id
    INNER JOIN table_work_detial ON table_work_detial.id = table_rage.table_work_detial_id
    INNER JOIN table_work ON table_work.id = table_work_detial.table_work_id
    INNER JOIN store ON store.id = table_work_detial.store_id
    WHERE table_work.id = ?
    GROUP BY table_work_detial.store_id`,[scId],(err,results)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send(results);   
        }
    })
})
appRouter.post('/InsertTableWork',(req,res)=>{
    const rageId = req.body.rageId
    const studentId = req.body.studentId
    const date = req.body.date
    db.query(`INSERT INTO table_student_regis (table_rage_id,student_sc_id,date) VALUES(?,?,?)`,[rageId,studentId,date],(err)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send('???????????????????????????');   
        }
    })
})
appRouter.post('/getStudentIdForSave',(req,res)=>{
    const studentId = req.body.studentId
    const storeId = req.body.storeId
    const date = req.body.date
    db.query(`SELECT student.*,table_student_regis.date,table_rage.rage_name,table_student_regis.id AS tis,COUNT(table_hour.date) AS count
    FROM table_student_regis 
    INNER JOIN table_rage ON table_rage.id = table_student_regis.table_rage_id  
    INNER JOIN table_work_detial ON table_work_detial.id = table_rage.table_work_detial_id 
    INNER JOIN table_work ON table_work.id = table_work_detial.table_work_id 
    INNER JOIN student ON student.id = table_student_regis.student_sc_id 
    LEFT JOIN table_hour ON table_hour.table_student_regis_id = table_student_regis.id
    WHERE table_student_regis.student_sc_id = ? AND table_work.date_work = ? AND table_work_detial.store_id = ?`,
    [studentId,date,storeId],(err,result)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send(result);   
        }
    })
})
appRouter.post('/InsertHour',(req,res)=>{
    const tid = req.body.tid
    const hourQuantity = req.body.hourQuantity
    const date = req.body.date
    db.query(`INSERT INTO table_hour (table_student_regis_id,hour_quantity,date) VALUES(?,?,?)`,
    [tid,hourQuantity,date],(err)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send('???????????????????????????');   
        }
    })
})
appRouter.post('/getTableStudenRegis',(req,res)=>{
    const storeId = req.body.storeId
    db.query(`SELECT table_work.date_work,table_work_detial.id,scholarship.scholarship_name
    FROM table_work_detial
    INNER JOIN table_work ON table_work.id = table_work_detial.table_work_id
    INNER JOIN scholarship ON scholarship.id = table_work.scholarship_id
    WHERE table_work_detial.store_id = ?`,
    [storeId],(err,result)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send(result);   
        }
    })
})
appRouter.post('/getQiuntityHour',(req,res)=>{
    const userId = req.body.userId
    const scId = req.body.scId
    db.query(`SELECT table_hour.hour_quantity AS quantity ,store.store_name,table_work.date_work
    FROM table_hour
    INNER JOIN table_student_regis ON table_student_regis.id = table_hour.table_student_regis_id
    INNER JOIN table_rage ON table_rage.id = table_student_regis.table_rage_id
    INNER JOIN table_work_detial ON table_work_detial.id = table_rage.table_work_detial_id
    INNER JOIN table_work ON table_work_detial.table_work_id = table_work.id
    INNER JOIN store ON table_work_detial.store_id = store.id
    WHERE table_student_regis.student_sc_id = ? AND table_work.scholarship_id = ?
    `,
    [userId,scId],(err,result)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send(result);   
        }
    })
})
appRouter.post('/getRangeNameOfTableStudentRegis',(req,res)=>{

    const storeId = req.body.storeId

    db.query(`SELECT table_rage.rage_name,table_work_detial.id,table_rage.id AS rid
    FROM table_student_regis 
    RIGHT JOIN  table_rage ON table_rage.id = table_student_regis.table_rage_id
    INNER JOIN table_work_detial ON table_work_detial.id = table_rage.table_work_detial_id
    INNER JOIN table_work ON table_work.id = table_work_detial.table_work_id
    INNER JOIN store ON store.id = table_work_detial.store_id
    WHERE table_work_detial.store_id = ?
   GROUP BY table_rage.id`,
    [storeId],(err,result)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send(result);   
        }
    })
})
appRouter.post('/getStudentRegisOfStoreTable',(req,res)=>{

    const storeId = req.body.storeId

    db.query(`SELECT table_rage.id,student_scholarship.student_id,student.name,student.lastname
    FROM table_student_regis 
    RIGHT JOIN table_rage ON table_rage.id = table_student_regis.table_rage_id 
    INNER JOIN table_work_detial ON table_work_detial.id = table_rage.table_work_detial_id 
    INNER JOIN table_work ON table_work.id = table_work_detial.table_work_id 
    INNER JOIN store ON store.id = table_work_detial.store_id 
    INNER JOIN student_scholarship ON student_scholarship.student_id = table_student_regis.student_sc_id
    INNER JOIN student ON student.id = student_scholarship.student_id
    WHERE table_work_detial.store_id = ?`,
    [storeId],(err,result)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send(result);   
        }
    })
})
appRouter.post('/getTablesbyStudent',(req,res)=>{

    const scId = req.body.scId

    db.query(`SELECT table_work.*
    FROM table_work 
    WHERE table_work.scholarship_id = ?`,
    [scId],(err,result)=>{
        if (err) {
            console.log(err);
            res.send({err:err});
        } else {
            res.send(result);   
        }
    })
})
//----------------------------------------------------------Just Test-----------------------------------------------
appRouter.get('/test',(req,res)=>{
    const userId = 4
    
            io.emit(`withCus-id-${userId}`,'555');
           res.send({maessage:'???????????????????????????'})
          
        


     
})
module.exports = appRouter
