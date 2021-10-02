import axios from 'axios'
import { Divider, Icon } from '@ui-kitten/components'
import { Button, FlatList, Text, View } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../App'
import { Dimensions } from 'react-native'

export default function OrderDetialcusScreen ({route}){

    const W = Dimensions.get('window').width;
    const H = Dimensions.get('window').height
    
    const {socket,userData,callNotifitionUser} = useContext(AuthContext)
    let [orderDetialUser,setOrderDetialUser] = useState([])
    const [open, setOpen] = useState(true); 
    const userId = userData.usersData[0].id 

    socket.off(`withCus-id-${userId}`).on(`withCus-id-${userId}`,(data) => { 
        objIndex = orderDetialUser.findIndex(obj => obj.id == data[0].id);
        if (objIndex !== -1) {
        let newData = [...orderDetialUser]
        newData[objIndex].status = data[0].status; 
        if (open) {
            
            setOrderDetialUser(newData) 
        }           
              
    }
        })
    
    useEffect(()=>{  
        let isMounted = (
        
        setOpen(true),  
                axios.post('http://192.168.1.102:3001/getOrderUserDetial',{
            userId:userId,
            oid:route.params.id,
        }).then((res)=>{
            setOrderDetialUser(res.data)
        }) 
        )
       return ()=> { isMounted = false,setOpen(false),socket.off() } 
        
    },[])
    return (
        <View
            bgColor='#fff'
            w={W}
            h={'99.5%'}
        >
             <FlatList 
                data={orderDetialUser}
                keyExtractor={(item,index) => index}
                contentContainerStyle={{
                paddingLeft:7,
                paddingRight:7
                }}
                renderItem={({item})=>                    
                    <View style={{
                        flexDirection:'row',
                        padding:10,
                        backgroundColor:'#E4E4F4',
                        borderRadius:20,
                        marginTop:8
                    }}>
                       
                        <View style={{marginLeft:10,width:'60%',flex:1,alignItems:'flex-start'}}>
                            <Text fontFamily='IBMPlexSansThai-SemiBold' style={{fontSize:18}}>
                                {item.food_name} 
                            </Text>                              
                            <Divider w='100%' bgColor='#888888' alignSelf='flex-start' />                             
                            <Text fontFamily='IBMPlexSansThai-Regular' style={{fontSize:18}}>
                                {item.quantity} 
                            </Text>                                                                     
                            
                            <View
                                borderRadius={5} borderWidth={1} width={150} height={20}
                                p={2}
                                alignItems='flex-start' justifyContent='flex-start'  
                            >
                                <Text fontFamily='IBMPlexSansThai-Regular' style={{fontSize:16}}>
                                    {item.text} 
                                </Text> 
                            </View> 
                            <Text fontFamily='IBMPlexSansThai-Regular' style={{fontSize:18}}>
                                {item.option_name} 
                            </Text>  
                            <Text fontFamily='IBMPlexSansThai-Regular' style={{fontSize:18}}>
                                {item.package} 
                            </Text> 
                            <Text fontFamily='IBMPlexSansThai-Regular' style={{fontSize:18}}>
                               ร้าน {item.store_name} 
                            </Text>                                                                  
                        </View>
                            <View  justifyContent='flex-start' >
                                {item.status == '' ? (
                                    <View
                                    flexDirection='row' borderRadius={15} borderWidth={1} width={120} height={10}
                                    alignItems='center' justifyContent='center'
                                ><Text>รอรับออรเดอร์</Text></View>
                                ) : item.status == 'รับออรเดอร์' ?
                                ( <View
                                    flexDirection='row' borderRadius={15} borderWidth={1} width={120} height={10}
                                    alignItems='center' justifyContent='center'
                                ><Text>รับออรเดอร์แล้ว</Text></View>) : ( 
                                <View                                 
                                    flexDirection='row' borderRadius={15} borderWidth={1} width={120} height={10}
                                    alignItems='center' justifyContent='center'
                                    
                                >
                                        <Text
                                        >เสร็จแล้ว</Text><Icon style={{width:25,height:25}} fill='#63C328' name='checkmark-outline' />
                                    </View>
                                )
                                    }                                                       
                            </View>                                                            
                        </View>                                                     
                        }
                />
        </View>
    )
}