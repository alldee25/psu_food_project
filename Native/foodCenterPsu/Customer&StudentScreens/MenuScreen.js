import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import { AppRegistry, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Icon, MenuItem } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { CommonActions } from '@react-navigation/native';
import { History } from './History';

const stack = createStackNavigator();


const ForwardIcon = (props) => (
    
    <Icon {...props} name='arrow-ios-forward'/>
  );

const Menu =()=>{
    const [data,setData] = React.useState([]);
    return(
        <stack.Navigator initialRouteName="รายการ">
            <stack.Screen name="รายการ" component={MenuStack}  />                                
            <stack.Screen name="Profile" component={ProfileScreen} />       
            <stack.Screen name="HistoryMenu" component={History} options={{headerShown:false}}/>       
        </stack.Navigator>                       
    )
}
export default Menu;
const MenuStack = ({navigation})=>{
    return(
        <SafeAreaView style={styles.container}> 
            <MenuItem style={styles.MenuItem} title='profile' onPress={()=> navigation.navigate('Profile')} accessoryRight={ForwardIcon} />
            <MenuItem style={styles.MenuItem} title='detial' onPress={()=> navigation.navigate('รายการ')} accessoryRight={ForwardIcon} />
            <MenuItem style={styles.MenuItem} title='History' onPress={()=> navigation.navigate('HistoryMenu')} accessoryRight={ForwardIcon} />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        display:'flex',
        alignItems:"flex-start",
        marginTop:10
    },
    MenuItem:{
        marginTop:5
    }
})