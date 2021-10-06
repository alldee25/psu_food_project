import { View,Avatar, Divider, Image, Text } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { AuthContext } from '../App'
import { Icon, Toggle } from '@ui-kitten/components';
import axios from 'axios';

function ProfileStore() {


    const H = Dimensions.get('window').height
    const W = Dimensions.get('window').width
    const {userData,userImg} = useContext(AuthContext)
    const [storeStatus,setStoreStatus] = useState('')
    const [storeName,setStoreName] = useState('')
    const [logId,setLogId] = useState('')
    const [location,setLocation] = useState('')

    const onCheckedChange =()=> {
        setStoreStatus(!storeStatus)
        axios.post('http://192.168.1.102:3001/ChangStoreStatus',{
            storeId:userData.usersData[0].store_id,
            status:!storeStatus
        }).then(
            (res)=> {
                setStoreStatus(res.data.status)                             
            }
        )
    }
    useEffect(()=>{
            let isMounted = (
                        axios.post('http://192.168.1.102:3001/getStoreStatusAndInfo',{
                    storeId:userData.usersData[0].store_id
                }).then(
                    (res)=> {
                        setStoreStatus(res.data.status)
                        setLogId(res.data.log_id)
                        setLocation(res.data.location)
                        setStoreName(res.data.name)
                        
                    }      
                )
            )
            
            return () => { isMounted = false }
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
                    
                </Avatar>
                <View
                    height="20%"
                    w='40%'
                    flexDirection='row'
                    justifyContent='space-between'
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
                <View
                    w='90%'
                    paddingTop={2}
                >
                    <Text
                        style={styles.texData}
                        fontFamily='IBMPlexSansThai-Bold'
                    >
                        ร้าน : {storeName}
                    </Text> 
                    <Text
                        style={styles.texData}
                        fontFamily='IBMPlexSansThai-Bold'
                    >
                       สถานที่ : {location} 
                    </Text> 
                    <Text
                        style={styles.texData}
                        fontFamily='IBMPlexSansThai-Bold'
                    >
                        ล็อกที่ : {logId}
                    </Text> 
                    <Text
                        style={styles.texData}
                        fontFamily='IBMPlexSansThai-Bold'
                    >
                        เบอร์โทร :  {userData.usersData[0].phone}
                    </Text>    
                    <Text
                        style={styles.texData}
                        fontFamily='IBMPlexSansThai-Bold'
                    >
                        อีเมล์ :  {userData.usersData[0].email}
                    </Text>    
                </View>
                
                <View
                    w={'90%'}
                    alignItems='flex-start'
                >
                <Toggle
                    style={{marginTop:5}} 
                    status='success' 
                    checked={storeStatus == true } 
                    onChange={()=>{onCheckedChange()}}              
                >
                    <View
                        flexDirection='row'
                    >
                        <Text fontFamily='IBMPlexSansThai-Bold'>ร้าน : </Text>
                            <View width={10} justifyContent='center' >
                                {storeStatus == true ? <Text fontFamily='IBMPlexSansThai-Bold'>เปิด </Text> 
                                : 
                                <Text fontFamily='IBMPlexSansThai-Bold'>
                                    ปิด
                                </Text>}
                            </View>
                    </View>
                </Toggle>
            </View>                
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
  
export default ProfileStore
