import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useRouteMatch } from 'react-router'
import { Link } from 'react-router-dom';
import { useTransition,animated } from 'react-spring'

export default function IndexAnnoun() {

    const [test, setTest] = useState(false);
    const { url, path } = useRouteMatch();
    const location = useLocation();
    const [dataAnnounList,setDataAnnounList] = useState([])
    
    useEffect(() => {
        const today = new Date();
        const yeartoday = today.getFullYear() 
        axios.post('http://localhost:3001/getDataAnnounList',{
            yeartoday:yeartoday
        }).then((res)=>{
            setDataAnnounList(res.data)
        })
    }, [])
    return (
        
         <div className="card">    
        <h2>ประกาศ</h2>
        <div className="contentCard">
            <hr style={{zIndex:'2',position:'relative',backgroundColor:'white'}} />
            {dataAnnounList.map((data,index)=>(
               <li key={index}>
                    <Link style={{color:'white'}} to="#">{data.Title}</Link>
               </li> 
            ))}
            
            
        </div>              
    </div>


    )
}
