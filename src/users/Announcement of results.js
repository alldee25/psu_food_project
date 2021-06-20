import { animated, useTransition } from '@react-spring/web'
import React from 'react'
import { useLocation } from 'react-router-dom'
import './Announcement of results.css'

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function RegisStore1() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

    const location = useLocation();
    const transitions = useTransition(location.pathname == '/RegisStore1', {
        from: { opacity: 0, y: 800 },
        enter: { opacity: 1, y: 0 },
        leave:  {  y: 800}
      })
      const transitions1 = useTransition(location, {
        from: { opacity: 0 },
        enter: { opacity: 1},
        leave:  { opacity: 0}
      })

    return transitions1( 
        (styles,item) => item && <animated.div  className="conAnnoun" style={styles}>
            {transitions((styles, item) => item && ( <animated.div className="cont" style={styles}>                
            </animated.div> ))}
        </animated.div>
  )
}
