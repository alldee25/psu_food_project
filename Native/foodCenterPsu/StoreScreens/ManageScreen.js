import { createStackNavigator } from '@react-navigation/stack'
import { Icon, MenuItem,Layout,Tab,TabView } from '@ui-kitten/components';
import axios from 'axios';
import React, { createRef, useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet, View, SafeAreaView, Text, FlatList, Image, StatusBar,Animated,TouchableWithoutFeedback, Dimensions, TouchableOpacity, Modal, ImageBackground } from 'react-native'
import { AuthContext } from '../App';
import FormAddMenu from './Addmenu/FormAddMenu';
import FormAddOption from './Addmenu/FormAddOption';
import imagBack from '../assets/img/v748-toon-106.jpg'
import FormEditMenu from './Addmenu/FormEditMenu';

const ForwardIcon = (props) => (
    <Icon {...props} name='arrow-ios-forward'/>
  );

export default function ManageScreen() {

    const stackManage = createStackNavigator();
    return (
        <stackManage.Navigator>
            <stackManage.Screen name='menuManage' component={stackMenu} />           
        </stackManage.Navigator>
    )
}
const stackMenu =({navigation})=>{
    return (
        <ImageBackground
            resizeMode='cover'
            style={{flex:1}}
            source={imagBack}
        >
            <SafeAreaView style={styles.container}> 
                <MenuItem style={styles.MenuItem} title='ระดับคุณภาพความสะอาด' onPress={()=> navigation.navigate('รายการ')} accessoryRight={ForwardIcon} />
                <MenuItem style={styles.MenuItem} title='การชำระค่าเช่า' onPress={()=> navigation.navigate('รายการ')} accessoryRight={ForwardIcon} />
                <MenuItem style={styles.MenuItem} title='จัดการการลา' onPress={()=> navigation.navigate('รายการ')} accessoryRight={ForwardIcon} />
                <MenuItem style={styles.MenuItem} title='บันทึกชั่วโมงทำงาน' onPress={()=> navigation.navigate('HistoryMenu')} accessoryRight={ForwardIcon} />
                <MenuItem style={styles.MenuItem} title='ประวัติการขาย' onPress={()=> navigation.navigate('HistoryMenu')} accessoryRight={ForwardIcon} />
            </SafeAreaView>
        </ImageBackground>

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
