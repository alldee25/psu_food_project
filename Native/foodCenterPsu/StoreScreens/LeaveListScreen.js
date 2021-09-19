import { useIsFocused } from '@react-navigation/core'
import { Icon } from '@ui-kitten/components'
import axios from 'axios'
import { Divider, FlatList, Heading, Menu, ScrollView, Text, View } from 'native-base'
import React, { useContext, useState, useEffect } from 'react'
import { Alert, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native'
import { AuthContext } from '../App'
import ButtonTop from './Addmenu/ButtonAdd'
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
    const [status, setStatus] = useState('') 

    const Add =()=>{
           
        if (!status) {
            Alert.alert(
                'ไม่สามารถเพิ่มได้',
                'คุณมีรายการที่รอดำเนินการอยู่แล้ว'
            )
        } else {
           navigation.navigate('เพิ่มลาพักจำหน่ายอาหาร') 
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
            isFocused
        }
        }) 
    }
    useEffect(() => {

        let isMounted = (axios.post('http://192.168.1.102:3001/getLeaveList',{
        userId:userData.usersData[0].id
        }).then((res)=>{
            setLeaveDataList(res.data) 
             setStatus(res.data.every((data)=>{
                return data.status !== 'รอดำเนินการ'
            }));       
        }).catch(error =>{
            console.log(error);
            throw error;
        }))
        
        return () => {
            isMounted = false
        }
    },[isFocused])

    return (
       
        <SafeAreaView
        style={{backgroundColor:'#F8F1FF'}}
        >
            <ButtonTop 
                ref={Add}
                status={status}
            />
            <View style={styles.menuList}>  
            {leaveDataList == '' ? <Heading flex={1} alignSelf='center' top='50%' fontSize={20}>--ไม่มีราการลา--</Heading> : 
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
                        backgroundColor:'#00FFFF',
                        borderRadius:5,
                        marginBottom:5,
                        shadowColor:'#FF0000',
                        shadowOpacity:1,
                        shadowRadius:20,                                  
                        elevation:7
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
                />}        
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
        height:'99.9%'
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
