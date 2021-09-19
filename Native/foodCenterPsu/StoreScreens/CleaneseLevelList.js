import { useIsFocused } from '@react-navigation/core'
import { Icon } from '@ui-kitten/components'
import axios from 'axios'
import { Divider, FlatList, Heading, Menu, ScrollView, Text, View } from 'native-base'
import React, { useContext, useState, useEffect } from 'react'
import { Alert, StyleSheet, TouchableOpacity } from 'react-native'
import { AuthContext } from '../App'

export default function CleaneseLevelList({navigation}) {

    const isFocused = useIsFocused();
    const {userData} = useContext(AuthContext)
    const [CleanDataList,setCleanDataList] = useState([])

    useEffect(() => {

        let isMounted = (
            axios.post('http://192.168.1.102:3001/getCleaneseLevelList',{
        storeId:userData.usersData[0].id
        }).then((res)=>{
            setCleanDataList(res.data)       
        }).catch(error =>{
            console.log(error);
            throw error;
        }))
        
        return () => {
            isMounted = false
        }
    },[isFocused])

    return (
        <View backgroundColor='#F8F1FF'>
            <View style={styles.menuList}>
                <FlatList 
                    data={CleanDataList}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                    paddingLeft:10,
                    paddingRight:10
                    }}
                    renderItem={({item})=>
                    <TouchableOpacity
                        onPress={()=> navigation.navigate('รายละเอียดระดับคุณภาพความสะอาด',{
                            storeId:userData.usersData[0].id,
                            Cleaneseid:item.id
                        })} 
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
                                fontSize={30}>
                                {item.point}
                            </Heading>
                            <Heading
                                color='#DADADA'
                                fontSize={16}>
                                คะแนน
                            </Heading>  
                        </View>
                        <View
                            width={'70%'}    
                        >
                            <View style={{marginLeft:10}}>                                                               
                                <Text style={{fontSize:18}}>ประจำวันที่:  {item.date}</Text>                                                                                               
                            </View>
                            <Divider my={2} w='90%' bgColor='#BBBBBB' alignSelf='center' />                       
                            <View style={{marginLeft:10}}>                                                               
                                <Text style={{fontSize:18}}>สถานะ : {item.status == 'ผ่าน' ? <Text color='#66B032'>ผ่าน</Text> : <Text color='#6400CD'>ไม่ผ่าน</Text> }</Text>                                                                                               
                            </View>  
                        </View>
                        <View 
                            height={'100%'}
                            justifyContent='center'
                        >
                            <Icon name='arrow-ios-forward' fill='#BBBBBB' style={styles.icon} />
                        </View>
                                                                                                                                
                    </TouchableOpacity>                                
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
