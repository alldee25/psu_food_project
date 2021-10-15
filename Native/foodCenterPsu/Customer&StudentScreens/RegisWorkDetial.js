import axios from 'axios'
import { Box, Container, FlatList, Heading, HStack, Spacer, Text, Toast, useToast, View } from 'native-base'
import { Alert, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { AuthContext } from '../App'
import React, { useContext, useEffect, useState } from 'react'
import { Icon } from '@ui-kitten/components'
import Moment from 'moment';

export default function RegisWorkDetial({route,navigation}) {

    const H = Dimensions.get('window').height
    const {userData} = useContext(AuthContext);
    const [dataList,setDataList] = useState([])
    const [status,setStatus] = useState([])
    const [dataLisRane,setDataListRane] = useState([])
    const toast = useToast()
    Moment.locale('en')
    let date = new Date();

    const InsertTableWork =(target)=> {
          Alert.alert(
            "ยืนยันการลงทะเบียน",
            "กด Ok เพื่อยืนยัน",
            [
              {
                text: "Cancel",
                onPress: () => {console.log("Cancel Pressed")},
                style: "cancel"
              },
              { text: "OK", onPress: () => {
                   axios.post('http://192.168.1.102:3001/InsertTableWork',{
            date:Moment(date).format('YYYY-MM-DD'),
            rageId:target,
            studentId:userData.usersData[0].id
                }).then((res) => {
                    if (res.data.err) {
                        Alert.alert(
                            "เกิดข้อผิดพลาด",
                            "โปรดตรวจสอบข้อมูลอีกครั้ง",
                            [
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                        );
                    } else {
                        toast.show({
                            title: "ลงทะเบียนเรียบร้อย",
                            status: "success",
                            description: "Thanks you",
                          })
                        navigation.goBack()
                    }
                })
        }}
            ]
          );

       

    }

    useEffect(()=> {
      
        
            axios.post('http://192.168.1.102:3001/getCheckWorkTableByStudent',{
            scId:route.params.scId,
            date:Moment(date).format('YYYY-MM-DD'),
            studentId:userData.usersData[0].id
        }).then((res) =>{
            if (res.data.length >0) {
                setStatus(res.data)
            } else {
               
                axios.post('http://192.168.1.102:3001/getStoreScList',{
                        scId:route.params.scId,
                    }).then((res) =>{

                        setDataList(res.data) 
                    }).then(
                        axios.post('http://192.168.1.102:3001/getWorkTableByStudent',{
                        scId:route.params.scId,
                    }).then((res) =>{
                        setDataListRane(res.data) 
                    })
                    )
            }
        })
        
            
    },[])

    return (
        
        <View
        mt={1}
        h={H}
        w={{
        base: "100%",
        md: "25%",
        }} 
    >
        {status.length > 0 ? status.map((data,index) => (
            <View
            key={index}
            alignItems='center'
            >
                <Container
                    
                >
                    <Heading>
                        สถาณะการลงทะเบียน
                        <Heading color="emerald.500"> คุณได้ทำการลงทะเบียนทำงานเก็บชั่วโมงแล้ว</Heading>
                    </Heading>
                    <Text mt="3" fontWeight="medium">
                        ร้าน : {data.store_name}
                    </Text>
                    <Text mt="3" fontWeight="medium">
                        ช่วง : {data.rage_name}
                    </Text>
                    <Text mt="3" fontWeight="medium">
                        วันที่ทำงาน : {data.date_work}
                    </Text>
                </Container>
            </View>
             
        )) 
        : <FlatList
        data={dataList}
        renderItem={({ item }) => (
            <Box
                bgColor='#ffff'
                borderBottomWidth={1}
                _dark={{
                borderColor: "gray.600",
                }}
                borderColor="coolGray.200"
                pl="4"
                pr="5"
                py="2"
            >
                <View space={3} flexDirection="column" w='100%' >
                        
                            <Text
                                _dark={{
                                    color: "warmGray.50",
                                }}
                                color="coolGray.800"
                                bold
                            >
                            ร้าน : {item.store_name} 
                            </Text>
                        <View
                            flexDirection='row'
                            height={20}
                            justifyContent='space-around'
                            
                        >
                            {dataLisRane.filter(dataRage => dataRage.sid == item.id).map((filteredPerson,index) => (
                            
                                <View
                                    key={index}
                                    style={styles.rage}
                                >
                                        <TouchableOpacity
                                            disabled={filteredPerson.count >= 2}
                                            style={styles.select}
                                            onPress={()=>InsertTableWork(filteredPerson.id)}
                                        >
                                            <Text>ช่วง : {filteredPerson.rage_name}</Text><Text>{filteredPerson.count < 2 ? <Text>ว่าง</Text> : <Text>เต็ม</Text>}</Text>
                                        </TouchableOpacity>
                                </View>
                            ))}
                            
                        </View>
                            
                        
                        <Spacer />
                        </View>
                    </Box>
            
        )}
        keyExtractor={(item,index) => index}
        /> }
        
    </View> 
    )
}

const styles = StyleSheet.create({
    icon: {
        width: 42,
        height: 30,
        color:"black"
        },
    rage: {
        flexDirection:'column',
        height:50
    },
    select:{
        width:100,
        height:60,
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#D8D8D8',
        borderRadius:15
    }
    })