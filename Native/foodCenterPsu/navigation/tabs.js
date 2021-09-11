import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Customer&StudentScreens/HomeScreen';
import MenuScreen from '../Customer&StudentScreens/MenuScreen';
import ProfileScreen from '../Customer&StudentScreens/ProfileScreen';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../App';
import OrdersScreen from '../StoreScreens/OrdersScreen';
import ManageScreen from '../StoreScreens/ManageScreen';

const Tab = createBottomTabNavigator();
const Tabs = () =>{

    const {userType} = React.useContext(AuthContext)

    return(
        userType !== 'store' ? (
        <Tab.Navigator
        initialRouteName="detial" 
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position:'absolute',
                    bottom: 20,
                    left:20,
                    right:20,
                    elevation:0,
                    backgroundColor:'#ffff',
                    borderRadius:15,
                    height:60,
                    ...styles.shadow
                }
            }}
            >
            <Tab.Screen name="Profile" component={ProfileScreen} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems:'center',justifyContent:'center',top:5}}>
                            <Image source={require('../assets/img/pngkey.com-profile-icon-png-2024691.png')}
                            resizeMode='contain'
                            style={{width:20,height:25,tintColor: focused ?'#e32f45' : '#748c94'}} />
                            <Text key='1' style={{color: focused ?'#e32f45' : '#748c94',fontSize:12}} >
                                Profile
                            </Text>
                        </View>
                    )
                }}    
            /> 
            <Tab.Screen name="เมนู" component={HomeScreen} 
                options={{
                    headerStyle:{
                        backgroundColor: '#f4511e',
                        borderBottomRightRadius: 20,
                        height:130
                    },
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems:'center',justifyContent:'center',top:5}}>
                            <Image source={require('../assets/img/meal-food.png')}
                            resizeMode='contain'
                            style={{width:20,height:25,tintColor: focused ?'#e32f45' : '#748c94'}} />
                            <Text key='2' style={{color: focused ?'#e32f45' : '#748c94',fontSize:12}} >
                                เมนู
                            </Text>
                        </View>
                    )
                }}    
            />         
            <Tab.Screen name="รายการ" component={MenuScreen}
            screenOptions={{ headerShown: false }}
            options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems:'center',justifyContent:'center',top:5}}>
                        <Image source={require('../assets/img/menu.png')}
                        resizeMode='contain'
                        style={{width:25.5,height:25.5,tintColor: focused ?'#e32f45' : '#748c94'}} />
                        <Text key='3' style={{color: focused ?'#e32f45' : '#748c94',fontSize:12}}>
                            รายการ
                        </Text>
                    </View>
                )
            }} 
            />       
        </Tab.Navigator>
        ):(
            <Tab.Navigator
            initialRouteName="detial" 
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position:'absolute',
                        bottom: 20,
                        left:20,
                        right:20,
                        elevation:0,
                        backgroundColor:'#ffff',
                        borderRadius:15,
                        height:60,
                        ...styles.shadow
                    }
                }}
                >
                <Tab.Screen name="Profile" component={ProfileScreen} 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems:'center',justifyContent:'center',top:5}}>
                                <Image source={require('../assets/img/pngkey.com-profile-icon-png-2024691.png')}
                                resizeMode='contain'
                                style={{width:20,height:25,tintColor: focused ?'#e32f45' : '#748c94'}} />
                                <Text key='1' style={{color: focused ?'#e32f45' : '#748c94',fontSize:12}} >
                                    Profile
                                </Text>
                            </View>
                        )
                    }}    
                /> 
                <Tab.Screen name="Orders" component={OrdersScreen} 
                    options={{
                        headerStyle:{
                            borderBottomRightRadius: 20,
                            height:130,                         
                        },
                        headerTitle:(props) => (<View>
                          <Image 
                        resizeMode='contain'
                        style={{zIndex:-1,width:350,borderBottomRightRadius: 20,marginLeft:20}}
                        source={require('../assets/img/AdobeStock_249134444_Preview.jpeg')} />  
                        </View>
                        ),                    
                        headerTitleStyle: { flex: 1, textAlign: 'center' },
                        tabBarIcon: ({focused}) => (
                            <View style={{alignItems:'center',justifyContent:'center',top:5}}>
                                <Image source={require('../assets/img/file-text-outline.png')}
                                resizeMode='contain'
                                style={{width:20,height:25,color: focused ?'#e32f45' : '#748c94'}} />
                                <Text key='2' style={{color: focused ?'#e32f45' : '#748c94',fontSize:12}} >
                                    Orders
                                </Text>
                            </View>
                        )
                    }}    
                />         
                <Tab.Screen name="รายการ" component={ManageScreen}
                screenOptions={{ headerShown: false }}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems:'center',justifyContent:'center',top:5}}>
                            <Image source={require('../assets/img/menu.png')}
                            resizeMode='contain'
                            style={{width:25.5,height:25.5,tintColor: focused ?'#e32f45' : '#748c94'}} />
                            <Text key='3' style={{color: focused ?'#e32f45' : '#748c94',fontSize:12}}>
                                รายการ
                            </Text>
                        </View>
                    )
                }} 
                />       
            </Tab.Navigator>   
        )
        
    );
}
export default Tabs;
const styles = StyleSheet.create({
    shadow: {
        shadowColor:'#7F5DF0',
        shadowOffset:{
            width:0,
            height: 10,
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5 
    }
})