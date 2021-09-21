import * as React from 'react';
import { Text, View } from 'react-native'
import { Button, Icon, MenuItem } from '@ui-kitten/components';
import { AuthContext } from '../App';
import axios from 'axios';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MenuManage from '../StoreScreens/Menumanage/MenuList';
import { SafeAreaView } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();

const ProfileScreen =({navigation},props)=>{

    const {setAuth,auth} = React.useContext(AuthContext)
    const Logout =()=>{
     axios.get('http://192.168.1.102:3001/logout').then(setAuth('logout'))
    }
    
    return(
        <SafeAreaView>
            <Text>
                Audi
            </Text>
        </SafeAreaView>
    )
}

export default ProfileScreen