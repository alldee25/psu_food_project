import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Customer&StudentScreens/HomeScreen';
import ProfileScreen from '../Customer&StudentScreens/ProfileScreen';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../App';
import OrdersScreen from '../StoreScreens/OrdersScreen';
import ManageScreen from '../StoreScreens/ManageScreen';
import { Icon } from '@ui-kitten/components';
import HomeStoreScreen from '../StoreScreens/HomeStoreScreen';
import stackMenuManageScreen from '../StoreScreens/Menumanage/MenuList';
import FoodScreen from '../Customer&StudentScreens/FoodScreen';
import InfomationScreen from '../Customer&StudentScreens/InfomationScreen';


const Tab = createBottomTabNavigator();
const Tabs = () =>{

    const {userType} = React.useContext(AuthContext)

    return(
        userType !== 'store' ? (     
            <Tab.Navigator
            sceneContainerStyle={{backgroundColor: '#2F1050'}}
                screenOptions={{
                    color:'#2F1050',
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        shadowColor:'#DC143C',
                        backgroundColor:'transparent',                                 
                        shadowOpacity:1,
                        shadowRadius:20,                                  
                        backgroundColor:'transparent',
                        elevation:0,                      
                        height:70,
                                            
                    }
                }}
                >
                <Tab.Screen name="Home" component={HomeScreen} 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{                              
                                position:'absolute',                                      
                                alignItems:'center',
                                justifyContent:'center',
                                backgroundColor: focused ? '#00CED1' : '#ffFFFF',
                                width:60,
                                height:40,
                                borderRadius:15,
                                shadowColor:'#DC143C',                                 
                                shadowOpacity:1,
                                shadowRadius:20,                                  
                                elevation:7
                                }}>
                                <Icon name='home-outline'
                                    style={{width:40,height:25,tintColor: focused ?'#ffFFFF' : '#748c94'}} 
                                />                              
                            </View>
                        )
                    }}    
                /> 
                <Tab.Screen name="Orders" component={FoodScreen} 
                    options={{
                        headerShown: false,
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
                            <View style={{                                    
                                        position:'absolute',                                      
                                        alignItems:'center',
                                        justifyContent:'center',
                                        backgroundColor: focused ? '#00CED1' : '#ffFFFF',
                                        width:60,
                                        height:40,
                                        borderRadius:15,
                                        shadowColor:'#DC143C',                                 
                                        shadowOpacity:1,
                                        shadowRadius:20,                                  
                                        elevation:7
                                        }}>
                                <Icon name='menu-2-outline'
                                    style={{width:40,height:25,tintColor: focused ?'#ffFFFF' : '#748c94'}} 
                                />                                                                                        
                            </View>
                        )
                    }}    
                />         
                <Tab.Screen name="Information" component={InfomationScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{                        
                            position:'absolute',                                      
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor: focused ? '#00CED1' : '#ffFFFF',
                            width:60,
                            height:40,
                            borderRadius:15,
                            shadowColor:'#DC143C',                                 
                            shadowOpacity:1,
                            shadowRadius:20,                                  
                            elevation:7,                           
                            }}>
                            <Icon name='grid-outline'
                                    style={{width:40,height:25,tintColor: focused ?'#ffFFFF' : '#748c94'}} 
                            />
                        </View>
                    )
                }} 
                />       
            </Tab.Navigator>
    
        ):(
            <Tab.Navigator
            sceneContainerStyle={{backgroundColor: '#2F1050'}}
                screenOptions={{
                    color:'#2F1050',
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        shadowColor:'#DC143C',
                        backgroundColor:'#2F1050',                                 
                        shadowOpacity:1,
                        shadowRadius:20,                                  
                        backgroundColor:'transparent',
                        elevation:0,                      
                        height:70,
                                            
                    }
                }}
                >
                <Tab.Screen name="Home" component={HomeStoreScreen} 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View style={{                              
                                position:'absolute',                                      
                                alignItems:'center',
                                justifyContent:'center',
                                backgroundColor: focused ? '#00CED1' : '#ffFFFF',
                                width:60,
                                height:40,
                                borderRadius:15,
                                shadowColor:'#DC143C',                                 
                                shadowOpacity:1,
                                shadowRadius:20,                                  
                                elevation:7
                                }}>
                                <Icon name='home-outline'
                                    style={{width:40,height:25,tintColor: focused ?'#ffFFFF' : '#748c94'}} 
                                />                              
                            </View>
                        )
                    }}    
                /> 
                <Tab.Screen name="Orders" component={OrdersScreen} 
                    options={{
                        headerShown: false,
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
                            <View style={{                                    
                                        position:'absolute',                                      
                                        alignItems:'center',
                                        justifyContent:'center',
                                        backgroundColor: focused ? '#00CED1' : '#ffFFFF',
                                        width:60,
                                        height:40,
                                        borderRadius:15,
                                        shadowColor:'#DC143C',                                 
                                        shadowOpacity:1,
                                        shadowRadius:20,                                  
                                        elevation:7
                                        }}>
                                <Icon name='menu-2-outline'
                                    style={{width:40,height:25,tintColor: focused ?'#ffFFFF' : '#748c94'}} 
                                />                                                                                        
                            </View>
                        )
                    }}    
                />         
                <Tab.Screen name="MenuManage" component={stackMenuManageScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{                        
                            position:'absolute',                                      
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor: focused ? '#00CED1' : '#ffFFFF',
                            width:60,
                            height:40,
                            borderRadius:15,
                            shadowColor:'#DC143C',                                 
                            shadowOpacity:1,
                            shadowRadius:20,                                  
                            elevation:7,                           
                            }}>
                            <Image source={require('../assets/img/menuFood.png')}
                                resizeMode='contain'
                                style={{width:40,height:25,tintColor: focused ?'#ffFFFF' : '#748c94'}} 
                            />
                        </View>
                    )
                }} 
                /> 
                <Tab.Screen name="รายการ" component={ManageScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{                        
                            position:'absolute',                                      
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor: focused ? '#00CED1' : '#ffFFFF',
                            width:60,
                            height:40,
                            borderRadius:15,
                            shadowColor:'#DC143C',                                 
                            shadowOpacity:1,
                            shadowRadius:20,                                  
                            elevation:7,                           
                            }}>
                            <Icon name='grid-outline'
                                    style={{width:40,height:25,tintColor: focused ?'#ffFFFF' : '#748c94'}} 
                            />
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