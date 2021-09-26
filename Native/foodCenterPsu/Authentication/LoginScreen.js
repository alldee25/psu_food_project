import * as React from 'react';
import * as Progress from 'react-native-progress';
import { ImageBackground, StyleSheet, TextInput, TouchableOpacity,RefreshControl,TouchableWithoutFeedback,  Alert } from 'react-native'
import { Button, IndexPath, Input, Select, SelectItem } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon, MenuItem, Spinner } from '@ui-kitten/components';
import { useState } from 'react';
import RegisterScreen from './RegisterScreen';
import axios from 'axios';
import { Divider,
    Flex,
    Text,
    Heading,
    Box,
    View
     } from "native-base"
import { AuthContext } from '../App';


const selectUserStack = createStackNavigator();

const person = (props) => (
    <Icon {...props} name='person'/>
  );

const home = (props) => (
    <Icon {...props} name='home'/>
  );

const LoadingIndicator = (props) => (
<View style={[props.style, styles.indicator]}>
    <Spinner size='small'/>
</View>
);

export default function LoginScreen() {

    return (
        <selectUserStack.Navigator initialRouteName="รายการ">
            <selectUserStack.Screen 
                name="userType" 
                component={MenuUserType} 
                options={{
                    headerShown:false,
                    }} 
            />                                
            <selectUserStack.Screen name="customer" component={Loin} />              
            <selectUserStack.Screen name="student" component={Loin} />              
            <selectUserStack.Screen name="store" component={Loin} />              
            <selectUserStack.Screen name="Register" component={RegisterScreen} />              
        </selectUserStack.Navigator>
    )
}
const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline'/>
  );
const Loin =({navigation,route})=>{

    const {setAuth,auth} = React.useContext(AuthContext)
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [process, setProcess] = React.useState(false);
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderCaption = () => {
        return (
          <View style={styles.captionContainer}>
            {AlertIcon(styles.captionIcon)}
            <Text style={styles.captionText}>Should contain at least 8 symbols</Text>
          </View>
        )
      }
    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
        </TouchableWithoutFeedback>
    );

    const login =()=>{
        
        setProcess(true)
        axios.post(`http://192.168.1.102:3001/${route.params.userType}`,{
            userType:route.params.userType,
            username:username,
            password:password
        }).then((res)=>{
            if (res.data.message) {
                Alert.alert(
                    res.data.message,
                    "Try Again",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                  );
                  setProcess(false);
            } else {                 
            setAuth('login')     
        }
        }).catch((error)=>{
            setProcess(false)
            console.log(error);
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
                            <Input 
                                value={username} 
                                placeholder='Username' 
                                onChangeText={nextValue => setUsername(nextValue)} 
                                size="medium" style={styles.input}
                                caption={renderCaption}
                                accessoryRight={renderIcon}
                                secureTextEntry={secureTextEntry}
                            />
                            <Input value={password} placeholder='Password' onChangeText={nextValue => setPassword(nextValue)} size="medium" style={styles.input}/>         
                            <View style={{display:'flex',alignItems:'center',width:'80%'}}>
                                <Button 
                                    size='small' 
                                    style={styles.buttonLogin}
                                    onPress={login}
                                    
                                >
                                    {process ? (<Progress.Circle size={30} indeterminate={true} color="white" />):(<Text>Log in</Text>)}                                              
                                </Button>
                            </View>
                            {route.params.userType == 'customer' ?  (
                            <View  style={{marginTop:10,display:'flex',alignItems:"center",width:'100%'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center',width:250,marginTop:10}}>
                                <View style={{flex:1, height: 0.7, backgroundColor: 'white'}} />
                                <View>
                                    <Text style={{width: 120, textAlign: 'center',marginLeft:5,marginRight:5,color:'white'}}>
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
                <View flexDirection='column' alignItems='center'  mt={4} w='100%' h='60%' >
                               <TouchableOpacity
                                    onPress={()=> navigation.navigate('customer',{userType:'customer'})}
                                    style={styles.userTypeButton}
                               >
                                    <Text color="white" >
                                        ลูกค้าทั่วไป    
                                    </Text>
                                    <View position='absolute' top={7} right={2} >
                                        <Icon style={styles.icon} fill='white' name='arrow-ios-forward-outline' />
                                    </View>
                                </TouchableOpacity>   
                               <TouchableOpacity
                                    onPress={()=> navigation.navigate('student',{userType:'student'})}
                                    style={styles.userTypeButton}
                               >
                                    <Text color="white" >
                                        นักศึกษา    
                                    </Text>
                                    <View position='absolute' top={7} right={2} >
                                        <Icon style={styles.icon} fill='white' name='arrow-ios-forward-outline' />
                                    </View>
                                </TouchableOpacity>   
                               <TouchableOpacity
                                    onPress={()=> navigation.navigate('store',{userType:'store'})} 
                                    style={styles.userTypeButton}
                               >
                                    <Text color="white" >
                                        ร้านค้า    
                                    </Text>
                                    <View position='absolute' top={7} right={2} >
                                        <Icon style={styles.icon} fill='white' name='arrow-ios-forward-outline' />
                                    </View>
                                </TouchableOpacity>   
                            </View>               
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
    opacity:0.25
    },
    button:{
    marginTop: 15,
    width:200,
    borderRadius:20, 
    },
    userTypeButton:{
    backgroundColor:'#049A9E',
    position:'relative',
    borderWidth:1,
    borderRadius:10,
    height:'30%',
    width:'100%',
    borderColor:'white',
    justifyContent:'center',
    alignItems:'center',
    opacity:0.7
    },
    captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5
    },
    captionText: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "opensans-regular",
    color: "#8F9BB3",
    },
    captionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
})

