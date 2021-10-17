import axios from 'axios'
import { Box, FlatList, Heading, HStack, Spacer, Text, View, Button } from 'native-base'
import { Dimensions, StyleSheet, TouchableOpacity,ImageBackground, SafeAreaView } from 'react-native'
import { AuthContext } from '../App'
import React, { useContext, useEffect, useState } from 'react'
import { Icon, MenuItem} from '@ui-kitten/components'
import Moment from 'moment';
import { createStackNavigator } from '@react-navigation/stack'
import SaveHourDetial from './SaveHourDetial'
import imagBack from '../assets/img/v748-toon-106.jpg'
import TableWorkOfStudent from './TableWorkOfStudent'

const ForwardIcon = (props) => (
    <Icon {...props} name='arrow-ios-forward'/>
  );

const stackSave = createStackNavigator()
export default function SaveHour() {
    return (
        <stackSave.Navigator>
            <stackSave.Screen name='เมนูรายการทุนหารศึกษา' component={saveMenu} />
            <stackSave.Screen name='บันทึกชั่วโมงการทำงาน' component={saveList} />
            <stackSave.Screen name='SaveHourDetial' component={SaveHourDetial} />
            <stackSave.Screen name='ตารางการเข้าทำงาน' component={TableWorkOfStudent} />
        </stackSave.Navigator> 
    )
}
const saveMenu =({navigation})=> {
    return(
        
        <ImageBackground
            resizeMode='cover'
            style={{flex:1}}
            source={imagBack}
        >
            <SafeAreaView style={styles.container}> 
                <MenuItem style={styles.MenuItem} title='ตารางการเข้าทำงาน' onPress={()=> navigation.navigate('ตารางการเข้าทำงาน')} accessoryRight={ForwardIcon} />             
                <MenuItem style={styles.MenuItem} title='บันทึกชั่วโมงการทำงาน' onPress={()=> navigation.navigate('บันทึกชั่วโมงการทำงาน')} accessoryRight={ForwardIcon} />           
            </SafeAreaView> 
        </ImageBackground>
    )
}
const saveList =({navigation})=> {
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
                                วันที่ : {item.date_work}
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
                                    <Icon 
                                        style={styles.icon} 
                                        fill='#888888' 
                                        name='arrow-ios-forward-outline' 
                                    />

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
            alignSelf='center'
            size='lg'
        >
            ไม่พบข้อมูลการลงทะเบียนทำงาน
        </Heading>}
        
    </View> 
    )
}
    const styles = StyleSheet.create({
        container:{
            display:'flex',
            alignItems:"flex-end",
            marginTop:10
        },
        MenuItem:{
            fontWeight:'bold',
            fontSize:21,
            marginTop:5,
            borderTopLeftRadius:10,
            borderBottomLeftRadius:10,
            width:'97%',
            height:60,
            shadowColor:'#DC143C',                                 
            shadowOpacity:1,
            elevation:7,
            shadowRadius:20,
            fontFamily:'IBMPlexSansThai-Regular'
        },
        menuList:{
            width:'100%',
            height:'100%',
            
        },
        containerButton:{
            alignItems:'center',
            position:'absolute',
            right:10,
            borderWidth: 2, 
        },
        icon: {
            width: 30,
            height: 30,
            borderRadius:30/2,
          },
        text:{ 
            
            backgroundColor:'darkgreen',  
            borderRadius:10,
            color:'azure'
        },
          button:{
            backgroundColor:'#DC143C',
            borderRadius:50/2,
            shadowRadius:10,
            shadowColor:'#F02A4B',
            shadowOpacity:0.3,
            shadowOffset:{height:90}
          }
    })