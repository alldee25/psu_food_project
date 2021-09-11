import { createStackNavigator } from '@react-navigation/stack'
import { Icon, MenuItem,Layout,Tab,TabView } from '@ui-kitten/components';
import axios from 'axios';
import React, { createRef, useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet, View, SafeAreaView, Text, FlatList, Image, StatusBar,Animated,TouchableWithoutFeedback, Dimensions, TouchableOpacity, Modal } from 'react-native'
import { AuthContext } from '../App';
import AddMenuButton from './Addmenu/ButtonAdd';
import FormAddMenu from './Addmenu/FormAddMenu';
import MenuManage from './Addmenu/MenuManage';


const ForwardIcon = (props) => (
    <Icon {...props} name='arrow-ios-forward'/>
  );

export default function ManageScreen({navigation}) {

    const stackManage = createStackNavigator();

    const openModal =()=>{
        console.log('open');
    }
    return (
        <stackManage.Navigator>
            <stackManage.Screen name='menu' component={stackMenu} />
            <stackManage.Screen 
                name='foodMenu' 
                component={MenuManage}
                /* options={{
                    headerRight:()=>(
                        <AddMenuButton openModal={openModal} />
                    )
                }} */ 
            />
            <stackManage.Screen name='FormAddMenu' component={FormAddMenu} />
        </stackManage.Navigator>
    )
}
const stackMenu =({navigation})=>{
    return (
        <SafeAreaView style={styles.container}> 
            <MenuItem style={styles.MenuItem} title='จัดการเมนูอาหาร' onPress={()=> navigation.navigate('foodMenu')} accessoryRight={ForwardIcon} />
            <MenuItem style={styles.MenuItem} title='ระดับคุณภาพความสะอาด' onPress={()=> navigation.navigate('รายการ')} accessoryRight={ForwardIcon} />
            <MenuItem style={styles.MenuItem} title='การชำระค่าเช่า' onPress={()=> navigation.navigate('รายการ')} accessoryRight={ForwardIcon} />
            <MenuItem style={styles.MenuItem} title='จัดการการลา' onPress={()=> navigation.navigate('รายการ')} accessoryRight={ForwardIcon} />
            <MenuItem style={styles.MenuItem} title='บันทึกชั่วโมงทำงาน' onPress={()=> navigation.navigate('HistoryMenu')} accessoryRight={ForwardIcon} />
            <MenuItem style={styles.MenuItem} title='ประวัติการขาย' onPress={()=> navigation.navigate('HistoryMenu')} accessoryRight={ForwardIcon} />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        display:'flex',
        alignItems:"flex-start",
        marginTop:10
    },
    MenuItem:{
        marginTop:5
    },
    menuList:{
        width:'100%',
        height:'100%'
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
