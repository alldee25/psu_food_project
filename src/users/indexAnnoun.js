import React, { useState } from 'react'
import { useLocation, useRouteMatch } from 'react-router'
import { useTransition,animated } from 'react-spring'

export default function IndexAnnoun() {

    const [test, setTest] = useState(false);
    const { url, path } = useRouteMatch();
    const location = useLocation();

    const transition12 = useTransition(location.pathname === '/' ,{
    from: { x:  -800},
    enter:{ x: 0},
    leave: { x:  -800},

})
    return (
        
         <div className="card">    
        <h2>ประกาศ</h2>
        <div className="contentCard">
            <hr style={{zIndex:'2',position:'relative',backgroundColor:'white'}} />
            <li>
                In theory the above might be okay if the styles for Semantic UI inputs were exclusively on the parent div.ui.input. Not all of them actually are. Some styles explicitly target the child 
            </li>
            <li>
                without writing separate, more specific CSS that overrides the compiled Semantic UI styles? Luckily Semantic 
            </li>
            <li>
                Hopefully you find this answer to your earlier question in time to help you out. I threw in a quick screenshot below to show what this looks like.
            </li>
            <li>
            The styles and rendering for Forms and Input elements in SUI and SUIR gets a little tricky. Especially once you abstract the rendered markup into React components.
            </li>
            
        </div>              
    </div>


    )
}
