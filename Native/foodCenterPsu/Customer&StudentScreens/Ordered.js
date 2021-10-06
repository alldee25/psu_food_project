import React, { useContext, useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Icon,Layout, Tab, TabView,  } from '@ui-kitten/components';
import axios from 'axios';
import { Container, FlatList, Heading, View, Divider, Image } from 'native-base'
import { Alert, Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../App';
import OrderDetialcusScreen from './OrderDetialCustomerScreen';
import Moment from 'moment';
import { useIsFocused } from '@react-navigation/core';

const stackOrder = createStackNavigator()
export default function Ordered() {
    return (
        <stackOrder.Navigator>
            <stackOrder.Screen 
                name='orderedUserList' 
                component={orderListUser}
                options={{
                    headerShown:false
                }} 
            />
            <stackOrder.Screen name='OrderDetialcusScreen' component={OrderDetialcusScreen} />
        </stackOrder.Navigator>
    )
}
const orderListUser = ({navigation}) => {
    Moment.locale('en')
    const W = Dimensions.get('window').width;
    const H = Dimensions.get('window').height
    const {userData,socket} = useContext(AuthContext)
    const [orderList,setOrderList] = useState([])
    const [orderListfoFinash,setOrderListfoFinash] = useState([])
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const userId = userData.usersData[0].id
    const isFocus = useIsFocused()

    useEffect(()=>{
        axios.post('http://192.168.1.102:3001/getOrderUserList',{
            userId:userId
        }).then((res)=> {
            setOrderList(res.data)

        })
    },[isFocus])

    return (
        
            
        <View
            
            style={{width:(W),height:(H)}}
        >   
            <Image
                top={-10}
                width="100%"
                height="25%"
                resizeMode='contain'
                position='absolute'
                zIndex={-1}
                alt='backorder' 
                source={require('./../assets/img/S__2637832.jpg')}
            />
            <View
                position='absolute'
                width="100%"
                height="100%"
                opacity={0.5}
                backgroundColor='#000'
                zIndex={-1}
            />
          
            <View
                flex={1}
                justifyContent="flex-start"
                height={100}
            >
                <View
                    w='40%'
                    h={130}
                    mb={3}
                    borderTopRightRadius={80}
                    borderBottomRightRadius={80}                   
                    opacity={0.8}
                    backgroundColor="#FFFF"
                >
                    <Image 
                    resizeMode='contain'
                    alt='Cute_woman_chef_logo_cartoon_art_illustration'                
                    h={100}
                    mt={2}
                    source={require('./../assets/img/Cute_woman.png')}
                />
                </View>
                
            </View>
            
            <View
                backgroundColor='white'
                flex={5}
                borderTopRadius={20}
                mb={10}   
                
            >
                    <FlatList 
                        data={orderList}
                        keyExtractor={(item,index) => index}
                        contentContainerStyle={{
                        paddingLeft:7,
                        paddingRight:7
                        }}
                        renderItem={({item,index})=>
                        <TouchableOpacity
                            style={{
                                marginTop:8
                            }}
                            onPress={()=>{navigation.navigate('OrderDetialcusScreen',
                            {
                                id:item.id,                            
                            }) 
                        }}
                        >  
                        <View style={{
                            flexDirection:'row',
                            padding:10,
                            backgroundColor:'#E4E4F4',
                            borderRadius:20,
                        }}>
                            
                            <View style={{marginLeft:10,width:'60%',flex:1,alignItems:'flex-start'}}>
    
                                <Text fontFamily='IBMPlexSansThai-SemiBold' style={{fontSize:18}}>
                                    ออรเอดร์หมายเลย {item.number_order} 
                                </Text>                                                                                                                                  
                                <Text fontFamily='IBMPlexSansThai-Regular' style={{fontSize:18}}>
                                    เวลา {Moment(item.date).format('HH:mm')} 
                                </Text>                                                                     
                            </View>
                            <View  justifyContent='center' >
                                <Icon style={styles.icon} fill='#888888' name='arrow-ios-forward-outline' />
                            </View>                                                            
                        </View>
                        </TouchableOpacity>                                 
                        }
                    />           
            </View>
        </View>
        
    )
}
const styles = StyleSheet.create({
    buttonTypy:{
        justifyContent:'center',
        alignItems:'center',
        borderColor:'white',
        borderWidth:1,
        borderRadius:20,
        width:100,
        height:40,
        margin:10,
        backgroundColor:'#F8F1FF'
    },
    icon: {
        width: 42,
        height: 30,
        color:"black"
        },
    iconBack: {
        width: 30,
        height: 40,
        },
        
})
