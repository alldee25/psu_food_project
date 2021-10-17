import axios from 'axios';
import { 
    Text,
    Box,
    FlatList,
    HStack,
    Spacer,
    View,
    } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native';
import { AuthContext } from '../App'
import Moment from 'moment';

export default function HistoryOfSell() {

    const H = Dimensions.get('window').height
    const {userData} = useContext(AuthContext);
    const [data,setData] = useState([])

    useEffect(()=> {
        axios.post('http://192.168.1.102:3001/getHistoryOfSellStore',{
            storeId:userData.usersData[0].store_id,
        }).then((res) =>{
            setData(res.data)
        })
    },[])
    return (
        <View
            mt={1}
            h={'99.9%'}
            w={{
            base: "100%",
            md: "25%",
            }} 
        >
            <FlatList
            data={data}
            
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
                <HStack space={3} flexDirection="row" alignContent="space-between" w='100%' >
                        <View>
                            <Text
                            _dark={{
                                color: "warmGray.50",
                            }}
                            color="coolGray.800"
                            bold
                            >
                            {item.food_name}
                            </Text> 
                            <Text
                            _dark={{
                                color: "warmGray.50",
                            }}
                            color="coolGray.800"
                            bold
                            >
                            {Moment(item.date).format('YYYY-MM-DD')}
                            </Text>                      
                        </View>
                        <View
                    
                            right={0}
                            position='absolute'
                        >
                            <Text
                            _dark={{
                                color: "warmGray.50",
                            }}
                            color="coolGray.800"
                            bold
                            >
                            จำนวน :  {item.quantity} {item.package == 'ใส่จาน' ?  <Text>จาน</Text>: item.package} รวม :  {item.num_of_price} บาท 
                            </Text>
                        </View>
                       
                        <Spacer />
                        </HStack>
                    </Box>
                    )}
                    keyExtractor={(item,index) => index}
            /> 
            <View
                    position='absolute'
                    alignItems='center'
                    bottom='1%'
                    right={0}
                    mr={4}
                    w='40%'
                    flexDirection='column'
                    backgroundColor="#7FE1F4"
                    borderRadius={15}
                >
                  <Text>รวมทั้งหมด {data.reduce((sum,data) => sum+data.num_of_price,0)} บาท</Text>
                </View>
        </View>
    )
}
const styles = StyleSheet.create({
    icon: {
        width: 15,
        height: 15,
    },
})
