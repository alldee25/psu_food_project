import * as React from 'react';
import { Text, View } from 'react-native'
import { Button, Icon, MenuItem } from '@ui-kitten/components';
import { AuthContext } from '../App';
import axios from 'axios';

const ProfileScreen =({navigation},props)=>{

    const {setAuth,auth} = React.useContext(AuthContext)
    const Logout =()=>{
     axios.get('http://192.168.1.102:3001/logout').then(setAuth('logout'))
    }
    
    return(
        <View style={{display:"flex",alignItems:'center'}}>
            <Text>
                ProfileScreen
            </Text>
            <Button 
                onPress={Logout} 
            >   
                Log out
            </Button>
            
        </View>
    )
}

export default ProfileScreen