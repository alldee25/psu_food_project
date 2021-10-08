import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from '@ui-kitten/components';
import axios from 'axios';
import { Center, Container, Divider, Heading, Link, ScrollView, Text, View, Image } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, ImageBackground, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import { AuthContext } from '../App';
import ProfileScreen from './ProfileScreen';

const stackHome = createStackNavigator()

const HomeData =({navigation})=> {

    const W = Dimensions.get('window').width;
    const H = Dimensions.get('window').height
    const {userData,socket,callNotifitionUser} = useContext(AuthContext)
    const userId = userData.usersData[0].id
    const [annonment,setAnnounment]= useState([])
    const [dataImageAdvi, setDataImageAdvi] = useState([])
    const [imageActive,setImageActive] = useState(0)

    onchange = (nativeEven) => {
        if (nativeEven) {
            const slide = Math.ceil(nativeEven.contentOffset.x / nativeEven.layoutMeasurement.width)
            if (slide != imageActive) {
                setImageActive(slide);
            }
        } 
    }
    useEffect(()=>{

        let isMounted = (
            socket.off(`withCus-id-${userId}`).on(`withCus-id-${userId}`,()=> {callNotifitionUser()}),
             axios.post(`http://192.168.1.102:3001/getAnnounCustomer`).then((res)=>{
            setAnnounment(res.data)
        }).then(
            axios.get("http://192.168.1.102:3001/getAdviList").then((res)=>{
            setDataImageAdvi(res.data)  
        })
        )
        )
       
        return ()=> { isMounted = false }
    },[])

    return (
        <ImageBackground
            source={require('../assets/img/v748-toon-106.jpg')}
            style={{width:W,height:H}}
        >
             
            <SafeAreaView
                flexDirection='column'
                height={'100%'}
                width={'100%'}
            >
                <View
                    flexDirection='row'
                    mt={2}
                    width={'100%'}
                >
                    <Heading fontFamily='SanFranciscoDisplayBold' color="emerald.400" pl={4} >
                        Hi                 
                    </Heading>
                    <Heading fontFamily='SanFranciscoDisplayUltralight' color="#1D1F20" pl={4}>
                            {userData.usersData[0].name}
                    </Heading>
                    <View

                        w='50%'
                        alignItems='flex-end'
                        position='absolute'
                        right={0}
                    >
                    <TouchableOpacity
                        style={{
                            marginTop:5,
                            width:100,                          
                        }} 
                        onPress={()=>{navigation.navigate('profileScreenCustomer')}}              
                    >
                        <Icon name='person-outline'  fill='black' style={{with:30,height:30}}/>
                    </TouchableOpacity>
                </View>
                </View>
                
                <View                  
                    alignItems='center'                   
                    width={W}
                    height={H}
                                
                >
                <View              
                width='90%' 
                flexDirection="row"
                mt={4}    
                >
                    <View                                                              
                        borderRadius={25} 
                        width={'100%'} 
                        height={200}                         
                        alignItems='center'
                        mr={2}
                        >                                             
                        <ScrollView
                            
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                            horizontal
                            style={styles.wrap}
                            onScroll={({nativeEvent}) => onchange(nativeEvent)}
                        >
                        {dataImageAdvi.map((data,index)=>(
                            <Image                                
                                key={data.id}
                                alt={data.img}
                                resizeMode='stretch'
                                h='100%'                            
                                w={360}
                                borderRadius={25} 
                                source={{uri :`http://192.168.1.102:3001/adminUploaded/${data.img}`}}
                            />
                        ))}
                              
                        </ScrollView>
                        <View style={styles.wrapDot}>
                        {dataImageAdvi.map((data,index)=>(
                            <Text 
                                key={data.id}
                                style={imageActive == index ? styles.dotActive : styles.dot}
                            >
                               ● 
                            </Text>
                        ))}
                        </View>                                             
                    </View> 
                </View>
                     
                    <View
                        mt={4} 
                        bg='#FFFFFF' 
                        borderTopRadius={30} 
                        width='100%' 
                        height={'70%'}                    
                    >
                        
                        <Heading fontFamily='IBMPlexSansThai-Bold' size="md" ml={6} mt={4}>
                            ข่าวสาร    
                        </Heading> 
                        <Divider  w='90%' color='#888888' alignSelf='center'/>
                        <ScrollView
                            width='95%'
                            height='100%'                     
                        >
                            {annonment.map((data,index)=>(
                            <Link key={index}  ml={6} mt={4} href="https://nativebase.io">
                                * <Text fontFamily='IBMPlexSansThai-Regular'>{data.Title}</Text> 
                            </Link>
                        ))}
                            
                        </ScrollView>   
                    </View>                   
                </View>
                                            
            </SafeAreaView>
        </ImageBackground>
    )
}
export default function HomeScreen() {
    return(
        <stackHome.Navigator>
            <stackHome.Screen name='home' component={HomeData} 
                options={{
                    headerShown:false
                }}
            />
            <stackHome.Screen name='profileScreenCustomer' component={ProfileScreen} />
        </stackHome.Navigator>
    )
    
}
const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    wrap: {
      width: '100%',
      height: '100%',
      shadowColor: "#DDDD",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.55,
        shadowRadius: 3.84,

        elevation: 5,
    },
    wrapDot: {
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      alignSelf: 'center'
    },
    dot: {
      margin: 3,
      color: '#888'
    },
    dotActive: {
      margin: 3,
      color: '#FFFF'
    }
  
  });