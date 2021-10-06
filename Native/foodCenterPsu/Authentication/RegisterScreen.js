import { Button, Card, Icon, Input } from '@ui-kitten/components';
import axios from 'axios';
import * as React from 'react';
import * as Progress from 'react-native-progress';
import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Formik } from 'formik';


const person = (props) => (
    <Icon {...props} name='person'/>
  );

export default function RegisterScreen() {
    const [process, setProcess] = React.useState(false); 

    const signup = (values) =>{
        axios.post('http://192.168.1.102:3001/signup',{
            name:values.name, 
            lastname:values.lastname, 
            username:values.username,
            password:values.password,
            phone:values.phone, 
            email:values.email
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
        })
    }

    return (
        <View>   
            <ImageBackground
                blurRadius={15}
                style={{width:'100%',height:'100%',justifyContent:'flex-end'}} 
                source={require('../assets/img/summer-composition-with-ingredients-blank-space.jpg')} 
            >
                <View style={styles.formView}>
                <ScrollView style={{width:'100%',height:'80%'}}>
                    <View
                        style={{alignItems:'center',width:'100%',height:'100%',marginBottom:5}}
                    >
                       <Image 
                    source={require("../assets/img/pngkey.com-profile-icon-png-2024691.png")}
                    style={{width:50,height:50,tintColor:'blue',marginTop:30}}
                />
                <Formik 
                    onSubmit={(values) => signup(values)}
                    initialValues={{name:'',lastname:'',username:'',password:'',phone:'',email:''}}
                >
                {({ handleChange, handleSubmit, values }) =>(
                    <View style={{width:'100%',height:'100%',display:'flex',alignItems:'center'}}>
                    <Input                    
                        status='primary'
                        placeholder='First Name'
                        style={styles.Input}
                        accessoryLeft={person}
                        value={values.name}
                        type="text"                     
                        onChangeText={handleChange('name')}                      
                    />                   
                    <Input                    
                        status='primary'
                        placeholder='LastName'
                        style={styles.Input}
                        accessoryLeft={person}
                        value={values.lastname}
                        type="text"
                        onChangeText={handleChange('lastname')}                      
                    />
                    <Input                    
                        status='primary'
                        placeholder='Username'
                        style={styles.Input}
                        accessoryLeft={person} 
                        value={values.username}
                        type="text"
                        onChangeText={handleChange('username')}                     
                    />
                    <Input                    
                        status='primary'
                        placeholder='Password'
                        style={styles.Input}
                        accessoryLeft={<Icon name='lock-outline' fill='#B22234' style={{width:20,height:20}} />} 
                        value={values.password}
                        type="password"
                        onChangeText={handleChange('password')}                     
                    />
                    <Input                    
                        status='primary'
                        placeholder='Phone'
                        style={styles.Input}
                        accessoryLeft={<Icon name='phone-outline' fill='#FCC65B' style={{width:20,height:20}} />} 
                        value={values.phone}
                        type="phone"
                        onChangeText={handleChange('phone')}                     
                    />
                    <Input                    
                        status='primary'
                        placeholder='Email'
                        style={styles.Input}
                        accessoryLeft={<Icon name='email-outline' fill='#FFB0E6' style={{width:20,height:20}} />} 
                        value={values.email}
                        type="email"
                        onChangeText={handleChange('email')}                     
                    />
                    <Button                                              
                        style={styles.buttonSignin}
                        type="submit" 
                        onPress={handleSubmit}                    
                        
                    >
                        {process ? (<Progress.Circle size={30} indeterminate={true} color="white" />)
                        :
                        (<Text>Register</Text>)}                       
                    </Button>                        
                    </View>

                )}
                    </Formik> 
                    </View>                 
                                                                                           
                </ScrollView>
            </View>
                
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    Input:{
        marginTop: 23,
        width:'80%',
        borderRadius:15
    },
    formView:{
        alignItems:'center',
        backgroundColor:'white',
        width:'100%',
        height:'90%',
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        opacity:0.8
    },
    buttonSignin:{
        backgroundColor:'#6D5FC9',
        marginTop: 20,
        width:'50%',
        borderRadius:20, 
      }
})

