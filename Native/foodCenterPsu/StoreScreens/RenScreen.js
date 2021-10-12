import { useIsFocused } from '@react-navigation/core'
import { Icon } from '@ui-kitten/components'
import axios from 'axios'
import { Divider, FlatList, Heading, Menu, ScrollView, Text, View } from 'native-base'
import React, { useContext, useState, useEffect } from 'react'
import { Alert, StyleSheet, TouchableOpacity } from 'react-native'
import { AuthContext } from '../App'
import Moment from 'moment';

export default function RenScreen({navigation}) {
    Moment.locale('en')
    const {userData} = useContext(AuthContext)
    const [renDataList,setRenDataList] = useState([])

    useEffect(() => {

        let isMounted = (
           axios.post('http://192.168.1.102:3001/getRenList',{
            storeId:userData.usersData[0].store_id
        }).then((res)=>{
            setRenDataList(res.data) 
            console.log(res.data);      
        }).catch(error =>{
            console.log(error);
            throw error;
        }) 
        )
        
        return () => {
            isMounted = false
        }
    },[])
    return (
        <View backgroundColor='#F8F1FF'>
            <View style={styles.menuList}> 
                <FlatList 
                    data={renDataList}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                    paddingLeft:10,
                    paddingRight:10
                    }}
                    renderItem={({item})=>
                    <View
                         
                        style={{
                            flexDirection:'row',
                            marginTop:8,
                            padding:10,
                            backgroundColor:'#ffff',
                            borderRadius:10,  
                            height:100,
                        }}>
                     
                        <View
                            style={{
                                flex:1,
                                alignItems:'center',
                                justifyContent:'center',
                                backgroundColor:'#0B2B53',              
                                height:80,
                                borderRadius:10,                                                                                                                     
                            }}                                            
                        >
                        <Heading    
                            color='#DADADA'
                            fontSize={16}>
                            จำนวนเงิน
                        </Heading> 
                            <Heading
                                color='#DADADA'
                                fontSize={25}>
                                {item.price}
                            </Heading> 
                        </View>
                        <View
                            width={'75%'}    
                        >
                            <View style={{marginLeft:10}}>                                                               
                                <Text style={{fontSize:18}}>ประจำวันที่ : {Moment(item.date).format('DD-MM-YYY')}</Text>                                                                                               
                            </View>
                            <Divider my={2} w='90%' bgColor='#BBBBBB' alignSelf='center' />                       
                            <View style={{marginLeft:10}} alignItems='center' flexDirection='row'>                                                               
                                <Text style={{fontSize:18}}> </Text>{item.admin_id == '' ? <>ยังไม่ชำระ</> : item.status == 'ชำระแล้ว' ? <Text>ชำระแล้ววันที่ : {item.date_pay}</Text>  : <Text>ค้างชำระ</Text>}                                                                                             
                            </View> 
                        </View>
                                                                                                                                
                    </View>                                
                    }
                />          
            </View>
        </View>
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
