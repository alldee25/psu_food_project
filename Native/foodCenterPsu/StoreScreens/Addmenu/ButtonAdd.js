import { Icon } from '@ui-kitten/components'
import React, { createRef, forwardRef, useRef, useState } from 'react'
import { Animated, Modal, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'

const AddMenuButton =forwardRef((props,ref)=> {
    const [open,setOpen] = useState(0)
    const animation = useRef(new Animated.Value(0)).current;
    
    const toggleMenu =()=> {
        
        const toValue = open ? 0 : 1;  
        Animated.spring(animation,{
            toValue,
            friction: 5,
            useNativeDriver: true
        }).start()
        setOpen(!open)
        ref();
        
    } 
    
    const rotation = {
        transform: [
            {
                rotate: animation.interpolate({
                inputRange:[0, 1],
                outputRange:["0deg","45deg"]
                })
            }   
        ],
    }
    return ( 
    
        <View style={styles.container}>
            <SafeAreaView>
                <TouchableWithoutFeedback onPress={toggleMenu}>
                    <Animated.View style={styles.button,rotation}>
                        <Icon name='plus-outline' fill='darkgreen' style={styles.icon} />    
                    </Animated.View>   
            </TouchableWithoutFeedback>
            </SafeAreaView>
            
        </View>
    )
})
export default AddMenuButton;

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        position:'absolute',
        right:10,
        top:-45,
        elevation: 0,
        zIndex: 2,
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