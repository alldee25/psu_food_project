import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from '@ui-kitten/components';
import axios from 'axios';
import { Container, FlatList, Heading, View, Divider } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../App';
import OrderDetialScreen from './OrderDetialScreen';
import Moment from 'moment';

const stackOrder = createStackNavigator()
export default function OrdersScreen({navigation}) {
        
    return (
        <stackOrder.Navigator>
            <stackOrder.Screen name='orderScreen' component={orderScreen} />
            <stackOrder.Screen name='orderDetialScreen' component={OrderDetialScreen} />
        </stackOrder.Navigator>
        )
}

const orderScreen = ({navigation}) => {
    Moment.locale('en')
    const {userData,socket,callNotifition} = useContext(AuthContext);
    const W = Dimensions.get('window').width;
    const H = Dimensions.get('window').height
    const [orderList, setOrderList] = useState([]);
    let dt = new Date();
    const userId = userData.usersData[0].store_id

    
 
    useEffect(()=>{
            let isMounted = (
                socket.off(`withUser-id-${userId}`).on(`withUser-id-${userId}`,(data) => {
                    setOrderList(orderList=> [...orderList,data])
                    callNotifition()
                }),
               axios.post('http://192.168.1.102:3001/getOrder',{
                storeId:userId,
                date:Moment(dt).format('YYYY-MM-DD')
            }).then((res)=> {
                setOrderList(res.data)
            }) 
            )
            
             
            return () => {  isMounted = false,socket.off()}      
    },[])
    return (
        <ImageBackground
            source={require('../assets/img/v748-toon-106.jpg')}
            style={{width:(W),height:(H)}}
        >
            <View
                justifyContent="center"
                width='100%' 
                flexDirection="row"
                mt={4}
                mb={4}     
                >
                    <Container bg='#ffFFFF'  
                        shadowColor='#DC143C'                                 
                        shadowOpacity={1}
                        elevation={7}
                        shadowRadius={20}  
                        borderRadius={10} 
                        width={150} 
                        height={50} 
                        alignItems='center'
                        mr={2}
                        >
                        <TouchableOpacity 
                            onPress={()=> callNotifition()}
                            style={{flex:1,alignItems:'center',width:'100%'}}
                            >
                            <Heading size="md" m={3} >
                                วันที่   
                            </Heading> 
                        </TouchableOpacity>                        
                    </Container> 
                    <Container bg='#ffFFFF'  
                        shadowColor='#DC143C'                                 
                        shadowOpacity={1}
                        elevation={7}
                        shadowRadius={20}  
                        borderRadius={10} 
                        width={150} 
                        height={50} 
                        alignItems='center'
                        ml={2}
                        >
                        <TouchableOpacity 
                            onPress={()=> callNotifition()}
                            style={{flex:1,alignItems:'center',width:'100%'}}
                            >
                            <Heading size="md" m={3} >
                                อื่น ๆ   
                            </Heading> 
                        </TouchableOpacity>                        
                    </Container>
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
                        renderItem={({item})=>
                        <TouchableOpacity
                            style={{
                                marginTop:8
                            }}
                            onPress={()=>{navigation.navigate('orderDetialScreen',
                            {
                                oid:item.oid,
                                cid:item.cid,
                                sid:userData.usersData[0].store_id
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
                                    {item.name} 
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
        </ImageBackground>
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