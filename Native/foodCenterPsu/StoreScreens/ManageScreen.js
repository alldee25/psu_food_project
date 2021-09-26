import { createStackNavigator } from '@react-navigation/stack'
import { Icon, MenuItem,Layout,Tab,TabView } from '@ui-kitten/components';
import axios from 'axios';
import { View,Button} from 'native-base';
import React, { createRef, useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet, SafeAreaView, Text, ImageBackground } from 'react-native'
import { AuthContext } from '../App';
import imagBack from '../assets/img/v748-toon-106.jpg'
import CleaneseLevelDetial from './CleaneseLevelDetial';
import CleaneseLevelList from './CleaneseLevelList';
import ComplaintList from './ComplaintList';
import ComplaintListDetial from './ComplaintListDetial';
import LeaveScreen from './LeaveAddScreen';
import LeaveListScreen from './LeaveListScreen';

const ForwardIcon = (props) => (
    <Icon {...props} name='arrow-ios-forward'/>
  );

export default function ManageScreen() {

    const stackManage = createStackNavigator();
    return (
        <stackManage.Navigator>
            <stackManage.Screen name='จัดการ' component={stackScreen} />           
            <stackManage.Screen name='รายการลา' component={LeaveListScreen} />                    
            <stackManage.Screen name='ระดับคุณภาพความสะอาด' component={CleaneseLevelList} />           
            <stackManage.Screen name='รายละเอียดระดับคุณภาพความสะอาด' component={CleaneseLevelDetial} />           
            <stackManage.Screen name='การแจ้งเตือนความผิด' component={ComplaintList} />           
            <stackManage.Screen name='รายละเอียดการแจ้งเตือน' component={ComplaintListDetial} />           
            <stackManage.Screen name='เพิ่มลาพักจำหน่ายอาหาร' component={LeaveScreen} />           
        </stackManage.Navigator>
    )
}
const stackScreen =({navigation})=>{

    const {setAuth} = useContext(AuthContext)
    const [loading,setLoading] = useState(false)
    const logout =()=>{
        setLoading(true)
        setAuth('logout')
        axios.get('http://192.168.1.102:3001/logout').then((res)=>{
            console.log(res.data);
        })
    }

    return (
        <ImageBackground
            resizeMode='cover'
            style={{flex:1}}
            source={imagBack}
        >
            <SafeAreaView style={styles.container}> 
                <MenuItem style={styles.MenuItem} title='ลาพักจำหน่ายอาหาร' onPress={()=> navigation.navigate('รายการลา')} accessoryRight={ForwardIcon} />
                <MenuItem style={styles.MenuItem} title='ระดับคุณภาพความสะอาด' onPress={()=> navigation.navigate('ระดับคุณภาพความสะอาด')} accessoryRight={ForwardIcon} />
                <MenuItem style={styles.MenuItem} title='รายการการชำระค่าเช่า' onPress={()=> navigation.navigate('รายการ')} accessoryRight={ForwardIcon} />
                <MenuItem style={styles.MenuItem} title='รายการการแจ้งเตือนความผิด' onPress={()=> navigation.navigate('การแจ้งเตือนความผิด')} accessoryRight={ForwardIcon} />
                <MenuItem style={styles.MenuItem} title='บันทึกชั่วโมงทำงาน' onPress={()=> navigation.navigate('HistoryMenu')} accessoryRight={ForwardIcon} /> 
                         
            </SafeAreaView>
            <View
                    position='absolute'
                    alignItems='center'
                    bottom='1%'
                    mt={4}
                    w='100%'
                    flexDirection='column'
                >
                <Button  
                    w='90%'
                    onPress={()=> logout()}
                    isLoading={loading} 
                    isLoadingText="Loging out..."
                >
                    Log out
                </Button>  
                </View> 
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        alignItems:"flex-end",
        marginTop:10
    },
    MenuItem:{
        fontWeight:'bold',
        fontSize:21,
        marginTop:5,
        borderRadius:10,
        width:'97%',
        height:60,
        shadowColor:'#DC143C',                                 
        shadowOpacity:1,
        elevation:7,
        shadowRadius:20,
    },
    menuList:{
        width:'100%',
        height:'100%',
        
    },
    containerButton:{
        alignItems:'center',
        position:'absolute',
        right:10,
        borderWidth: 2, 
    },
    icon: {
        width: 30,
        height: 30,
        borderRadius:30/2,
      },
    text:{ 
        
        backgroundColor:'darkgreen',  
        borderRadius:10,
        color:'azure'
    },
      button:{
        backgroundColor:'#DC143C',
        borderRadius:50/2,
        shadowRadius:10,
        shadowColor:'#F02A4B',
        shadowOpacity:0.3,
        shadowOffset:{height:90}
      }
})
