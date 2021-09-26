import { Divider, Icon } from '@ui-kitten/components'
import axios from 'axios'
import { Button, FlatList, Text, View } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'

export default function OrderDetialScreen({route}) {
    const W = Dimensions.get('window').width
    const H = Dimensions.get('window').height
    const [orderDetial,setOrderDetial] = useState([])
    const [isloading, setIsloading] = useState(false)

    const setStatusOrder =(value)=> {
        setIsloading(value.id)
        axios.post('http://192.168.1.102:3001/updateStatusOrder',{
            id:value.id,
            status:value.status
        }).then(()=>{
           setIsloading(false) 
        })
        
    }
    useEffect(()=>{
       
            axios.post('http://192.168.1.102:3001/getOrderDetial',{
            oid:route.params.oid,
            sid:route.params.sid,
        }).then((res)=> {
            setOrderDetial(res.data)
        })
        
    },[isloading])

    return (
        <View
            bgColor='#fff'
            w={W}
            h={H}
        >
             <FlatList 
                data={orderDetial}
                keyExtractor={(item,index) => index}
                contentContainerStyle={{
                paddingLeft:7,
                paddingRight:7
                }}
                renderItem={({item})=>                    
                    <View style={{
                        flexDirection:'column',
                        padding:10,
                        backgroundColor:'#E4E4F4',
                        borderRadius:20,
                        marginTop:8
                    }}>
                            
                            <Text fontFamily='IBMPlexSansThai-SemiBold' style={{fontSize:18}}>
                                {item.food_name} 
                            </Text>                                                                                    
                            <Text fontFamily='IBMPlexSansThai-Regular' style={{fontSize:18}}>
                                {item.quantity} 
                            </Text>                                                                     
                            
                            <View
                              borderRadius={10} borderWidth={1} width={150} height={10}
                              alignItems='center' justifyContent='center'  
                            >
                                <Text fontFamily='IBMPlexSansThai-Regular' style={{fontSize:18}}>
                                    {item.text} 
                                </Text> 
                            </View> 
                              <Text fontFamily='IBMPlexSansThai-Regular' style={{fontSize:18}}>
                                {item.option_name} 
                            </Text>  
                            <Text fontFamily='IBMPlexSansThai-Regular' style={{fontSize:18}}>
                                {item.package} 
                            </Text>
                            <View  justifyContent='center' >
                                {item.status == '' ? (<Button
                                    disabled={isloading != false} 
                                    borderRadius={20}
                                    width={120}
                                    isLoading={isloading == item.id} 
                                    isLoadingText="Loading..."
                                    onPress={() => setStatusOrder({id:item.id,status:'รับออรเดอร์'})}
                                >
                                    <Text>รับออรเดอร์</Text>
                                </Button>) : item.status == 'รับออรเดอร์' ?
                                (<Button 
                                    disabled={isloading != false} 
                                    isLoading={isloading == item.id} 
                                    isLoadingText="Loading..."
                                    borderRadius={20}
                                    width={120}
                                    onPress={() => setStatusOrder({id:item.id,status:'เสร็จแล้ว'})}
                                >
                                    <Text>เสร็จแล้ว</Text>
                                </Button>)
                                : (<Button 
                                    borderRadius={20}
                                    width={120}
                                    disabled
                                >
                                    <View
                                        flexDirection='row'
                                    >
                                    <Text>เสร็จแล้ว</Text><Icon style={{width:25,height:20}} fill='green' name='checkmark-outline' />
                                    </View>
                                </Button>)
                                    }                                                       
                            </View>                                                            
                        </View>                                                     
                        }
                    />
        </View>
    )
}
