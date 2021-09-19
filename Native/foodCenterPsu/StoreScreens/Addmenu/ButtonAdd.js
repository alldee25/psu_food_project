import { Icon } from '@ui-kitten/components'
import React, { createRef, forwardRef, useRef, useState } from 'react'
import { Animated, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const ButtonTop = forwardRef((props,ref)=> {
    const [open,setOpen] = useState(0)
    
    const toggleMenu =()=> {
      
        setOpen(!open)
        ref();
    } 
    return ( 
    
        <View style={styles.container}>
            <SafeAreaView>
                <TouchableOpacity              
                     onPress={toggleMenu}>
                    <Animated.View >
                        <Icon name='plus-outline' fill='darkgreen' style={styles.icon} />    
                    </Animated.View>   
            </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
})
export default ButtonTop;

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        position:'absolute',
        right:10,
        top:-45,
        zIndex: 5,
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
})