import { Container, Heading, View } from 'native-base'
import React, { useContext, useEffect } from 'react'
import { Alert, Dimensions, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { io } from 'socket.io-client';
import { AuthContext } from '../App';

export default function OrdersScreen() {

    const {userData} = useContext(AuthContext);
    const W = Dimensions.get('window').width;
    const H = Dimensions.get('window').height
    const socket = io('http://192.168.1.102:3001')
    

    useEffect(()=>{
        socket.on('jjj',() => {
            console.log('Audi');
        })
    })
    return (
        
        <ImageBackground
        source={require('../assets/img/v748-toon-106.jpg')}
        style={{width:(W),height:(H)}}
        >
            <Text>
                หกดเกดเกดเกดเกเด
            </Text>
            <View>
            <Container
                width='100%' 
                flexDirection="row"
                m={4}    
                >
                    <Container bg='#ffFFFF'  
                        shadowColor='#DC143C'                                 
                        shadowOpacity={1}
                        elevation={7}
                        shadowRadius={20}  
                        borderRadius={10} 
                        width={100} 
                        height={50} 
                        mr={2}
                        alignItems='center'
                        >
                        <TouchableOpacity style={{flex:1,alignItems:'center',width:'100%'}}>
                            <Heading size="md" m={3} >
                                เมนูยอดนิยม   
                            </Heading>
                            
                        </TouchableOpacity>                        
                    </Container> 
                    <Container 
                        shadowColor='#DC143C'                                 
                        shadowOpacity={1}
                        elevation={7}
                        shadowRadius={20}
                        bg='#ffFFFF' 
                        borderRadius={10} 
                        width={150} 
                        height={100 } 
                        ml={2} >
                        <TouchableOpacity style={{flex:1,alignItems:'center',width:'100%'}}>
                            <Heading size="md" m={3} >
                                ยอดขาย    
                            </Heading>
                           
                        </TouchableOpacity>    
                    </Container>
                </Container>
            </View>
            
        </ImageBackground>
    )
}
