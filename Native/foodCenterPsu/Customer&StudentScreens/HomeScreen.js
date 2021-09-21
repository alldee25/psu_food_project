import { Icon } from '@ui-kitten/components';
import { Center, Container, Divider, Heading, Link, ScrollView, Text, View, Image } from 'native-base'
import React, { useContext } from 'react'
import { Dimensions, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import { AuthContext } from '../App';


export default function HomeScreen() {
    const W = Dimensions.get('window').width;
    const H = Dimensions.get('window').height
    const {userData} = useContext(AuthContext)
    return (
        <ImageBackground
            source={require('../assets/img/v748-toon-106.jpg')}
            style={{width:W,height:H}}
        >
            <View
                flexDirection='column'
                height={H}
                width={W}
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
                    <Container                                       
                        bg='#FFFFFF'                          
                        borderRadius={25} 
                        width={'90%'} 
                        height={200}                         
                        alignItems='center'
                        mr={2}
                        >                                             
                        <TouchableOpacity                       
                            style={{
                                flex:1,
                                alignItems:'center',
                                width:'100%',
                                height:'100%',
                                                            
                            }}>
                                <Heading fontFamily='IBMPlexSansThai-Bold' size="md" m={3} >
                                เมนูยอดนิยม    
                            </Heading>
                            <Text mt={2} fontFamily='IBMPlexSansThai-Regular' fontSize="md">
                                เนื้อแดง
                            </Text>
                            <Heading fontFamily='IBMPlexSansThai-Regular' mt={2}>
                                25
                            </Heading>
                            <Text fontFamily='IBMPlexSansThai-Regular' mt={2} fontSize="md">
                                ออร์เดอร์
                            </Text> 
                               
                        </TouchableOpacity>                                              
                    </Container> 
                </View>
                     
                    <View
                        mt={4} 
                        bg='#FFFFFF' 
                        borderRadius={30} 
                        width='100%' 
                        height={400}                     
                    >
                        <Heading fontFamily='IBMPlexSansThai-Bold' size="md" ml={6} mt={4}>
                            ข่าวสาร    
                        </Heading> 
                        <Divider  w='90%' color='#888888' alignSelf='center'/>
                        <ScrollView
                            width='100%'
                            height='100%'                     
                        >
                            <Link  ml={6} mt={4} href="https://nativebase.io">
                                <Text fontFamily='IBMPlexSansThai-Regular'>สวัสดี</Text> 
                            </Link>
                        </ScrollView>   
                    </View>                   
                </View>
                                            
            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    
})
