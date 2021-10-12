import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));


function MenuStoreList(props) {

    const [menuList,setMenuList] = useState([])
    const classes = useStyles();

    useEffect(()=> {
        axios.post('http://localhost:3001/getFoodMenuListByAdmin',{
            storeId:props.storeId
        }).then((res)=>{
            setMenuList(res.data)
        })
    },[])

    return (

        <Typography
            component="span"
            style={{height:'100%'}}
        >
            {menuList.map((data,index)=>(
                <List 
                    key={index} 
                    className={classes.root}
                    component="span"
                >
                    <ListItem 
                        component="span"
                        alignItems="flex-start"
                    >
                    
                        <ListItemAvatar
                            component="span"
                        >
                        <img  
                        component="span"                      
                            style={{borderRadius:'15px'}}
                            width="150px"
                            src={`http://localhost:3001/userUploaded/${data.food_img}`}
                        />
                        </ListItemAvatar>
                        <ListItemText
                            primary={<span style={{fontWeight:'bold',marginLeft:'10px'}}>เมนู : {data.food_name}</span>}
                            secondary={
                                <React.Fragment
                                >
                                    <Typography
                                        style={{display:'flex',flexDirection:'column'}}
                                    >
                                    <span style={{fontWeight:'bold',marginLeft:'10px'}}>ราคา : {data.food_price}</span>
                                        <span style={{fontWeight:'bold',marginLeft:'10px'}}>ประเภท : {data.food_type}</span>   
                                    </Typography>
                                    
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                </List> 
            ))}
        </Typography>
        
        
    )
}

export default MenuStoreList
