import React from 'react'
import {  useLocation } from 'react-router';
import { useTransition } from "@react-spring/core";
import { animated } from "@react-spring/web";

function HourWork() {
    const location = useLocation();

    const transitions = useTransition(location.pathname == '/HomeScholarships/HourWork', {
        from: { opacity: 0 },
        enter: { opacity: 1, delay: 150},
        leave:  { opacity: 0},
    
        })
      return transitions(
            ((styles, item) => item && <animated.div className="subcon" style={styles}>
                <div className="header">
                    <h1>
                        ข้อมูลชั่วโมงการทำงาน
                    </h1>
                </div>       
            </animated.div>) 
    )
}

export default HourWork
