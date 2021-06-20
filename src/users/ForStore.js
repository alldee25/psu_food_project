import { animated, useTransition } from '@react-spring/web'
import React from 'react'
import './ForStore.css'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';


export default function ForStore() {
   
    const location = useLocation();

    const transitions = useTransition(location.pathname === '/ForStore',{
        from:{ opacity: 0, x: -800},
        enter:{ opacity: 1, x:0},
        leave:{ opacity: 0, x: -800 }

    })
    return transitions(
        (styles, item) => item && <animated.div className="conAnnoun" style={styles}>
        {transitions ((styles, item ) => item && ( <animated.div className="containerForStore" style={styles}>
            <div className='NavButton'>
            <Link to={`/RegisStore`}  style={{textDecoration:'none'}}><div className="itemNavIndex">สมัค</div></Link> 
             <Link to={`/RegisStore1`}  style={{textDecoration:'none'}}><div className="itemNavIndex">ประกาศผล</div></Link> 
               
            </div>
        

        </animated.div> ))}  
        </animated.div>
      
            
        
    )
}
