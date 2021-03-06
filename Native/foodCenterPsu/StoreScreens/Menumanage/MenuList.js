import { createStackNavigator } from '@react-navigation/stack'
import { Icon,Tab,TabView, Toggle, Layout } from '@ui-kitten/components';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/core'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet, SafeAreaView, Image,ScrollView, Dimensions , TouchableOpacity, Alert} from 'react-native'
import { AuthContext } from '../../App';
import ButtonTop from './ButtonAdd';
import {
    View,
    Text,
    Actionsheet,
    useDisclose,
    FlatList,
    Avatar,
    Menu,
    Divider,
  } from "native-base"
import FormAddOption from './AddOption';
import FormAddSpecialOption from './AddSpecialOption';
import FormAddMenu from './AddMenu';
import FormEditMenu from './EditMenu';
import Payment from './Payment';

const stackMenuManage = createStackNavigator()

export default function stackMenuManageScreen(){
    return (
        <stackMenuManage.Navigator>
            <stackMenuManage.Screen name='จัดการเมนูอาหาร' component={MenuManage} />
            <stackMenuManage.Screen name='FormAddMenu' component={FormAddMenu} />
            <stackMenuManage.Screen name='FormEditMenu' component={FormEditMenu} />
        </stackMenuManage.Navigator>
    )
}

