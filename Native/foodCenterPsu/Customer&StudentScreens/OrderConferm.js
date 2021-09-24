import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { 
    Text,
    Box,
    FlatList,
    Heading,
    Avatar,
    HStack,
    VStack,
    Spacer,
    Button, 
    View,
    Image,
    useToast} from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Dimensions, StyleSheet } from 'react-native';
import { AuthContext } from '../App';
import { useSelector } from 'react-redux';

export default function OrderConferm({route,navigation}) {
    let [sum, setSum] = useState(0);
    const H = Dimensions.get('window').height
    const [data,setData] = useState([])
    const toast = useToast()
    const date = new Date()
    const {cart} = useSelector(state => state.userReducer);
    const {userData} = useContext(AuthContext)
    
    
    const Ordered =()=> {
        axios.post('http://192.168.1.102:3001/insertOrder',{
            orderFoodId:uuidv4(),
            customerId:userData.usersData[0].id,
            Date:date,
            data:data
        }).then(
            (res) => {
                if (res.data.err) {
                    console.log(err);
                } else {
                    
                }
                navigation.goBack()
            }
        )
    }

    useEffect(()=>{
        if (route.params) {
            setData([route.params])
            setSum(route.params.food_price)
        } else {
            setData(cart)
            cart.forEach(price => {
            setSum(sum+=price.food_price)
        });
        }
        
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
                    <View
                        alignItems='center'
                        justifyContent='center'
                        w={10}
                        h={10}
                        borderWidth={1}
                        borderRadius={5}
                        borderColor='#7FE1F4'
                    >
                        <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {item.count}x
                    </Text>
                    </View>
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
                    รวม :  {item.food_price} <Image alt='icon' style={styles.icon} source={require('../assets/img/thai-baht.png')} />
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
                bottom='22%'
                mt={4}
                w='100%'
                flexDirection='column'
            >
                <View w='90%' alignItems='flex-end'><Text>รวมทั้งหมด {sum} บาท</Text></View>
                <Button w='90%' onPress={()=> Ordered()}>ยืนยันการสั่งซื้อ</Button>  
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