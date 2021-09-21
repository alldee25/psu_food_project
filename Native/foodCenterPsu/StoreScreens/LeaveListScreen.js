import { useIsFocused } from '@react-navigation/core'
import { Icon } from '@ui-kitten/components'
import axios from 'axios'
import { Divider, FlatList, Heading, Menu, ScrollView, Text, View } from 'native-base'
import React, { useContext, useState, useEffect, useRef } from 'react'
import { Alert, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native'
import { AuthContext } from '../App'
import ButtonTop from './Menumanage/ButtonAdd'
import Moment from 'moment';

export default function LeaveListScreen({navigation}) {

    Moment.locale('en')
    const W = Dimensions.get('window').width;
    const H = Dimensions.get('window').height
    const isFocused = useIsFocused();
    const {userData} = useContext(AuthContext)
    const [leaveDataList,setLeaveDataList] = useState([])
    const [shouldOverlapWithTrigger] = React.useState(false)
    const [position, setPosition] = React.useState("auto")
    const moviesRef = useRef(null)
    const [isload, setIsload] = useState(false) 

    

    const AddLeave =()=>{
        if (moviesRef.current) {
            navigation.navigate('เพิ่มลาพักจำหน่ายอาหาร') 
        } else {
          Alert.alert(
                'ไม่สามารถเพิ่มได้',
                'คุณมีรายการที่รอดำเนินการอยู่แล้ว'
            ) 
        }
        
    }
    const deleteLeave =(id)=>{
        
        axios.post('http://192.168.1.102:3001/deleteLeaveList',{
            leaveId:id
        }).then((res)=>{
            if (res.data.err) {
                Alert.alert(
                    res.data.err,
                    'ไม่สามารถดำเนินการ'
                )
            } else {
                Alert.alert(
                'ลบเรียบร้อย',
                'ลบเรียบร้อย'
            )
            setIsload(!isload)
        }
        }) 
    }
    useEffect(() => {
        navigation.setOptions({
        headerRight: () => (
            <ButtonTop ref={AddLeave}
            />   
        ),
      });
            
      let isMounted = (axios.post('http://192.168.1.102:3001/getLeaveList',{
        userId:userData.usersData[0].id
        }).then((res)=>{
           moviesRef.current = res.data.every((data)=>{
                return data.status !== 'รอดำเนินการ'
            })
            setLeaveDataList(res.data)       
        }).catch(error =>{
            console.log(error);
            throw error;
        })) 
        return () => { isMounted = false } 
    },[isFocused,isload])

    return (
       
        <SafeAreaView
        style={{
                backgroundColor:'#F8F1FF',
                width:'100%',
                height:'100%'}}
        >
            <View style={styles.menuList}>                           
                <FlatList 
                    data={leaveDataList}
                    keyExtractor={(item) => item.leaveStoreId}
                    contentContainerStyle={{
                    paddingLeft:10,
                    paddingRight:10
                    }}
                    renderItem={({item})=>
                    <View style={{flexDirection:'row',
                        marginTop:8,
                        padding:10,
                        backgroundColor:'#FFFF',
                        borderRadius:10,
                        
                    }}>                        
                        <View style={{marginLeft:10,width:'100%'}}>
                            <Text style={{fontSize:20}}>
                                
                                หัวข้อการลา : <Text style={{fontSize:20}} color='#6400CD'>{item.title_leave}</Text> 
                            </Text>
                            <Divider my={2} w='100%' bgColor='#BBBBBB' alignSelf='center' />
                            <View flexDirection={'column'} >
                               <Text style={{fontSize:18}}>
                                    ตั้งแต่วันที่ :  <Text color='#6400CD'>{item.frome_date}</Text>
                                </Text> 
                                <Text style={{fontSize:18}}>
                                   ถึงวันที่ : <Text color='#6400CD'>{item.to_date} </Text> 
                                </Text>
                            </View> 
                                                                                           
                            <Text>สถานะ : {item.status == 'อนุญาต' ? <Text color='#66B032'>อนุญาต</Text> : item.status == 'ไม่อนุญาต' ? <Text color='#6400CD'>อนุญาต</Text> : <Text color='#6400CD'>รอดำเนินการ</Text>}</Text>                                                                                               
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
                                onPress={()=> deleteLeave(item.leaveStoreId)}
                                isDisabled={item.status !== 'รอดำเนินการ'}
                            >ลบ</Menu.Item>
                            </Menu>                                                            
                    </View>                                
                    }
                />        
            </View>
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
        height:'100%'
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
