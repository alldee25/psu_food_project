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
import { Dimensions } from 'react-native';
import { AuthContext } from '../App'

export default function WorkHour({route}) {

    const H = Dimensions.get('window').height
    const {userData} = useContext(AuthContext);
    const [dataList,setDataList] = useState([])

    useEffect(()=> {
        axios.post('http://192.168.1.102:3001/getQiuntityHour',{
            userId:userData.usersData[0].id,
            scId:route.params.scId
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
        <FlatList
        data={dataList}
        renderItem={({ item }) => (
          <Box
            height={'65px'}
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
                        จำนวน :  {item.quantity} ชั่วโมง
                    </Text>
                    <Text
                        _dark={{
                            color: "warmGray.50",
                        }}
                        color="coolGray.800"
                        bold
                        >
                        วันที่ :  {item.date_work} 
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
                    bottom='19%'
                    right={0}
                    mr={4}
                    w='40%'
                    flexDirection='column'
                    backgroundColor="#FFFF"
                    borderRadius={15}
                >
                  <Text>รวมทั้งหมด {dataList.reduce((sum,data) => sum+data.quantity,0)} ชั่วโมง</Text>
        </View>
    </View> 
    )
}
