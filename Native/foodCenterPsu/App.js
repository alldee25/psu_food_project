import * as React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {  ImageBackground, StyleSheet, Text, View } from 'react-native';
import Tabs from './navigation/tabs';
import * as eva from '@eva-design/eva';
import { ApplicationProvider,IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { useState } from 'react';
import LoginScreen from './Authentication/LoginScreen';
import axios from 'axios';
import 'react-native-gesture-handler';
import { Heading, HStack, NativeBaseProvider, Spinner } from 'native-base';


const data = {"UserType": "store", "logedIn": true, "usersData": [{"adress": "สำนักงานสมอลแอร์อาคารเกรท ชั้นสองซอยลาดพร้าว 1", "dob": "2001-07-13", "email": "Audiffss@47gmail.com", "gender": "", "id": 38, "idcard": "1940500129878", "idend": "2021-07-29", "idstart": "2021-07-09", "lastname": "", "name": "Yameelah ", "nationality": "Thai", "password": "", "phone": "0843122599", "race": "Thai", "religion": "islam", "store_id": 37}, {"adress": "l", "dob": "l", "email": "l", "gender": "l", "id": 33, "idcard": "l", "idend": "l", "idstart": "l", "lastname": "l", "name": "l", "nationality": "l", "password": "Audi", "phone": "l", "race": "l", "religion": "l", "store_id": 37}]}
const AuthContext = React.createContext();

export default function App() {
  
  const [auth, setAuth] = useState('');
  const [userData, setUserData] = useState(data);
  const [userImg, setUserImg] = useState('');
  const [userType, setUserType] =  useState('store');
  const  [isload, setIsload] = useState(true)

  const apiGetSession =()=>{
    axios.get('http://192.168.1.102:3001/getSession').then((res)=>{
      if(res.data.logedIn === true){
        setUserData(res.data);
        setUserImg(res.data.usersImg);
        setUserType(res.data.UserType);
        setIsload(false)               
      }else{
          setIsload(false)
          setUserData('');
          setUserImg('');
          setUserType('');
        }
        }).catch((error)=>{
          Alert.alert(
            error,
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
          setIsload(false)         
        })
  } 

  React.useEffect(()=>{
    SplashScreen.hide() 
    let isMounted = true;
    /* apiGetSession(); */
    return () => { isMounted = false}; 
      },[auth]) 

  if ((userData !== null) && ((userType == 'customer') || (userType == 'student'))) {
    return (
    <>
    <NativeBaseProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <AuthContext.Provider value={{ setAuth,setIsload,userImg,userType}}>
          <NavigationContainer>        
            <Tabs />                                               
          </NavigationContainer>
        </AuthContext.Provider>
      </ApplicationProvider>
    </NativeBaseProvider>  
  </>
  );
  } else if(userData !== null && userType == 'store' ) {
    return(
      <>
      <NativeBaseProvider >
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <AuthContext.Provider value={{ auth, setAuth, setIsload, userImg, userType, userData}}>            
            <NavigationContainer>   
              <Tabs/>                                                                   
            </NavigationContainer>          
          </AuthContext.Provider>
        </ApplicationProvider>
      </NativeBaseProvider>     
      </>
    )
  }
  else if(isload == true) {
    return(
      <>
      <NativeBaseProvider>
        <ApplicationProvider {...eva} theme={eva.light}>
          <View style={styles.filter} />
          <ImageBackground
          style={styles.loadingPage}
          blurRadius={15}
          source={require('./assets/img/summer-composition-with-ingredients-blank-space.jpg')}>
            <HStack space={2}>
              <Heading color="azure" zIndex={3}>Loading...</Heading>
              <Spinner size="lg" color="azure" zIndex={3} accessibilityLabel="Loading posts" />
            </HStack>      
        </ImageBackground>
      </ApplicationProvider>
       <IconRegistry icons={EvaIconsPack} />
      </NativeBaseProvider>
      
        
      </>
    )
  }
  else {
    return(
      <>  
      <NativeBaseProvider>
        <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={eva.light}> 
            <AuthContext.Provider value={{ setIsload, setAuth, }}>      
                <NavigationContainer>
                    <LoginScreen />
                </NavigationContainer>
            </AuthContext.Provider>
          </ApplicationProvider>        
      </NativeBaseProvider>

      </>
    
    )
  }
}
export { AuthContext }
const styles = StyleSheet.create({
  loadingPage:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    height:'100%'
  },
  filter:{
  color:'white',
  position:'absolute',
  backgroundColor:"black",
  width:'100%',
  height:'100%',
  opacity:0.25,
  zIndex:2
}
})

