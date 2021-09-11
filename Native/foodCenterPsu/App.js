import * as React from 'react';
import AwesomeLoading from 'react-native-awesome-loading';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import Tabs from './navigation/tabs';
import * as eva from '@eva-design/eva';
import { ApplicationProvider,IconRegistry, Spinner } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { useState } from 'react';
import LoginScreen from './Authentication/LoginScreen';
import axios from 'axios';

const stack = createStackNavigator();
const AuthContext = React.createContext();

export default function App() {

  const [auth, setAuth] = useState('');
  const [userData, setUserData] = useState(null);
  const [userImg, setUserImg] = useState('');
  const [animation, setAnimation] = useState('');
  const [userType, setUserType] =  useState('');
  const  [isload, setIsload] = useState(true)

  const apiGetSession =()=>{
    axios.get('http://192.168.1.102:3001/getSession').then((res)=>{
    console.log(11);
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
    apiGetSession();
      },[auth]) 
console.log(auth);
  if ((userData !== null) && ((userType == 'customer') || (userType == 'student'))) {
    return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <AuthContext.Provider value={{ setAuth,setIsload,userImg,userType}}>
          <NavigationContainer>
            <Tabs />
          </NavigationContainer>
        </AuthContext.Provider>
      </ApplicationProvider>  
  </>
  );
  } else if(userData !== null && userType == 'store') {
    return(
      
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <AuthContext.Provider value={{ auth, setAuth, setIsload, userImg, userType, userData}}>
            <NavigationContainer>
              <Tabs />
            </NavigationContainer>
          </AuthContext.Provider>
        </ApplicationProvider> 
      </>
      
    )
  }
  else if(isload == true) {
    return(
      <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
          <ImageBackground
          style={styles.loadingPage}
          blurRadius={15}
          source={require('./assets/img/summer-composition-with-ingredients-blank-space.jpg')}>
            <View style={styles.filter} />
             <Spinner status='basic' size='large'/> 
          <Text >
            loadig
          </Text>      
        </ImageBackground>
      </ApplicationProvider>   
      </>
    )
  }
  else {
    return(
      <>  
      <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}> 
          <AuthContext.Provider value={{ setIsload, setAuth, }}>      
              <NavigationContainer>
                  <LoginScreen />
              </NavigationContainer>
          </AuthContext.Provider>
        </ApplicationProvider>
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
  opacity:0.25
}
})

