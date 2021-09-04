import { Button, Card, Icon, Input } from '@ui-kitten/components';
import * as React from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'


const person = (props) => (
    <Icon {...props} name='person'/>
  );

export default function RegisterScreen() {
    return (
        <View>   
            <ImageBackground
                blurRadius={15}
                style={{width:'100%',height:'100%',display:'flex',justifyContent:'flex-end'}} 
                source={require('../assets/img/summer-composition-with-ingredients-blank-space.jpg')} 
            >
                <View style={styles.form}>
                <ScrollView style={{width:'100%',height:'100%'}}>
                    <View style={{width:'100%',height:'100%',display:'flex',alignItems:'center'}}>
                    <Image 
                    source={require("../assets/img/pngkey.com-profile-icon-png-2024691.png")}
                    style={{width:50,height:50,tintColor:'blue',marginTop:30}}
                />
                <Input                    
                        status='primary'
                        placeholder='First Name'
                        style={styles.Input}
                        accessoryLeft={person}                      
                    />
                    <Input                    
                        status='primary'
                        placeholder='Last Name'
                        style={styles.Input}
                        accessoryLeft={person}                      
                    />
                    <Input                    
                        status='primary'
                        placeholder='Username'
                        style={styles.Input}
                        accessoryLeft={person}                      
                    />
                    <Input                    
                        status='primary'
                        placeholder='Password'
                        style={styles.Input}
                        accessoryLeft={person}                      
                    />
                    <Input                    
                        status='primary'
                        placeholder='Phone'
                        style={styles.Input}
                        accessoryLeft={person}                      
                    />
                    <Input                    
                        status='primary'
                        placeholder='Email'
                        style={styles.Input}
                        accessoryLeft={person}                      
                    />
                    
                    <Button                       
                        size='small' 
                        style={styles.buttonSignin}                        
                        
                    >
                        <Text>
                            Signin
                        </Text>
                    </Button>
                    </View>                   
                      
                                    
                </ScrollView>
            </View>
                
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    Input:{
        marginTop: 30,
        width:'80%',
        borderRadius:15
    },
    form:{
        display:'flex',
        alignItems:'center',
        backgroundColor:'white',
        width:'100%',
        height:'90%',
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        opacity:0.8
    },
    buttonSignin:{
        marginTop: 30,
        width:'50%',
        borderRadius:20, 
      }
})

