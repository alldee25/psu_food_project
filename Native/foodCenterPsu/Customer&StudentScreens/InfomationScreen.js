import React, { useContext } from 'react'
import { Text, View, Image, Divider } from 'native-base';
import { TouchableOpacity } from 'react-native';
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
    const {userType} = useContext(AuthContext);
    return(
        <SafeAreaView style={styles.container}>
            <View
                w='95%'
                h={16}
            >
                <TouchableOpacity
                    onPress={()=>{navigation.navigate('Cart')}}
                >
                    <Image 
                        alt='img'
                        w={50}
                        h={50}
                        resizeMode='contain'
                        source={require('../assets/img/user.png')}
                    />  
                </TouchableOpacity>
                
            </View>
            
            <Divider w='100%' bgColor='#888888' alignSelf='center' />
            {userType == 'student' ? (
                <>
                <MenuItem style={styles.MenuItem} title='detial' onPress={()=> navigation.navigate('รายการ')} accessoryRight={ForwardIcon} />
                <MenuItem style={styles.MenuItem} title='History' onPress={()=> navigation.navigate('History')} accessoryRight={ForwardIcon} />
                </>
            ):(<></>)} 
            <MenuItem style={styles.MenuItem} title='ประวัติการซื้อ' onPress={()=> navigation.navigate('History')} accessoryRight={ForwardIcon} />

            
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        display:'flex',
        alignItems:"flex-end",
        marginTop:10
    },
    MenuItem:{
        fontWeight:'bold',
        fontSize:21,
        marginTop:5,
        borderRadius:10,
        width:'97%',
        height:90,
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