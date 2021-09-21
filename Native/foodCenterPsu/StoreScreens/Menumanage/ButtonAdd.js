import { Icon } from '@ui-kitten/components'
import React, { createRef, forwardRef, useRef, useState } from 'react'
import { Animated, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const ButtonTop = forwardRef((props,ref)=> {
    
    return ( 
    
        <View style={styles.container}>
            <SafeAreaView>
                <TouchableOpacity              
                     onPress={()=> ref()}>
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
        marginRight:10
    },
    icon: {
        width: 30,
        height: 30,
      },
})