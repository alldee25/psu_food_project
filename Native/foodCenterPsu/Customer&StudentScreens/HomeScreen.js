import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from '@ui-kitten/components';
import axios from 'axios';
import { Center, Container, Divider, Heading, Link, ScrollView, Text, View, Image } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import { AuthContext } from '../App';
import ProfileScreen from './ProfileScreen';

const stackHome = createStackNavigator()

const HomeData =({navigation})=> {
        const W = Dimensions.get('window').width;
    const H = Dimensions.get('window').height
    const {userData,socket,callNotifitionUser} = useContext(AuthContext)
    const userId = userData.usersData[0].id
    const [annonment,setAnnounment]= useState([])
    

    useEffect(()=>{

        let isMounted = (
            socket.off(`withCus-id-${userId}`).on(`withCus-id-${userId}`,()=> {callNotifitionUser()}),
             axios.post(`http://192.168.1.102:3001/getAnnounCustomer`).then((res)=>{
            setAnnounment(res.data)
        })
        )
       
        return ()=> { isMounted = false }
    },[])

    return (
        <ImageBackground
            source={require('../assets/img/v748-toon-106.jpg')}
            style={{width:W,height:H}}
        >
             
            <View
                flexDirection='column'
                height={'100%'}
                width={'100%'}
            >
                <Container
                    flexDirection='row'
                    mt={2}
                    
                >
                    <Heading fontFamily='SanFranciscoDisplayBold' color="emerald.400" pl={4} >
                        Hi                 
                    </Heading>
                    <Heading fontFamily='SanFranciscoDisplayUltralight' color="#1D1F20" pl={4}>
                            {userData.usersData[0].name}
                    </Heading>
                    <View
                        w='90%'
                        alignItems='flex-end'
                    >
                    <TouchableOpacity
                        status='success' 
                        onPress={()=> navigation.navigate('Profile')}              
                    >
                        <Icon name='person-outline'  fill='black' style={{with:30,height:30}}/>
                    </TouchableOpacity>
                </View>
                </Container>
                
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
                        bg='#FFFFFF'                          
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
                        >
                           {/*  <Image 
                                alt=''
                                resizeMode='contain'
                                w='100%'
                                h='100%'
                                source={require('../assets/img/closeup-shot-delicious-asian-soup-with-different-vegetables.jpg')}
                            /> */}
                          
                        </ScrollView>                                             
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
                                            
            </View>
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
            <stackHome.Screen name='Profile' component={ProfileScreen} />
        </stackHome.Navigator>
    )
    
}
const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    wrap: {
      width: '100%',
      height: '100%'
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
      color: 'black'
    }
  
  });