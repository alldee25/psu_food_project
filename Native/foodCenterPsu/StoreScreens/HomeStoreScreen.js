import { Icon } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import { Center, Container, Divider, Heading, Link, ScrollView, Text, View, Image } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import { AuthContext } from '../App'
import Moment from 'moment';
import ProfileStore from './ProfileStore';
import SellDetial from './SellDetial';
import PopularMenu from './PopularMenu';

const stackHomeStore = createStackNavigator()

export default function HomeStoreScreen() {
    return (
        <stackHomeStore.Navigator>
            <stackHomeStore.Screen 
                name='home' 
                component={HomeStore} 
                options={{
                    headerShown:false
                }}
                />
            <stackHomeStore.Screen name='profileScreenStore' component={ProfileStore} />
            <stackHomeStore.Screen name='SellDetial' component={SellDetial} />
            <stackHomeStore.Screen name='PopularMenu' component={PopularMenu} />
        </stackHomeStore.Navigator>
    )
}
const HomeStore =({navigation})=> {
        const W = Dimensions.get('window').width;
    const H = Dimensions.get('window').height
    const {userData} = useContext(AuthContext)
    const [sellInfo,setSellInfo] = useState([])
    Moment.locale('en')
    let date = new Date();
    
    useEffect(()=>{
        let isMounted = (
           
            axios.post('http://192.168.1.102:3001/getsellInfomation',{
                storeId:userData.usersData[0].store_id,
                date:Moment(date).format('YYYY-MM-DD')
            }).then(
                (res)=> {
                    setSellInfo(res.data)               
                }
          )      
        )
        return () => { isMounted = false }
    },[])
    return (
        <View
            style={{width:W,height:H}}
            backgroundColor="#193B681A"
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
                    <TouchableOpacity
                        style={{marginTop:5,width:200}} 
                        onPress={()=>{navigation.navigate('profileScreenStore')}}              
                    >
                        <Icon name='person-outline'  fill='black' style={{with:30,height:30}}/>
                    </TouchableOpacity>
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
                        onPress={()=>navigation.navigate('PopularMenu')}                      
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
                                จาน/ห่อ
                            </Text> 
                               
                        </TouchableOpacity>                                              
                    </Container> 
                    <Container 
                        
                        bg='#FFFFFF' 
                        borderRadius={25} 
                        width={'47.5%'} 
                        height={200 } 
                        ml={2} >
                        <TouchableOpacity 
                            onPress={()=>navigation.navigate('SellDetial')}                          
                            style={{
                                flex:1,
                                alignItems:
                                'center',
                                width:'100%'
                                }}>
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
                                จาน/ห่อ
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
        </View>
    )
}
const styles = StyleSheet.create({
    
})
