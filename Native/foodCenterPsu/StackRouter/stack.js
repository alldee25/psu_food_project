import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import ProfileScreen from '../UserScreens/ProfileScreen';

const stack = createStackNavigator();

function Stack() {

    return (
    
        <stack.Navigator initialRouteName="รายการ">
            <stack.Screen name="รายการ" component={DetialScreen}  />                                
            <stack.Screen name="Profile" component={ProfileScreen} />       
        </stack.Navigator> 
        
       
        )
        
}
export default Stack;
