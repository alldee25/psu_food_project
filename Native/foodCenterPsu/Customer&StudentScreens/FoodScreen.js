import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from '@ui-kitten/components';
import axios from 'axios';
import { Divider, FlatList, Heading, Image, Text, View, ScrollView, Input } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import FoodDetialScreen from './FoodDetialScreen';

export default function FoodScreen() {
    const FoodStack = createStackNavigator()
    return(
        <FoodStack.Navigator>
            <FoodStack.Screen
            options={{
                headerShown:false
            }} 
            name='เมนู' 
            component={FoodList} 
            
            />
            <FoodStack.Screen name='รายละเอียดเมนู' component={FoodDetialScreen} />
        </FoodStack.Navigator>
    )
}
const FoodList =({navigation})=>{
    const W = Dimensions.get('window').width;
    const H = Dimensions.get('window').height
    const [foodDataList,setFoodDataList] = useState();

    useEffect(()=>{
        let isMounted = (
            axios.get('http://192.168.1.102:3001/getFoodMenuListCustomer').then(
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
        
            <Heading
                fontFamily='IBMPlexSansThai-SemiBold'
                m={2}
                ml={3}
                color='#FFFFFF'
            >
                กินอะไรดี 
            </Heading>
            <View
             width={W} alignItems='center'
            >
            <Input w={'95%'} size="xs" placeholder="ค้นหา" borderRadius={20} />
            </View>          
            <View
                
                flexDirection='row'
                justifyContent='space-around'
                width={W}
                flex={1}
            >
                
                <ScrollView 
                    contentContainerStyle={{alignItems:'center'}}         
                    width={W}
                    horizontal={true} 
                >
                <TouchableOpacity
                    style={styles.buttonTypy}
                >
                <Text
                    color='#1D1F20'
                >
                   เมนูตามสั่ง 
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonTypy}
            >
                <Text
                    color='#1D1F20'
                >
                   เมนูทานเล่น
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonTypy}
            >
                <Text
                    color='#1D1F20'
                >
                   ข้าวแกง 
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.buttonTypy}
            >
                <Text
                    color='#1D1F20'
                >
                   เมนูน้ำ
                </Text>
            </TouchableOpacity> 
            <TouchableOpacity 
                style={styles.buttonTypy}
            >
                <Text
                    color='#1D1F20'
                >
                   เมนูน้ำ
                </Text>
            </TouchableOpacity> 
            <TouchableOpacity 
                style={styles.buttonTypy}
            >
                <Text
                    color='#1D1F20'
                >
                   เมนูน้ำ
                </Text>
            </TouchableOpacity> 
            <TouchableOpacity 
                style={styles.buttonTypy}
            >
                <Text
                    color='#1D1F20'
                >
                   เมนูน้ำ
                </Text>
            </TouchableOpacity> 
            </ScrollView> 
            </View>
            
            <View
                backgroundColor='white'
                flex={5}
                borderTopRadius={15}
            >
                
                    <FlatList 
                        data={foodDataList}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{
                        paddingLeft:10,
                        paddingRight:10
                        }}
                        renderItem={({item})=>
                        <TouchableOpacity
                            onPress={()=>{navigation.navigate('รายละเอียดเมนู',{id:item.id}) }}
                        >
                        <View style={{flexDirection:'row',
                            marginTop:8,
                            padding:10,
                            backgroundColor:'#E4E4F4',
                            borderRadius:20,
                            marginBottom:5,
                            
                        }}>
                            <Image
                                style={{width:120,               
                                    height:120,
                                    marginLeft:5,
                                    borderRadius:20,                                                                                                                     
                                }}
                                alt={item.food_name}
                                source={{uri:`http://192.168.1.102:3001/userUploaded/${item.food_img}`}}                           
                            />
                            <View style={{marginLeft:10,width:'60%',flex:1,alignItems:'flex-start'}}>
                                <Text fontFamily='IBMPlexSansThai-SemiBold' style={{fontSize:18}}>
                                    {item.food_name}
                                </Text> 
                                <Divider w='100%' bgColor='#888888' alignSelf='center' />
                                <Text fontFamily='IBMPlexSansThai-Regular' style={{fontSize:18}}>
                                    ประเภท: {item.food_type}
                                </Text> 
                                <Text fontFamily='IBMPlexSansThai-Regular' style={{fontSize:18}}>
                                    ราคา: {item.food_price} บาท
                                </Text>
                                <View flexDirection='row'>
                                    <Text fontFamily='IBMPlexSansThai-Regular'>สถานะ : </Text>{item.food_status == 1 ? (<Text fontFamily='IBMPlexSansThai-Regular'>มี</Text>) :  (<Text fontFamily='IBMPlexSansThai-Regular'>หมดแล้ว</Text>)}                                      
                                </View>                                       
                            </View>
                            <View h={'100%'} justifyContent='center'>
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
        height:70,
        margin:10,
        backgroundColor:'#F8F1FF'
    },
    icon: {
        width: 42,
        height: 30,
        color:"black"
        },
})