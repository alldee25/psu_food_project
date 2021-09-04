import * as React from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity,RefreshControl, View } from 'react-native'
import { Button, IndexPath, Input, Select, SelectItem } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon, MenuItem } from '@ui-kitten/components';
import { useState } from 'react';
import RegisterScreen from './RegisterScreen';
import axios from 'axios';

const selectUserStack = createStackNavigator();

const person = (props) => (
    <Icon {...props} name='person'/>
  );

const home = (props) => (
    <Icon {...props} name='home'/>
  );

export default function LoginScreen() {

    return (
        <selectUserStack.Navigator initialRouteName="รายการ">
            <selectUserStack.Screen name="userType" component={MenuUserType} options={{headerShown:false}} />                                
            <selectUserStack.Screen name="customer" component={Loin} />              
            <selectUserStack.Screen name="student" component={Loin} />              
            <selectUserStack.Screen name="store" component={Loin} />              
            <selectUserStack.Screen name="Register" component={RegisterScreen} />              
        </selectUserStack.Navigator>
    )
}
const Loin =({navigation,route})=>{

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const login =()=>{
        console.log("audi");
        axios.post(`http://192.168.1.102:3001/${route.params.userType}`,{
            userType:route.params.userType,
            username:username,
            password:password
        }).then((res)=>{
            console.log(res.message);
            navigation.goBack();
        })
    }

    return(
        <View > 
            <ImageBackground 
                blurRadius={15} 
                source={require('../assets/img/summer-composition-with-ingredients-blank-space.jpg')} 
                resizeMode="cover"  
                style={styles.image} 
            >
                    <View style={styles.filter} /> 
                        <View style={styles.formInput}>       
                            <Input value={username} placeholder='Username' onChangeText={nextValue => setUsername(nextValue)} size="medium" style={styles.input}/>
                            <Input value={password} placeholder='Password' onChangeText={nextValue => setPassword(nextValue)} size="medium" style={styles.input}/>         
                            <View style={{display:'flex',alignItems:'center',width:'80%'}}>
                                <Button 
                                    size='small' 
                                    style={styles.buttonLogin}
                                    onPress={login} 
                                >
                                    Log in
                                </Button>
                            </View>
                            {route.params.userType == 'customer' ?  (
                            <View  style={{marginTop:10,display:'flex',alignItems:"center",width:'100%'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center',width:250,marginTop:10}}>
                                <View style={{flex:1, height: 0.7, backgroundColor: 'white'}} />
                                <View>
                                    <Text style={{width: 100, textAlign: 'center',marginLeft:5,marginRight:5,color:'white'}}>
                                        Witout account
                                    </Text>
                                </View>
                                <View style={{flex: 1, height: 0.7, backgroundColor: 'white'}} />
                            </View>
                            <View style={{display:'flex',alignItems:'center',width:'80%',marginTop:10}}>
                                <Button 
                                    status='control' 
                                    size='small' 
                                    style={styles.buttonLogin} 
                                    appearance='outline'
                                    onPress={()=> navigation.navigate('Register')}
                                >
                                    <Text>
                                        Signup
                                    </Text>
                                </Button>  
                            </View>
                            </View>
                        ):(<View />)}                  
                    </View>              
            </ImageBackground>          
        </View> 
    )
}
const MenuUserType =({navigation})=>{
    return (       
        <View>
            <ImageBackground source={require('../assets/img/summer-composition-with-ingredients-blank-space.jpg')} resizeMode="cover"  style={styles.image} > 
            <View style={styles.filter} />  
                <View style={{display:'flex',alignItems:'center',marginTop:20,justifyContent:'center'}}>
                    <Button
                        accessoryLeft={person}                  
                        style={styles.buttonLogin} 
                        onPress={()=> navigation.navigate('customer',{userType:'customer'})} 
                    >                         
                            <Text>
                                ลูกค้าทั่วไป
                            </Text>                                                              
                    </Button>
                    <Button
                        accessoryLeft={person}   
                        style={styles.buttonLogin} 
                        onPress={()=> navigation.navigate('student',{userType:'student'})}
                    >                           
                            <Text >
                                นักศึกษา 
                            </Text>                                                                                      
                    </Button> 
                    <Button 
                        accessoryLeft={home} 
                        style={styles.buttonLogin} 
                        onPress={()=> navigation.navigate('store',{userType:'store'})}  
                        >
                            <Text >
                                ร้านค้า
                            </Text>
                    </Button>    
                </View>                
            </ImageBackground>          
        </View>
        )
}
const styles = StyleSheet.create({
    image:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center'
    },
    input:{
        marginTop: 15,
        width:'80%',
        borderRadius:15
    },
    formInput:{
        display:"flex",
        flexDirection:"column",
        alignItems:'center',
        justifyContent:"flex-start",
        position:"absolute",
        bottom:0,
        width:'100%',
        height:'50%'
      },
    buttonLogin:{
        marginTop: 15,
        width:'50%',
        borderRadius:20, 
      },
      icon: {
        width: 32,
        height: 20,
        color:"black"
      },
      textInButton:{
          display:'flex',
          alignItems:'center',
          justifyContent:"center",
          width:160,
          marginLeft:20
      },
      filter:{
          position:'absolute',
        backgroundColor:"black",
        width:'100%',
        height:'100%',
        opacity:0.3
      }
})

