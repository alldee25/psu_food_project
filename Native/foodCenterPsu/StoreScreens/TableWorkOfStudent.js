import axios from 'axios'
import { Box, FlatList, HStack, Spacer, Text, View } from 'native-base'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { AuthContext } from '../App'
import React, { useContext, useEffect, useState } from 'react'
import { Icon } from '@ui-kitten/components'

export default function TableWorkOfStudent({navigation}) {

    const H = Dimensions.get('window').height
    const {userData} = useContext(AuthContext);
    const [dataList,setDataList] = useState([])
    const [dataReng,setDataReng] = useState([])
    const [dataStudent,setDataStudent] = useState([])

    useEffect(()=> {
        axios.post('http://192.168.1.102:3001/getTableStudenRegis',{
            storeId:userData.usersData[0].store_id
        }).then((res) =>{
            setDataList(res.data)
            
        }).then(
            axios.post('http://192.168.1.102:3001/getRangeNameOfTableStudentRegis',{
                storeId:userData.usersData[0].store_id
            }).then((res)=> {
                setDataReng(res.data)
            })
        )
        .then(
            axios.post('http://192.168.1.102:3001/getStudentRegisOfStoreTable',{
                storeId:userData.usersData[0].store_id
            }).then((res)=> {
                setDataStudent(res.data)
            })
        )
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
        <FlatList
        data={dataList}
        renderItem={({ item }) => (
            <TouchableOpacity
                onPress={()=> navigation.navigate('RegisWorkDetial',{
                    scId:item.id
                })}
            >
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
                <HStack space={3} flexDirection="row" alignContent="space-between" w='100%' >
                        <View>
                            <Text
                            _dark={{
                                color: "warmGray.50",
                            }}
                            color="coolGray.800"
                            bold
                            >
                            วันที่ : {item.date_work}
                            </Text>
                            <Text
                            color="coolGray.600"
                            _dark={{
                                color: "warmGray.200",
                            }}
                            >
                            ทุน : {item.scholarship_name}
                            
                            </Text>
                            {dataReng.filter(dataRage => dataRage.id == item.id).map((filteredPerson,index) => (
                            
                                <View
                                    key={index}
                                    style={styles.rage}
                                >
                                        <View                                         
                                            style={styles.select}
                                            
                                        >
                                            <Text
                                                ml={2}
                                            >{filteredPerson.rage_name}</Text>
                                            {dataStudent.filter(dataStudent => dataStudent.id == filteredPerson.rid).map((dataStu,index) => (                            
                                                <View
                                                    key={index}
                                                    style={styles.student}
                                                >      
                                                    <Text>{dataStu.name} {dataStu.lastname} : {dataStu.student_id}</Text>
                                                </View>
                                            ))}
                                            
                                        </View>
                                </View>
                            ))}
                        </View>
                        
                        <Spacer />
                        </HStack>
                    </Box>
                </TouchableOpacity>
        )}
        keyExtractor={(item,index) => index}
        />
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
            height:60,
            marginLeft:15,
            width:330
        },
        select:{
            flexDirection:'column',
            height:60,
            borderWidth:1,
            borderRadius:5
        },
        student:{
            marginLeft:15,
            flexDirection:'column',
            height:60,
        }
    })
    