import axios from 'axios';
import { 
    Text,
    Box,
    FlatList,
    HStack,
    Spacer,
    View,
    Image,
    } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native';
import { AuthContext } from '../App'

export default function History() {

    const H = Dimensions.get('window').height
    const {userData} = useContext(AuthContext);
    const [dataHistoryList,setDataHistoryList] = useState([])

    useEffect(()=> {
        console.log(userData.usersData[0].id);
        axios.post('http://192.168.1.102:3001/getHistoryOfSell',{
            userId:userData.usersData[0].id
        }).then((res) =>{
            console.log(res.data);
            setDataHistoryList(res.data)
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
            <FlatList
            data={dataHistoryList}
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
                            color="coolGray.600"
                            _dark={{
                                color: "warmGray.200",
                            }}
                            >
                            ร้าน : {item.store_name}
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
                            จำนวน :  {item.quantity} 
                            </Text>
                        </View>
                        <Spacer />
                        </HStack>
                    </Box>
                    )}
                    keyExtractor={(item,index) => index}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    icon: {
        width: 15,
        height: 15,
    },
})