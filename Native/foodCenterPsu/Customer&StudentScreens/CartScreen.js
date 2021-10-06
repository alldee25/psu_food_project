<<<<<<< HEAD
import React, { useState, useEffect, useContext } from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> 8cea6c4331339c741b0dff06a18b9fabaff13b79
import { Dimensions, TouchableOpacity } from 'react-native';

import {
  Box,
  View,
  Text,
  Pressable,
  HStack,
  Checkbox,
  VStack,
  Spacer,
  Button
} from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Icon } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteDataCart } from '../src/redux/actions';
<<<<<<< HEAD
import { AuthContext } from '../App';

export default function CartScreen({navigation}) {

    const {userData} = useContext(AuthContext)
    const [mode, setMode] = useState('Basic');
    const dispatch = useDispatch()
    const {cart} = useSelector(state => state.userReducer) 
    const cartFilter = cart.filter(data => data.userId == userData.usersData[0].id) 
    const H = Dimensions.get('window').height
    const W = Dimensions.get('window').width
    const [groupValues, setGroupValues] = React.useState([])
    

=======

export default function CartScreen({navigation}) {
    const [mode, setMode] = useState('Basic');
    const dispatch = useDispatch()
    const {cart} = useSelector(state => state.userReducer)  
    const H = Dimensions.get('window').height
    const W = Dimensions.get('window').width
    const [groupValues, setGroupValues] = React.useState([])
    

>>>>>>> 8cea6c4331339c741b0dff06a18b9fabaff13b79
    
    const Ordered =()=> {
      let orderData = []
      groupValues.map((data)=>{
        orderData.push(cart.find((item) => item.id == data)) 
        })
        navigation.navigate('conferm',orderData)

  }
    const deleteCart =(value)=>{
    const data = groupValues.filter((item)=> item !== value)
    setGroupValues(data)
      dispatch(DeleteDataCart(
        value))
    }
    const renderItem = ({ item, index }) => (
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
                <HStack space={3} flexDirection="row"  alignContent="space-between" w='100%' >
                
                
                  <View
                    alignItems='center'
                    justifyContent='center'
                    w={10}
                    h={10}
                  >
                  <Checkbox.Group
                    onChange={setGroupValues}
                    value={groupValues}>
                      <Checkbox value={item.id} accessibilityLabel="This is a dummy checkbox" />
                  </Checkbox.Group>
                    </View>
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
                  </View>
                  <Spacer />
                </HStack>
              </Box>
    );

    const renderHiddenItem = (data, rowMap) => (
      <HStack pl="2">
        <Pressable
          w={70}
          ml="auto"
          bg="red.500"
          justifyContent="center"
          onPress={() => deleteCart(data.item.id)}
          _pressed={{
            opacity: 0.5,
          }}>
          <VStack alignItems="center" justifyContent='center' space={2} w='100%' h='100%'>
            <View
            >
              <Icon name='trash-outline' style={{width:20,height:20}} fill='#ffff' />
            </View>
            <Text fontSize="xs" fontWeight="medium" color="white">
              Delete
            </Text>
          </VStack>
        </Pressable>
      </HStack>
    );

    return (

      <View h={H} w={W} >
        <View mt={2} bg="white" safeArea >
          <SwipeListView
<<<<<<< HEAD
            data={cartFilter}
=======
            data={cart}
>>>>>>> 8cea6c4331339c741b0dff06a18b9fabaff13b79
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-130}
            previewRowKey={'0'}
            previewOpenValue={-30}
            previewOpenDelay={3000}
          />
        </View>
        <View
                position='absolute'
                alignItems='center'
                bottom='22%'
                mt={4}
                w='100%'
                flexDirection='column'
            >
                <Button disabled={groupValues == ''} w='90%' onPress={()=> Ordered()}>สั่งซื้อ</Button>  
            </View>
      </View>
      
      )
}