const  MenuManage =({navigation})=> {
    const isFocused = useIsFocused()
    const HEIGHT = Dimensions.get('window').height
    const { isOpen, onOpen, onClose } = useDisclose()
    const {userData} = useContext(AuthContext);
    const [foodDataList,setFoodDatalist] = useState([]);
    const [foodOptions,setFoodOptions] = useState([]);
    const [foodSpecialOptions,setFoodSpecialOptions] = useState([]);
    const [payment,setPayment] = useState([]);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [effect, setEffect] = React.useState(false);
    const childRef = useRef()
    const childRefOpSp = useRef()
    const childRefPayment = useRef()
    const [shouldOverlapWithTrigger] = React.useState(false)
    const [position, setPosition] = React.useState("auto")

    

    const changModalStatus =()=>{
        onOpen() 
    }

    const onCheckedChange = (status,id) => {
        
        axios.post('http://192.168.1.102:3001/changStatus',{
            storeId:id,
            status:status
        }).then(
            setEffect(!effect)
        )
    };

    const deleteItem =(id)=>{
        axios.post('http://192.168.1.102:3001/deleteMenu',{
            menuId:id
        }).then((res)=>{
            if (res.data.err) {
                Alert.alert(
                    'ลองใหม่อีกครั้ง',
                    'ไม่สามารถดำเนินการ'
                )
            } else {
                Alert.alert(
                'ลบเรียบร้อย',
                'ลบเรียบร้อย'
               
            )
             setEffect(!effect)
        }
        })
    }
 /*    const deleteSOption =(id)=>{
        axios.post('http://192.168.1.102:3001/deleteSpOption',{
            sOption:id
        }).then((res)=>{
            if (res.data.err) {
                Alert.alert(
                    'ลองใหม่อีกครั้ง',
                    'ไม่สามารถดำเนินการ'
                )
            } else {
                Alert.alert(
                'ลบเรียบร้อย',
                'ลบเรียบร้อย'
               
            )
             setEffect(!effect)
        }
        })
    } */
    const deletePayment =(id)=>{
        axios.post('http://192.168.1.102:3001/deletePayment',{
            paymentId:id
        }).then((res)=>{
            if (res.data.err) {
                Alert.alert(
                    'ลองใหม่อีกครั้ง',
                    'ไม่สามารถดำเนินการ'
                )
            } else {
                Alert.alert(
                'ลบเรียบร้อย',
                'ลบเรียบร้อย'
               
            )
             setEffect(!effect)
        }
        })
    }
    const deleteNOption =(id)=>{
        axios.post('http://192.168.1.102:3001/deleteNOption',{
            nOption:id
        }).then((res)=>{
            if (res.data.err) {
                Alert.alert(
                    'ลองใหม่อีกครั้ง',
                    'ไม่สามารถดำเนินการ'
                )
            } else {
                Alert.alert(
                'ลบเรียบร้อย',
                'ลบเรียบร้อย'
               
            )
             setEffect(!effect)
        }
        })
    }

    useEffect(()=>{
        let isMounted = true;
        navigation.setOptions({
            headerRight: () => (
                <ButtonTop ref={changModalStatus}
                />   
            ),
          });
            axios.post('http://192.168.1.102:3001/getFoodMenuList',{
            storeId:userData.usersData[0].store_id
        }).then((res)=>{
            setFoodDatalist(res.data);
        }).then(
            axios.post('http://192.168.1.102:3001/getOption',{
                storeId:userData.usersData[0].store_id
            }).then((res)=>{
                setFoodOptions(res.data)
            })
        )
        .then(
            axios.post('http://192.168.1.102:3001/getSpecialOption',{
                storeId:userData.usersData[0].store_id
            }).then((res)=>{
                setFoodSpecialOptions(res.data)
            })
        )
        .then(
            axios.post('http://192.168.1.102:3001/getPayment',{
                storeId:userData.usersData[0].store_id
            }).then((res)=>{
                setPayment(res.data)
            })
        )
        
        return () => { isMounted = false }; 
    },[effect,isFocused])
    return(
        <SafeAreaView>
            <FormAddOption 
                ref={childRef}
                isClose={onClose} 
            />
            <FormAddSpecialOption 
                ref={childRefOpSp}
                isClose={onClose} 
            />    
            <Payment 
                ref={childRefPayment}
                isClose={onClose}
            />
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Divider borderColor="gray.300" />
                    <Actionsheet.Item
                        onPress={()=> {navigation.navigate('FormAddMenu'),onClose()}}
                        _text={{
                        color: "blue.500",
                        }}
                    >
                        เพิ่มเมนู
                    </Actionsheet.Item>
                    <Divider borderColor="gray.300" />
                    <Actionsheet.Item
                    onPress={()=> {childRef.current.openModale()}}
                        _text={{
                        color: "blue.500",
                        }}
                    >
                        เพิ่มตัวเลือก
                    </Actionsheet.Item>
                    <Divider borderColor="gray.300" />
                    {/* <Actionsheet.Item
                    onPress={()=> {childRefOpSp.current.openModalSpecialOption()}}
                        _text={{
                        color: "blue.500",
                        }}
                    >
                        เพิ่มตัวเลือกพิเศษ
                    </Actionsheet.Item> */}
                    <Actionsheet.Item
                    onPress={()=> {childRefPayment.current.openModalPayment()}}
                        _text={{
                        color: "blue.500",
                        }}
                    >
                        เพิ่มช่องทางการชำระเงิน
                    </Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
            <TabView
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}>
                <Tab 
                title='รายการอาหาร'>
                    <View
                        style={{width:'100%',height:'100%'}}                    
                        >
                        <View style={styles.menuList}>
                            <FlatList 
                                data={foodDataList}
                                keyExtractor={(item) => item.id}
                                contentContainerStyle={{
                                    paddingLeft:7,
                                    paddingRight:7,
                                    marginBottom:300
                                }}
                                renderItem={({item})=>
                                <View style={{flexDirection:'row',
                                    marginTop:8,                                
                                    backgroundColor:'#E4E4F4',
                                    borderRadius:15,
                                    marginBottom:5,
                                    height:130
                                    
                                }}>
                                    <Image
                                        resizeMode='cover'
                                        style={{width:120,               
                                            height:'100%',                                           
                                            borderRadius:15,                                                                                                                     
                                        }}
                                        source={{uri:`http://192.168.1.102:3001/userUploaded/${item.food_img}`}}                           
                                    />
                                    <View style={{marginLeft:10,width:'60%',flex:1,alignItems:'flex-start'}}>
                                        <Text fontFamily='IBMPlexSansThai-SemiBold' style={{fontSize:18}}>
                                            อาหาร: {item.food_name}
                                        </Text> 
                                        <Divider w='80%' bgColor='#888888' alignSelf='flex-start' />
                                        <Text fontFamily='IBMPlexSansThai-Regular' style={{fontSize:18}}>
                                            ประเภท: {item.food_type}
                                        </Text> 
                                        <Text fontFamily='IBMPlexSansThai-Regular' style={{fontSize:18}}>
                                            ราคา: {item.food_price} บาท
                                        </Text>                                       
                                        <Toggle status='success' checked={item.food_status == 1} onChange={()=>{onCheckedChange(!item.food_status,item.id)}}>
                                            <Text fontFamily='IBMPlexSansThai-Regular'>สถานะ : </Text>{item.food_status == 1 ? (<Text fontFamily='IBMPlexSansThai-Regular'>มี</Text>) :  (<Text fontFamily='IBMPlexSansThai-Regular'>หมด</Text>)}
                                        </Toggle>
                                                                               
                                    </View>
                                    <Menu
                                        style={{marginRight:10}}
                                        shouldOverlapWithTrigger={shouldOverlapWithTrigger} 
                                        placement={position == "auto" ? undefined : position}
                                        trigger={(triggerProps) => {
                                        return (
                                        <Text style={{position:'absolute',top:10,right:5}}>
                                            <TouchableOpacity alignSelf="center" variant="solid" {...triggerProps}>                                        
                                                <Icon name='more-vertical-outline' fill='#F08080' style={styles.icon} />                                   
                                            </TouchableOpacity>
                                            </Text>
                                        )
                                        }}
                                    >
                                            <Menu.Item
                                                onPress={()=> navigation.navigate('FormEditMenu',{                                   
                                                    foodId:item.id,
                                                    imagePreview:item.food_img,
                                                    foodName:item.food_name,
                                                    foodType:item.food_type,
                                                    foodprice:String(item.food_price) 
                                                })}
                                            >แก้ไข</Menu.Item>
                                            <Menu.Item
                                                onPress={()=> deleteItem(item.id)}
                                            >ลบ</Menu.Item>
                                        </Menu>                                                            
                                </View>                                
                               }
                            />        
                        </View>
                        </View>
                        
                </Tab>
                {/* <Tab title='พิเศษ'>
                <View
                        style={{width:'100%',height:'100%'}}
                        source={require('../../assets/img/v748-toon-106.jpg')}
                        >
                    <View style={styles.menuList}>
                            <FlatList 
                                data={foodSpecialOptions}
                                keyExtractor={(item) => item.id}
                                contentContainerStyle={{
                                padding:10
                                }}
                                renderItem={({item,index})=>
                                <View style={{flexDirection:'row',padding:10,backgroundColor:'#E4E4F4',borderRadius:5,marginBottom:5}}>
                                   <Avatar
                                        source={{
                                        uri: "https://pbs.twimg.com/profile_images/1188747996843761665/8CiUdKZW_400x400.jpg",
                                        }}
                                    >
                                        <Text fontSize="xl">{index+1}</Text>                           
                                    </Avatar>
                                    <View style={{marginLeft:10}}>
                                        <Text style={{fontSize:22}}>
                                           {item.special_option_name}
                                        </Text>                                     
                                        <Text style={{fontSize:18}}>
                                            ราคา: {item.price} บาท
                                        </Text>  
                                    </View>
                                    <Menu
                                        style={{marginRight:10}}
                                        shouldOverlapWithTrigger={shouldOverlapWithTrigger} 
                                        placement={position == "auto" ? undefined : position}
                                        trigger={(triggerProps) => {
                                        return (
                                        <Text style={{position:'absolute',top:10,right:5}}>
                                            <TouchableOpacity alignSelf="center" variant="solid" {...triggerProps}>                                        
                                                <Icon name='more-vertical-outline' fill='#F08080' style={styles.icon} />                                   
                                            </TouchableOpacity>
                                            </Text>
                                        )
                                        }}
                                    >                                       
                                            <Menu.Item
                                                onPress={()=> deleteSOption(item.id)}
                                            >
                                                ลบ
                                            </Menu.Item>
                                        </Menu>                         
                                </View>                                
                                }
                            />        
                        </View>              
                    </View>
                </Tab> */}
                <Tab title='ช่องทางการชำระเงิน'>
                <View
                        style={{width:'100%',height:'100%'}}
                        source={require('../../assets/img/v748-toon-106.jpg')}
                        >
                    <View style={styles.menuList}>
                            <FlatList 
                                data={payment}
                                keyExtractor={(item) => item.id}
                                contentContainerStyle={{
                                padding:10
                                }}
                                renderItem={({item,index})=>
                                <View style={{flexDirection:'row',padding:10,backgroundColor:'#E4E4F4',borderRadius:5,marginBottom:5}}>
                                   <Avatar
                                        source={{
                                        uri: "https://pbs.twimg.com/profile_images/1188747996843761665/8CiUdKZW_400x400.jpg",
                                        }}
                                    >
                                        <Text fontSize="xl">{index+1}</Text>                           
                                    </Avatar>
                                    <View style={{marginLeft:10}}>
                                        <Text style={{fontSize:22}}>
                                           {item.payment_name}
                                        </Text>                                      
                                    </View>
                                    <Menu
                                        style={{marginRight:10}}
                                        shouldOverlapWithTrigger={shouldOverlapWithTrigger} 
                                        placement={position == "auto" ? undefined : position}
                                        trigger={(triggerProps) => {
                                        return (
                                        <Text style={{position:'absolute',top:10,right:5}}>
                                            <TouchableOpacity alignSelf="center" variant="solid" {...triggerProps}>                                        
                                                <Icon name='more-vertical-outline' fill='#F08080' style={styles.icon} />                                   
                                            </TouchableOpacity>
                                            </Text>
                                        )
                                        }}
                                    >                                       
                                            <Menu.Item
                                                onPress={()=> deletePayment(item.id)}
                                            >
                                                ลบ
                                            </Menu.Item>
                                        </Menu>                         
                                </View>                                
                                }
                            />        
                        </View>              
                    </View>
                </Tab>
                <Tab title='ตัวเลือก'>
                <View
                        style={{width:'100%',height:'100%'}}
                        source={require('../../assets/img/v748-toon-106.jpg')}
                        >
                    <View style={styles.menuList}>
                            <FlatList 
                                data={foodOptions}
                                keyExtractor={(item) => item.id}
                                contentContainerStyle={{
                                padding:10
                                }}
                                renderItem={({item,index})=>
                                <View style={{display:'flex',alignItems:"center",flexDirection:'row',padding:10,backgroundColor:'#00FFFF',borderRadius:5,marginBottom:5}}>
                                   <View
                                        style={{display:'flex',alignItems:"center",justifyContent:'center',backgroundColor:'#ffff',width:55,height:55,borderRadius:55/2}}
                                    >
                                        <Text fontSize="xl">{index+1}</Text>                           
                                    </View>
                                    <View style={{marginLeft:10}}>
                                        <Text style={{fontSize:22}}>
                                           {item.option_name}
                                        </Text>                                                                             
                                    </View>
                                    <Menu
                                        style={{marginRight:10}}
                                        shouldOverlapWithTrigger={shouldOverlapWithTrigger} 
                                        placement={position == "auto" ? undefined : position}
                                        trigger={(triggerProps) => {
                                        return (
                                        <Text style={{position:'absolute',top:10,right:5}}>
                                            <TouchableOpacity alignSelf="center" variant="solid" {...triggerProps}>                                        
                                                <Icon name='more-vertical-outline' fill='#F08080' style={styles.icon} />                                   
                                            </TouchableOpacity>
                                            </Text>
                                        )
                                        }}
                                    >
                                            <Menu.Item
                                                onPress={()=> deleteNOption(item.id)}
                                            >ลบ</Menu.Item>
                                        </Menu>                         
                                </View>                                
                                }
                            />        
                        </View>
                    </View>
                </Tab>      
            </TabView> 
        </SafeAreaView> 
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
        height:'84%'
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
