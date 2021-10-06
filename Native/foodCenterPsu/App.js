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
import { Heading, HStack, NativeBaseProvider, Spinner, extendTheme } from 'native-base';
import { Provider } from 'react-redux';
import { Store } from './src/redux/store';
import PushNotification from 'react-native-push-notification';
import { io } from 'socket.io-client';

const AuthContext = React.createContext();
const data = {"UserType": "store", "logedIn": true, "usersData": [{"adress": "สำนักงานสมอลแอร์อาคารเกรท ชั้นสองซอยลาดพร้าว 1", "dob": "2001-07-13", "email": "Audiffss@47gmail.com", "gender": "", "id": 38, "idcard": "1940500129878", "idend": "2021-07-29", "idstart": "2021-07-09", "lastname": "", "name": "Yameelah ", "nationality": "Thai", "password": "", "phone": "0843122599", "race": "Thai", "religion": "islam", "store_id": 37}, {"adress": "l", "dob": "l", "email": "l", "gender": "l", "id": 33, "idcard": "l", "idend": "l", "idstart": "l", "lastname": "l", "name": "l", "nationality": "l", "password": "Audi", "phone": "l", "race": "l", "religion": "l", "store_id": 37}]}
const dataCustomer = {"UserType": "customer", "logedIn": true, "usersData": [{"email": "1234", "id": 4, "img": "", "lastname": "a", "name": "a", "password": "$2b$10$IcMBuX.sUst8kvZNd3J.4OHwee0Bg48PTdYwDbWNMhpBhF6GjxAr2", "phone": "1234", "username": "a"}], "usersImg": ""}
const dataStore = {"UserType": "store", "logedIn": true, "usersData": [{"adress": "42 หมู่ 1 บ้านสังแกตำบลสะเดาอำเภอบัวเชดจังหว", "dob": "1990-11-13", "email": "Audiffss@47gmail.com", "gender": "", "id": 31, "idcard": "1940500129879", "idend": "2021-08-07", "idstart": "2021-07-01", "lastname": "", "name": "Yasmin", "nationality": "Thai", "password": "1234", "phone": "0843122599", "race": "Thai", "religion": "islam", "store_id": 38}]}

const theme = extendTheme({
  fontConfig: {
    IBMPlexSansThai: {
      400: {
        normal: 'IBMPlexSansThai-Regular',
      },
      500: {
        normal: 'IBMPlexSansThai-Medium',
      },
      600: {
        normal: 'IBMPlexSansThai-Bold',
      },
    },
  },
  fonts: {
    heading: 'IBMPlexSansThai-Bold',
    body: 'IBMPlexSansThai-SemiBold',
    mono: 'IBMPlexSansThai-Regular',
  },
});

export default function App() {
 
  const [auth, setAuth] = useState('');
  const [userData, setUserData] = useState(null);
  const [userImg, setUserImg] = useState('');
  const [userType, setUserType] =  useState('');
  const  [isload, setIsload] = useState(true)
  const socket = io('http://192.168.1.102:3001')

    const crateChannels =()=> {
      PushNotification.createChannel({
          channelId:'channel',
          channelName:'test'
      })
  }
  const callNotifition = () => {
          
    PushNotification.localNotification(
        {
          channelId:'channel',
          title:'มีออร์เดอร์เข้าคะ',
          message:'โปรดตรวจสอบออร์เอร์'
        }
    )
  }
  const callNotifitionUser = () => {
          
    PushNotification.localNotification(
        {
          channelId:'channel',
          title:'ออร์เดอร์เปลี่ยนสถานะแล้วคะ',
          message:'โปรดตรวจสอบออร์เดอร์',
          show_in_foreground: true,
          action: 'android.intent.action.MAIN',
          bigPictureUrl:require('./assets/img/Cute_woman.png'),
          playSound: true,
          soundName: "default"
          
        }
    )
  }

  React.useEffect(()=>{
    crateChannels()
    SplashScreen.hide() 
      axios.get('http://192.168.1.102:3001/getSession').then((res)=>{
      if(res.data.logedIn === true){
        setUserData(res.data);
        setUserImg(res.data.usersImg);
        setUserType(res.data.UserType);
        setIsload(false)               
      }else{
          setIsload(false)
          setUserData(null);
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
      },[auth]) 

  if ((userData !== null) && ((userType == 'customer') || (userType == 'student'))) {
    return (
    <>
    <Provider store={Store} >
      <NativeBaseProvider theme={theme} >
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <AuthContext.Provider value={{ auth,socket,callNotifitionUser, setAuth, setIsload, userImg, userType, userData}}>
            <NavigationContainer>        
              <Tabs />                                               
            </NavigationContainer>
          </AuthContext.Provider>
        </ApplicationProvider>
      </NativeBaseProvider>  
    </Provider>
      
  </>
  );
  } else if(userData !== null && userType == 'store' ) {
    return(
      <>
      <NativeBaseProvider theme={theme}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <AuthContext.Provider value={{ auth, socket, callNotifition, setAuth, setIsload, userImg, userType, userData}}>            
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
      <NativeBaseProvider theme={theme}>
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

