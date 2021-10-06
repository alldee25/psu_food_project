<<<<<<< HEAD
import React, { useContext, useState } from 'react'
import { Text, View, Image, Divider, Button, Heading } from 'native-base';
import { Dimensions, TouchableOpacity } from 'react-native';
=======
import React, { useContext } from 'react'
import { Text, View, Image, Divider, Button } from 'native-base';
import { TouchableOpacity } from 'react-native';
>>>>>>> 8cea6c4331339c741b0dff06a18b9fabaff13b79
import axios from 'axios';
import { useEffect } from 'react';
import {  SafeAreaView, StyleSheet } from 'react-native'
import { Icon, MenuItem } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import { AuthContext } from '../App';
import History from './History';
import CartScreen from './CartScreen';

const ForwardIcon = (props) => (
    <Icon {...props} name='arrow-ios-forward'/>
);

export default function InfomationScreen() {

    const ManageStack = createStackNavigator();
    return (
        <ManageStack.Navigator>
            <ManageStack.Screen name='ListMenu' component={ListMenu} />
            <ManageStack.Screen name='History' component={History} />
            <ManageStack.Screen name='Cart' component={CartScreen} />
        </ManageStack.Navigator>
    )
}
const ListMenu =({navigation})=> {
<<<<<<< HEAD
    const {userType,setAuth,userData,socket} = useContext(AuthContext);
    const [loading,setLoading] = useState(false)
    const logout =()=>{
        setLoading(true)
        setAuth('logout')
        axios.get('http://192.168.1.102:3001/logout').then((res)=>{
            console.log(res.data);
            socket.off()
        })
=======
    const {userType, setAuth} = useContext(AuthContext);
    const logout =()=>{
        axios.get('http://192.168.1.102:3001/logout').then(
            setAuth('logout')
        )
>>>>>>> 8cea6c4331339c741b0dff06a18b9fabaff13b79
    }
    return(
        <SafeAreaView style={styles.container}>
            
            {userType == 'student' ? (
                <>
                <MenuItem style={styles.MenuItem} title='detial' onPress={()=> navigation.navigate('รายการ')} accessoryRight={ForwardIcon} />
                <MenuItem style={styles.MenuItem} title='History' onPress={()=> navigation.navigate('History')} accessoryRight={ForwardIcon} />
                </>
            ):(<></>)} 
            <MenuItem style={styles.MenuItem} title='ประวัติการซื้อ' onPress={()=> navigation.navigate('History')} accessoryRight={ForwardIcon} />
<<<<<<< HEAD
           <View
                position='absolute'
                alignItems='center'
                bottom='3%'
                mt={4}
                w='100%'
                flexDirection='column'
           >
             <Button  
                w='90%'
                onPress={()=> logout()}
                isLoading={loading} 
                isLoadingText="Loging out..."
            >
                Log out
            </Button>   
           </View>
=======
            <Button disabled={groupValues == ''} w='90%' onPress={()=> logout}>Log out</Button>  
>>>>>>> 8cea6c4331339c741b0dff06a18b9fabaff13b79
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        display:'flex',
        alignItems:"flex-end",
        marginTop:10,
        height:'100%'
    },
    MenuItem:{
        fontWeight:'bold',
        fontSize:21,
        marginTop:5,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        width:'97%',
        height:60,
        shadowColor:'#DC143C',                                 
        shadowOpacity:1,
        elevation:7,
        shadowRadius:20,
    },
    menuList:{
        width:'100%',
        height:'100%',
        
    },
    containerButton:{
        alignItems:'center',
        position:'absolute',
        right:10,
        borderWidth: 2, 
    },
    icon: {
        width: 30,
        height: 30,
        borderRadius:30/2,
      },
    text:{ 
        
        backgroundColor:'darkgreen',  
        borderRadius:10,
        color:'azure'
    },
      button:{
        backgroundColor:'#DC143C',
        borderRadius:50/2,
        shadowRadius:10,
        shadowColor:'#F02A4B',
        shadowOpacity:0.3,
        shadowOffset:{height:90}
      }
})