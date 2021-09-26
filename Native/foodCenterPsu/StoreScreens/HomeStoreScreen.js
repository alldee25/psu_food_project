import { Icon, Toggle } from '@ui-kitten/components';
import axios from 'axios';
import { Center, Container, Divider, Heading, Link, ScrollView, Text, View, Image } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import { AuthContext } from '../App'
import Moment from 'moment';

export default function HomeStoreScreen() {
    const W = Dimensions.get('window').width;
    const H = Dimensions.get('window').height
    const {userData} = useContext(AuthContext)
    const [storeStatus,setStoreStatus] = useState('')
    const [sellInfo,setSellInfo] = useState([])
    Moment.locale('en')
    let date = new Date();
    
    const onCheckedChange =()=> {
        setStoreStatus(!storeStatus)
        axios.post('http://192.168.1.102:3001/ChangStoreStatus',{
            storeId:userData.usersData[0].store_id,
            status:!storeStatus
        }).then(
            (res)=> {
                setStoreStatus(res.data)
            }
        )
    }
    useEffect(()=>{
        axios.post('http://192.168.1.102:3001/getStoreStatus',{
            storeId:userData.usersData[0].store_id
        }).then(
            (res)=> {
                   setStoreStatus(res.data) 
            }      
        ).then(
            axios.post('http://192.168.1.102:3001/getsellInfomation',{
                storeId:userData.usersData[0].store_id,
                date:Moment(date).format('YYYY-MM-DD')
            }).then(
                (res)=> {
                    setSellInfo(res.data)
                    console.log(res.data);
                }
            )
        )
    },[])
    return (
        <ImageBackground
            source={require('../assets/img/v748-toon-106.jpg')}
            style={{width:W,height:H}}
        >
            <View
                flexDirection='column'
                height={H}
                width={W}
            >
                <Container
                    flexDirection='row'
                    mt={2}
                    
                >
                    <Heading fontFamily='SanFranciscoDisplayBold' color="emerald.400" pl={4} >
                        Hi                 
                    </Heading>
                    <Heading fontFamily='SanFranciscoDisplayUltralight' color="#1D1F20" pl={4}>
                            {userData.usersData[0].name}
                    </Heading>
                    <View
                        w='100%'
                        alignItems='flex-end'
                    >
                    <Toggle
                        style={{marginTop:5,width:300}} 
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
                </Container>
                
                
                <View 
                                     
                    alignItems='center'                   
                    width={W}
                    height={H}
                                
                >
                    
                <View              
                width='90%' 
                flexDirection="row"
                mt={4}    
                >
                    <Container                                       
                        bg='#FFFFFF'                          
                        borderRadius={25} 
                        width={'47.5%'} 
                        height={200}                         
                        alignItems='center'
                        mr={2}
                        >                                             
                        <TouchableOpacity                       
                            style={{
                                flex:1,
                                alignItems:'center',
                                width:'100%',
                                height:'100%',
                                                            
                            }}>
                                <Heading fontFamily='IBMPlexSansThai-Bold' size="md" m={3} >
                                เมนูยอดนิยม    
                            </Heading>
                            <Text mt={2} fontFamily='IBMPlexSansThai-Regular' fontSize="md">
                                {sellInfo.map((data)=>(
                                    data.food_name
                                ))}
                            </Text>
                            <Heading fontFamily='IBMPlexSansThai-Regular' mt={2}>
                                {sellInfo.map((data)=>(
                                    data.quantity
                                ))}
                            </Heading>
                            <Text fontFamily='IBMPlexSansThai-Regular' mt={2} fontSize="md">
                                ออรเดอร์
                            </Text> 
                               
                        </TouchableOpacity>                                              
                    </Container> 
                    <Container 
                        
                        bg='#FFFFFF' 
                        borderRadius={25} 
                        width={'47.5%'} 
                        height={200 } 
                        ml={2} >
                        <TouchableOpacity style={{flex:1,alignItems:'center',width:'100%'}}>
                            <Heading fontFamily='IBMPlexSansThai-Bold' size="md" m={3} >
                                ยอดขาย    
                            </Heading>
                            <Text fontFamily='IBMPlexSansThai-Regular' mt={2} fontSize="md">
                                วันนี้
                            </Text>
                            <Heading  fontFamily='IBMPlexSansThai-Regular'mt={2}>                           
                                {sellInfo.map((data)=>(
                                    data.orderToday
                                ))} 
                            </Heading>
                            <Text mt={2} fontFamily='IBMPlexSansThai-Regular' fontSize="md">
                                ออร์เดอร์
                            </Text>
                        </TouchableOpacity>    
                    </Container>
                </View>
                     
                    <View
                        mt={4} 
                        bg='#FFFFFF' 
                        borderRadius={30} 
                        width='100%' 
                        height={400}                     
                    >
                        <Heading fontFamily='IBMPlexSansThai-Bold' size="md" ml={6} mt={4}>
                            ข่าวสาร    
                        </Heading> 
                        <Divider  w='90%' color='#888888' alignSelf='center'/>
                        <ScrollView
                            width='100%'
                            height='100%'                     
                        >
                            <Link  ml={6} mt={4} href="https://nativebase.io">
                                <Text fontFamily='IBMPlexSansThai-Regular'>สวัสดี</Text> 
                            </Link>
                        </ScrollView>   
                    </View>                   
                </View>
                                            
            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    
})
