import React from 'react'
import { SafeAreaView, Text, View, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { Icon, MenuItem } from '@ui-kitten/components';

const HistoryStack = createStackNavigator();
const ForwardIcon = (props) => (
    
    <Icon {...props} name='arrow-ios-forward'/>
  );

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

export const History = () => {
    return (
        <HistoryStack.Navigator initialRouteName="รายการ">
            <HistoryStack.Screen name="History" component={HistoryMenu} />                                
            <HistoryStack.Screen name="OrdeHistory" component={OrdeHistory} />       
            <HistoryStack.Screen name="UnOrdeHistory" component={UnOrdeHistory} />       
        </HistoryStack.Navigator> 
    )
}
const HistoryMenu =({navigation})=>{
    return(
        <SafeAreaView style={styles.container}> 
            <MenuItem style={styles.MenuItem} title='OrdeHistory' onPress={()=> navigation.navigate('OrdeHistory')} accessoryRight={ForwardIcon} />
            <MenuItem style={styles.MenuItem} title='UnOrdeHistory' onPress={()=> navigation.navigate('UnOrdeHistory')} accessoryRight={ForwardIcon} />
        </SafeAreaView>
    )
}
const OrdeHistory =()=>{

    return(
        <View>
            <Text>
                OrdeHistory 
            </Text>
        </View>
    )
}
const UnOrdeHistory =()=>{

    return(
        <View>
            <Text>
            UnOrdeHistory 
            </Text>
        </View>
    )
}
