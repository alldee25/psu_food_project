import { useIsFocused } from '@react-navigation/core'
import { Icon } from '@ui-kitten/components'
import axios from 'axios'
import { Divider, FlatList, Heading, Menu, ScrollView, Text, View } from 'native-base'
import React, { useContext, useState, useEffect } from 'react'
import { Alert, StyleSheet, TouchableOpacity } from 'react-native'
import { AuthContext } from '../App'

export default function ComplaintList({navigation}) {

    const {userData} = useContext(AuthContext)
    const [ComplaintListnDataList,setComplainDataList] = useState([])

    useEffect(() => {

        let isMounted = (
           axios.post('http://192.168.1.102:3001/ComplaintList',{
            storeId:userData.usersData[0].id
        }).then((res)=>{
            setComplainDataList(res.data)       
        }).catch(error =>{
            console.log(error);
            throw error;
        }) 
        )
        
        return () => {
            isMounted = false
        }
    },[])
    return (
        <View backgroundColor='#F8F1FF'>
            <View style={styles.menuList}>
                {ComplaintListnDataList == '' ? <Heading flex={1} alignSelf='center' top='50%' fontSize={20}>--ไม่มีราการแจ้งเตือนความผิด--</Heading> : 
                <FlatList 
                    data={ComplaintListnDataList}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                    paddingLeft:10,
                    paddingRight:10
                    }}
                    renderItem={({item})=>
                    <TouchableOpacity
                        onPress={()=> navigation.navigate('รายละเอียดการแจ้งเตือน',{
                            topic:item.topic,
                            name:userData.usersData[0].name,
                            lastname:userData.usersData[0].lastname,
                            topic_detial:item.topic_detial,
                            complaint_number:item.complaint_number,
                            attendant_comment:item.attendant_comment,
                            date:item.date,
                            action:item.action,

                        })} 
                        style={{
                            flexDirection:'row',
                            marginTop:8,
                            padding:10,
                            backgroundColor:'#ffff',
                            borderRadius:10,  
                            height:100,
                        }}>
                     
                        <View
                            style={{
                                flex:1,
                                alignItems:'center',
                                justifyContent:'center',
                                backgroundColor:'#0B2B53',              
                                height:80,
                                borderRadius:10,                                                                                                                     
                            }}                                            
                        >
                        <Heading    
                            color='#DADADA'
                            fontSize={16}>
                            ครั้งที่
                        </Heading> 
                            <Heading
                                color='#DADADA'
                                fontSize={30}>
                                {item.complaint_number}
                            </Heading> 
                        </View>
                        <View
                            width={'70%'}    
                        >
                            <View style={{marginLeft:10}}>                                                               
                                <Text style={{fontSize:18}}>เรื่อง :  {item.topic}</Text>                                                                                               
                            </View>
                            <Divider my={2} w='90%' bgColor='#BBBBBB' alignSelf='center' />                       
                            <View style={{marginLeft:10}}>                                                               
                                <Text style={{fontSize:18}}>เตือนวันที่ : {item.date_write}</Text>                                                                                               
                            </View>  
                        </View>
                        <View 
                            height={'100%'}
                            justifyContent='center'
                        >
                            <Icon name='arrow-ios-forward' fill='#BBBBBB' style={styles.icon} />
                        </View>
                                                                                                                                
                    </TouchableOpacity>                                
                    }
                />
                }
                        
            </View>
        </View>
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
        height:'99.9%'
    },
    close:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    icon: {
        width: 32,
        height: 32,
      },
    
})
