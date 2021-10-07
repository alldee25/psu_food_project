
import { Icon } from '@ui-kitten/components';
import axios from 'axios';
import { Divider, FlatList, Heading, Image, Text, View, ScrollView, Input } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';
import { AuthContext } from '../App';

export default function FoodListofStore({navigation,route}) {

    const W = Dimensions.get('window').width;
    const H = Dimensions.get('window').height
    const {cart} = useSelector(state => state.userReducer)
    const [foodDataList,setFoodDataList] = useState([]);
    const {userData} = useContext(AuthContext);
    const cartFilter = cart.filter(data => data.userId == userData.usersData[0].id)
    const today = new Date();


    useEffect(()=>{
        let isMounted = (
            axios.post('http://192.168.1.102:3001/getFoodMenuListCustomerByStore',{
                storeId:route.params.sid
            }).then(
                (res) => {
                    setFoodDataList(res.data)
                }
            )
        )
        return (() =>{
            isMounted= false;
        })
    },[])

    return (
        <View
            h={H}
            w={W}
            backgroundColor='#0B2B53'
        >
            <TouchableOpacity
                    onPress={()=>{ navigation.goBack()}}
                    style={{
                        position:'absolute',
                        width:30,
                        height:30,
                        top:10,
                        zIndex:5,
                        flex:1,                      
                    }}
            >
                <Icon style={styles.icon} fill='white' name='arrow-ios-back-outline' />
            </TouchableOpacity>
            <View
                m={2}
                mr={4}
                position='absolute'
                right={0}
            >
                <TouchableOpacity
                    onPress={()=> navigation.navigate('cart')}
                >
                    <View
                        w={7}
                        position='absolute'
                        zIndex={2}
                        justifyContent='center'
                        alignItems='center'                   
                        top={4}
                        olor='black'
                    >
                        <Text>
                            {cartFilter.reduce((sum, item)=> sum + item.count, 0)}
                        </Text>
                    </View>                   
                    <Image
                        mt={0.3}
                        source={require('../assets/img/Asset.png')}
                        alt='cart'
                        style={styles.iconBack}
                        />
                </TouchableOpacity>
                
            </View>
        <View
        mt={20}
        flex={1}
            w='100%'
            flexDirection='row'
            justifyContent='space-between'
        >
            <Heading
                fontFamily='IBMPlexSansThai-SemiBold'
                m={2}
                ml={3}
                color='#FFFFFF'
            >
                ร้าน :  {route.params.store_name}
            </Heading>
        </View>          
            <View
                
                borderWidth={1}
                backgroundColor='white'
                flex={5}
                borderTopRadius={20}
                mb={'10%'}
            >

                    <FlatList 
                        data={foodDataList}
                        keyExtractor={(item, index) => index}
                        contentContainerStyle={{
                            paddingLeft:7,
                            paddingRight:7,
                            marginBottom:300
                        }}
                        renderItem={({item})=>
                        <TouchableOpacity
                            disabled={item.food_status == !1 || item.s_status  == 'ปิด' || (new Date(item.to_date).getTime() > today.getTime() && today.getTime() > new Date(item.frome_date).getTime())}
                            style={{
                                marginTop:8
                            }}
                            onPress={()=>{navigation.navigate('FoodDetialScreenOdStore',
                            {
                                fId:item.id,
                                sId:item.sId,
                                userId:userData.usersData[0].id,
                                food_img:item.food_img,
                                food_name:item.food_name,
                                food_price:item.food_price,
                                store_name:item.store_name,
                            }) 
                        }}
                        >
                         {item.food_status == !1 || item.s_status  == 'ปิด' || (new Date(item.to_date).getTime() > today.getTime() && today.getTime() > new Date(item.frome_date).getTime()) ? (<View 
                            position='absolute'
                            alignItems='center'
                            justifyContent='center'
                            w={'100%'}
                            h='100%'
                            zIndex={1}
                            opacity={0.5}
                            backgroundColor='black'
                            borderRadius={20}
                            
                            >
                                { item.s_status  == 'ปิด' && (new Date(item.to_date).getTime() > today.getTime() && today.getTime() > new Date(item.frome_date).getTime()) == false ? 
                                <Heading
                                    color='white'
                                > 
                                    ร้านปิดแล้ว
                                </Heading> 
                            :
                            (new Date(item.to_date).getTime() > today.getTime() && today.getTime() > new Date(item.frome_date).getTime()) == true ?
                            <Heading
                                color='white'
                            > 
                                ร้านเปิดวันที่ {item.to_date} 
                            </Heading>
                            
                        :
                        <Heading
                                color='white'
                            > 
                                หมด 
                            </Heading>
                        }
                            </View>):(<></>)}   
                        <View style={{
                            flexDirection:'row',
                           
                            backgroundColor:'#E4E4F4',
                            borderRadius:20,
                        }}>                      
                            <Image
                                style={{
                                    width:120,               
                                    height:120,                                  
                                    borderRadius:20,                                                                                                                     
                                }}
                                alt={item.food_name}
                                source={{uri:`http://192.168.1.102:3001/userUploaded/${item.food_img}`}}                           
                            />
                            <View style={{marginLeft:10,marginTop:2,width:'60%',flex:1,alignItems:'flex-start'}}>
                               
                                    <Text fontFamily='IBMPlexSansThai-SemiBold' style={{fontSize:18}}>
                                        {item.food_name} 
                                    </Text>                              
                                <Divider w='100%' bgColor='#888888' alignSelf='center' />
                                <Text fontFamily='IBMPlexSansThai-Regular' style={{fontSize:18}}>
                                   {item.food_type}
                                </Text>
                                <Text fontFamily='IBMPlexSansThai-Regular' style={{fontSize:18}}>
                                    ร้าน : {item.store_name} 
                                </Text> 
                                <Text fontFamily='IBMPlexSansThai-Regular' style={{fontSize:18}}>
                                    ราคา: {item.food_price} บาท 
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
        height:50,
        margin:10,
        
    },
    buttonTypyActive:{
        justifyContent:'center',
        alignItems:'center',
        borderColor:'white',
        borderWidth:1,
        borderRadius:20,
        width:100,
        height:50,
        margin:10,
        backgroundColor:'#FFFF'
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
