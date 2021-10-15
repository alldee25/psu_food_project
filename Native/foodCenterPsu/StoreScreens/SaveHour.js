import axios from 'axios'
import { Box, FlatList, Heading, HStack, Spacer, Text, View } from 'native-base'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { AuthContext } from '../App'
import React, { useContext, useEffect, useState } from 'react'
import { Icon } from '@ui-kitten/components'
import Moment from 'moment';

export default function SaveHour({navigation}) {

    const H = Dimensions.get('window').height
    const {userData} = useContext(AuthContext);
    const [dataList,setDataList] = useState([])
    Moment.locale('en')
    let date = new Date();

    useEffect(()=> {
        axios.post('http://192.168.1.102:3001/getScholarShipsbyStore',{
            storeId:userData.usersData[0].store_id,
            date:Moment(date).format('YYYY-MM-DD'),
        }).then((res) =>{
            setDataList(res.data)
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
            {dataList.length > 0 ? <FlatList
            data={dataList}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={()=> navigation.navigate('SaveHourDetial',{
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
                                {item.scholarship_name}
                                </Text>
                                <Text
                                color="coolGray.600"
                                _dark={{
                                    color: "warmGray.200",
                                }}
                                >
                                วันที่ : {item.date}
                                </Text>
                            </View>
                            <View
                                right={0}
                                position='absolute'
                                justifyContent='center'                  
                                height='100%'
                            >
                                <Text
                                    _dark={{
                                        color: "warmGray.50",
                                    }}
                                    color="coolGray.800"
                                    bold
                                    >                        
                                    <Icon style={styles.icon} fill='#888888' name='arrow-ios-forward-outline' />

                                </Text>
                            </View>
                            <Spacer />
                        </HStack>
                    </Box>
                </TouchableOpacity>
            )}
        keyExtractor={(item,index) => index}
        />:
        <Heading 
            size='lg'
        >
                ไม่พบข้อมูลการลงทะเบียนทำงาน
            </Heading>}
        
    </View> 
    )
}
const styles = StyleSheet.create({
    icon: {
        width: 42,
        height: 30,
        color:"black"
        },
    })
