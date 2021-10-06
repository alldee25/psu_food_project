import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from '@ui-kitten/components';
import axios from 'axios';
import { Divider, FlatList, Heading, Image, Text, View, ScrollView, Input } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';
<<<<<<< HEAD
import { AuthContext } from '../App';
=======
>>>>>>> 8cea6c4331339c741b0dff06a18b9fabaff13b79
import CartScreen from './CartScreen';
import FoodDetialScreen from './FoodDetialScreen';
import OrderConferm from './OrderConferm';

export default function FoodScreen() {
    
    const FoodStack = createStackNavigator()
    
    return(
        <FoodStack.Navigator>
            <FoodStack.Screen
            options={{
                headerShown:false,
            }} 
            name='เมนู' 
            component={FoodList} 
            
            />
            <FoodStack.Screen 
                name='รายละเอียดเมนู'
                options={{
                    headerShown:false,
                }} 
                component={FoodDetialScreen} 
            />
            <FoodStack.Screen 
                name='conferm'
                component={OrderConferm} 
            />
            <FoodStack.Screen 
                name='cart'
                component={CartScreen} 
            />
        </FoodStack.Navigator>
    )
}
const FoodList =({navigation})=>{

    const W = Dimensions.get('window').width;
    const H = Dimensions.get('window').height
    const {cart} = useSelector(state => state.userReducer)
    const [foodDataList,setFoodDataList] = useState([]);
    const {userData} = useContext(AuthContext);
    const {cart} = useSelector(state => state.userReducer)
    const cartFilter = cart.filter(data => data.userId == userData.usersData[0].id)
    const today = new Date();
    const [search, setSearch] = useState('')
    const [searchType, setSearchType] = useState('')
    const [foodFileterDataList, setFoodFileterDataList] = useState([]);
    
    const searchFilter=(textValue)=> {
        if (textValue) {
            const newData = foodDataList.filter((item)=> {
                const itemData = item.food_name ? 
                                    item.food_name.toUpperCase() 
                                    : ''.toUpperCase();
                const textData = textValue.toUpperCase();
                return itemData.indexOf(textData) > -1; 
                })
                setFoodFileterDataList(newData);
                setSearch(textValue)
                      
             } else {
                setFoodFileterDataList(foodDataList)
                setSearch(textValue)
                }
           
    }
    const searchFilterType=(textValue)=> {
        console.log(textValue);
        if (textValue) {
            const newData = foodDataList.filter((item)=> {
                const itemData = item.food_type ? 
                                    item.food_type.toUpperCase() 
                                    : ''.toUpperCase();
                const textData = textValue.toUpperCase();
                return itemData.indexOf(textData) > -1; 
                })
                setFoodFileterDataList(newData);
                setSearch(textValue)
                setSearchType(textValue)
                      
             } else {
                setFoodFileterDataList(foodDataList)
                setSearch(textValue)
                setSearchType(textValue)
                }
           
    }
    useEffect(()=>{
        let isMounted = (
            axios.get('http://192.168.1.102:3001/getFoodMenuListCustomer').then(
                (res) => {
                    setFoodDataList(res.data)
                    setFoodFileterDataList(res.data)
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
        <View
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
                กินอะไรดี 
            </Heading>
            <View
                m={2}
                mr={4}
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
<<<<<<< HEAD
                        {cartFilter.reduce((sum, item)=> sum + item.count, 0)}
=======
                        {cart.reduce((sum, item)=> sum + item.count, 0)}
>>>>>>> 8cea6c4331339c741b0dff06a18b9fabaff13b79
                    </Text>
                </View>
                    
                    <Image
                        mt={0.3}
                        source={require('../assets/img/Asset.png')}
                        alt='cart'
                        style={styles.iconBack}
                    >

                    </Image>
            </TouchableOpacity>
                
            </View>
        </View>
            <View
             width={W} alignItems='center'
            >
            <Input
                value={search}
                color='white' 
                w={'95%'} 
                size="xs" 
                placeholder="ค้นหา" 
                borderRadius={20}
                onChangeText={(textValue)=> searchFilter(textValue)} 
            />
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
                    style={searchType == 'ตามสั่ง' ? styles.buttonTypyActive : styles.buttonTypy}
                    onPress={()=> searchFilterType('ตามสั่ง')}
                >
                <Text
                    color={searchType == 'ตามสั่ง' ? '#1D1F20' : '#FFFF'}
                >
                   เมนูตามสั่ง 
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={searchType == 'เมนูทานเล่น' ? styles.buttonTypyActive : styles.buttonTypy}
                onPress={()=> searchFilterType('เมนูทานเล่น')}
            >
                <Text
                    color={searchType == 'เมนูทานเล่น' ? '#1D1F20' : '#FFFF'}
                >
                   เมนูทานเล่น
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={searchType == 'ข้าวแกง' ? styles.buttonTypyActive : styles.buttonTypy}
                onPress={()=> searchFilterType('ข้าวแกง')}
            >
                <Text
                    color={searchType == 'ข้าวแกง' ? '#1D1F20' : '#FFFF'}
                >
                   ข้าวแกง 
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={()=> searchFilterType('เมนูน้ำ')}
                style={searchType == 'เมนูน้ำ' ? styles.buttonTypyActive : styles.buttonTypy}
            >
                <Text
                    color={searchType == 'เมนูน้ำ' ? '#1D1F20' : '#FFFF'}
                >
                   เมนูน้ำ
                </Text>
            </TouchableOpacity> 
<<<<<<< HEAD
            <TouchableOpacity 
                onPress={()=> searchFilterType('เมนูเส้น')}
                style={searchType == 'เมนูเส้น' ? styles.buttonTypyActive : styles.buttonTypy}
            >
                <Text
                    color={searchType == 'เมนูเส้น' ? '#1D1F20' : '#FFFF'}
                >
                   เมนูเส้น
                </Text>
            </TouchableOpacity> 
            </ScrollView> 
            </View>
            
                <View
                    
                    borderWidth={1}
                    backgroundColor='white'
                    flex={5}
                    borderTopRadius={20}
                    mb={'10%'}
                >

=======
            </ScrollView> 
            </View>
            
            <View
                backgroundColor='white'
                flex={5}
                borderTopRadius={20}
                mb={10}
            >
                
>>>>>>> 8cea6c4331339c741b0dff06a18b9fabaff13b79
                    <FlatList 
                        data={foodFileterDataList}
                        keyExtractor={(item, index) => index}
                        contentContainerStyle={{
<<<<<<< HEAD
                            paddingLeft:7,
                            paddingRight:7,
                            marginBottom:300
=======
                        paddingLeft:7,
                        paddingRight:7
>>>>>>> 8cea6c4331339c741b0dff06a18b9fabaff13b79
                        }}
                        renderItem={({item})=>
                        <TouchableOpacity
                            disabled={item.food_status == !1 || item.s_status  == 'ปิด' || (new Date(item.to_date).getTime() > today.getTime() && today.getTime() > new Date(item.frome_date).getTime())}
                            style={{
                                marginTop:8
                            }}
                            onPress={()=>{navigation.navigate('รายละเอียดเมนู',
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
