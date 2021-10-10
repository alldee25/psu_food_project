import React from 'react'
import {  useLocation } from 'react-router';
import { useTransition } from "@react-spring/core";
import { animated } from "@react-spring/web";

function TableWork() {
    const location = useLocation();
    const transitions = useTransition(location.pathname == '/HomeScholarships/TableWork', {
        from: { opacity: 0 },
        enter: { opacity: 1, delay: 250},
        leave:  { opacity: 0},
    
        })
      return transitions(
            ((styles, item) => item && <animated.div className="subcon" style={styles}>
                <div className="header">
                    <h1>
                        รายการตารางการทำงาน
                    </h1>
                </div>       
            </animated.div>) 
    )
}

export default TableWork
