import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import Tabs from './navigation/tabs';
import * as eva from '@eva-design/eva';
import { ApplicationProvider,IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import ProfileScreen from './UserScreens/ProfileScreen';
import Stack from './StackRouter/stack';
import MenuScreen from './UserScreens/MenuScreen';
import { useState } from 'react';
import LoginScreen from './Authentication/LoginScreen';
import axios from 'axios';

const stack = createStackNavigator();

export default function App({navigation}) {

  const [auth, setAuth] = useState(null);
  const [userImg, setUserImg] = useState('');
  const [animation, setAnimation] = useState('');
  const [userType, setUserType] =  useState('');
  const  [isload, setIsload] = useState(true)

  React.useEffect(()=>{
    axios.get('http://192.168.1.102:3001/getSession').then((res)=>{
      console.log("Me");
      console.log("userType"+userType);
      if(res.data.logedIn === true){
        setAuth(res.data);
        setUserImg(res.data.usersImg);
        setUserType(res.data.UserType);
        setIsload(false)
    }
    
    else{
      setIsload(false)
    }
    return unsubscribe;
    })
  },[])


  if (auth !== null && userType == 'customer') {
    return (

    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </ApplicationProvider>
  </>
  );
  } else {
    return(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            <LoginScreen />
          </NavigationContainer>
        </ApplicationProvider>
      </>
    )
  }
  
}


