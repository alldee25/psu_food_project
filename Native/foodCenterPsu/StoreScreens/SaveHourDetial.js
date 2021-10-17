
import { Icon } from '@ui-kitten/components';
import axios from 'axios';
import { Heading, Image, Container, View, Input, Button,  useToast } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { AuthContext } from '../App';
import Moment from 'moment';


export default function SaveHourDetial({navigation}) {

    const W = Dimensions.get('window').width;
    const H = Dimensions.get('window').height
    const {userData} = useContext(AuthContext);
    const today = new Date();
    const [studentId, setStudentId] = useState('')
    const [studentData, setStudentData] = useState([])
    const [isLoad,setIsload] = useState(false)
    const toast = useToast()  
    Moment.locale('en')
    let date = new Date();

    const searchFilter=()=> {
      axios.post('http://192.168.1.102:3001/getStudentIdForSave',{
        studentId:studentId,
        date:Moment(date).format('YYYY-MM-DD'),
        storeId:userData.usersData[0].store_id
      }).then(
          (res) => {
            console.log(res.data);
            setStudentData(res.data)
          }
      )      
    }
    const SaveHour =(e)=> {
        axios.post('http://192.168.1.102:3001/InsertHour',{
                tid:e,
                hourQuantity:3,
                date:Moment(today).format('YYYY-MM-DD'),
        }).then(res => {
            if (res.data.err) {
                console.log(err);
            } else {
                toast.show({
                    title: "Account verified",
                    status: "success",
                    description: "Thanks for signing up with us.",
                  })
                navigation.goBack()
            }
        })
    }
    
    return (
            <View
                h={H}
                w={W}
                backgroundColor='#0B2B53'
            >
                <View
                    w='100%'
                    flexDirection='row'
                    justifyContent='space-between'
                >
                    <Heading
                        fontFamily='IBMPlexSansThai-SemiBold'
                        m={2}
                        ml={3}
                        color='#FFFFFF'
                    >
                        ค้นหา 
                    </Heading>
                </View>
                <View
                width={W} alignItems='center'
                >
                    <Input
                        InputRightElement={
                            <TouchableOpacity
                                onPress={() => searchFilter()}
                            >
                               <Icon style={styles.icon} name='search-outline' fill ="#FFFF"/>  
                            </TouchableOpacity>
                           
                        }
                        
                        color='white' 
                        w={'95%'} 
                        size="xs" 
                        placeholder="กรอกรหัสนักศึกษา" 
                        borderRadius={20}
                        onChangeText={(textValue)=> setStudentId(textValue)} 
                    />
                </View> 
                <View
                    borderWidth={1}
                    backgroundColor='white'
                    flex={5}
                    borderTopRadius={20}
                    mt={'10%'}
                    alignItems='center'
                        
                >
                    {studentData.map((data,i) => (
                        data.count > 0 ? <Container                          
                            key={i}
                            m={4}
                            w="100%"
                            height='75%'
                            position='relative'                          
                        >
                            <Heading size="lg">
                                ชื่อ-นามสกุล                             
                            </Heading>
                            <Heading 
                             color="emerald.400"
                             size="lg"
                             >
                                    {data.name} {data.lastname}
                            </Heading>
                            <Heading size="lg">
                                รหัสนักศึกษา                             
                            </Heading>
                            <Heading 
                             color="emerald.400"
                             size="lg"
                             >
                                    {data.id}
                            </Heading>
                            <Heading size="lg">
                                สถานะ                             
                            </Heading>
                            <Heading size="lg"
                            color="emerald.400"
                            >
                                คุณได้ทำการบันทึกทำงานเก็บชั่วโมงแล้ว                           
                            </Heading>
                      </Container> : data.id ==null ? 
                      <Container                          
                            key={i}
                            m={4}
                            w="100%"
                            height='75%'
                            alignItems='center'
                                                    
                        >
                            <Heading size="lg">
                               ไม่พบข้อมูลนักศึกษา                             
                            </Heading>                         
                      </Container>
                      : <Container                          
                            key={i}
                            m={4}
                            w="100%"
                            height='75%'
                            position='relative'                          
                        >
                            <Heading size="lg">
                                ชื่อ-นามสกุล                             
                            </Heading>
                            <Heading 
                             color="emerald.400"
                             size="lg"
                             >
                                    {data.name} {data.lastname}
                            </Heading>
                            <Heading size="lg">
                                รหัสนักศึกษา                             
                            </Heading>
                            <Heading 
                             color="emerald.400"
                             size="lg"
                             >
                                    {data.id}
                            </Heading>
                            <Heading size="lg">
                                ลงวันที่                           
                            </Heading>
                            <Heading 
                             color="emerald.400"
                             size="lg"
                             >
                                    {data.date}
                            </Heading>
                            <View
                                position='absolute'
                                alignItems='center'
                                bottom={0}
                                mt={4}
                                w='100%'
                                flexDirection='column'
                            >
                                <Button 
                                    w='90%' 
                                    onPress={()=> SaveHour(data.tis)}
                                    isLoading={isLoad}
                                    borderRadius={15}
                                >
                                บันทึก
                                </Button>  
                            </View>
                      </Container>
                    ))}
                </View>                    
            </View>
    )
}
const styles = StyleSheet.create({
    buttonTypy:{
        justifyContent:'center',
        alignItems:'center',
        borderColor:'white',
        borderWidth:1,
        borderRadius:20,
        width:100,
        height:50,
        margin:10,
        
    },
    buttonTypyActive:{
        justifyContent:'center',
        alignItems:'center',
        borderColor:'white',
        borderWidth:1,
        borderRadius:20,
        width:100,
        height:50,
        margin:10,
        backgroundColor:'#FFFF'
    },
    icon: {
        width: 42,
        height: 30,
        color:"black"
        },
    iconBack: {
        width: 30,
        height: 40,
        },
        
})
