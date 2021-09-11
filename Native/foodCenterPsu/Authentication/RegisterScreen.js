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
                style={{width:'100%',height:'100%',display:'flex',justifyContent:'flex-end'}} 
                source={require('../assets/img/summer-composition-with-ingredients-blank-space.jpg')} 
            >
                <View style={styles.formView}>
                <ScrollView style={{width:'100%',height:'100%'}}>                 
                    <Image 
                    source={require("../assets/img/pngkey.com-profile-icon-png-2024691.png")}
                    style={{width:50,height:50,tintColor:'blue',marginTop:30}}
                />
                <Formik 
                    onSubmit={(values) => signup(values)}
                    initialValues={{name:'',lastname:'',username:'',password:'',phone:'',email:''}}
                >
                {({ handleChange, handleBlur, handleSubmit, values }) =>(
                    <View style={{width:'100%',height:'100%',display:'flex',alignItems:'center'}}>
                <Input                    
                        status='primary'
                        placeholder='First Name'
                        style={styles.Input}
                        accessoryLeft={person}
                        value={values.name}
                        type="text"
                        handleBlur="name"                      
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
                        accessoryLeft={person} 
                        value={values.password}
                        type="password"
                        onChangeText={handleChange('password')}                     
                    />
                    <Input                    
                        status='primary'
                        placeholder='Phone'
                        style={styles.Input}
                        accessoryLeft={person} 
                        value={values.phone}
                        type="phone"
                        onChangeText={handleChange('phone')}                     
                    />
                    <Input                    
                        status='primary'
                        placeholder='Email'
                        style={styles.Input}
                        accessoryLeft={person} 
                        value={values.email}
                        type="email"
                        onChangeText={handleChange('email')}                     
                    />
                    <Button                       
                        size='small' 
                        style={styles.buttonSignin}
                        type="submit" 
                        onPress={handleSubmit}                    
                        
                    >
                        {process ? (<Progress.Circle size={30} indeterminate={true} color="white" />)
                        :
                        (<Text>Log in</Text>)}                       
                    </Button>                        
                    </View>

                )}
                    </Formik>                                                                       
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
    formView:{
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

