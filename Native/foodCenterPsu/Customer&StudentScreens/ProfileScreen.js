import axios from 'axios';
import { Avatar, Divider, Image, Text, View } from 'native-base';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import {  Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../App';

export default function ProfileScreen() {
    
    const W = Dimensions.get('window').width
    const {userData,userImg} = useContext(AuthContext)
    const [cusInfo,setCusInfo] = useState([])

    useEffect(()=>{

        axios.post('http://192.168.1.102:3001/getCustomerInfo',{
        userId:userData.usersData[0].id
    }).then(
        (res)=> {
            setCusInfo(res.data)
        }      
    )

},[])

    return (
        <View 
            w={W}
            h='100%'
            alignItems='center'
            justifyContent='flex-end'
        >
            <View style={styles.drawerContent}>
                <Avatar
                    position='absolute'
                    top={-50}
                    bg="amber.500"
                    size="xl"
                    source={{
                    uri: `http://192.168.1.102:3001/userUploaded/${userImg}`
                    }}
                >
                    AK
                </Avatar>
                <View
                    height="20%"
                    w='40%'
                    flexDirection='row'
                    justifyContent='space-around'
                    alignItems='flex-end'
                >
                    <Text>{userData.usersData[0].name}</Text>
                    <Text>{userData.usersData[0].lastname}</Text>
                </View>
                
                <View
                    height="5%"
                    w='90%'
                    justifyContent='center'
                >
                    <Divider w='100%' bgColor='#888888' />
                </View>
            {cusInfo.map((data,index)=>(
                <View
                    key={index}
                    w='90%'
                    paddingTop={3}
                > 
                    <Text
                        style={styles.texData}
                        fontFamily='IBMPlexSansThai-Bold'
                    >
                        เบอร์โทร :  {data.phone}
                    </Text>    
                    <Text
                        style={styles.texData}
                        fontFamily='IBMPlexSansThai-Bold'
                    >
                        อีเมล์ :  {data.email}
                    </Text>    
                </View>
            ))}                
            </View>           
        </View>
        
    )
}

const styles = StyleSheet.create({
    drawerContent: {
      width:'90%',
      height:'80%',
      borderTopLeftRadius:15,
      borderTopRightRadius:15,
      alignItems:'center',
      flexDirection:'column',
      backgroundColor:"#FFFF",
      shadowColor:'gray',
      shadowOpacity:0.5,
      elevation:10
    },
    texData:{
        marginTop:10
    }
  });