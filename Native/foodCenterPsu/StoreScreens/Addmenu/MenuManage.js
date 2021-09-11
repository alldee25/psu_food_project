
import { createStackNavigator } from '@react-navigation/stack'
import { Icon, MenuItem,Layout,Tab,TabView,Button } from '@ui-kitten/components';
import axios from 'axios';
import React, {  forwardRef, useContext, useEffect, useRef, useState,useImperativeHandle } from 'react'
import { StyleSheet, SafeAreaView, Text, FlatList, Image,Animated, Dimensions,View , Modal } from 'react-native'
import { AuthContext } from '../../App';
import AddMenuButton from './ButtonAdd';

const MenuManage = ()=> {
    const [changModalVisibility,setChangModalVisibilityn] = useState()
    const [isModalVisible,setIsModalVisible] = useState(false)
    const WIDTH = Dimensions.get('window').width
    const HEIGHT = Dimensions.get('window').height
    const {userData} = useContext(AuthContext);
    const [foodDataList,setFoodDatalist] = useState([]);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [visible, setVisible] = React.useState(false);
    const ref = useRef(null)

    useEffect(()=>{
        axios.post('http://192.168.1.102:3001/getFoodMenuList',{
            store_id:userData.usersData[0].store_id
        }).then((res)=>{
            setFoodDatalist(res.data);
        })
    },[])

        const openModal =()=>{
            setVisible(!visible)
            console.log('isOpen');
        }
    
    return(
        
        <View>
        <AddMenuButton ref={openModal} />
            <Modal
                visible={visible}
                transparent={true}
                backdropStyle={styles.backdrop}
                animationType='fade'
                onBackdropPress={() => setVisible(false)}>
                <Button onPress={() => openModal()}>
                    DISMISS
                </Button>              
                <View style={{flex:1,backgroundColor:'#000000AA',justifyContent:'flex-start',color:'white'}}>
                    <View style={{backgroundColor:'white',borderBottomLeftRadius:10,borderBottomLeftRadius:10}}>
                        <Text style={{color:'#182E44',fontWeight:'500',margin:15}}>
                            Audi
                        </Text>
                    </View>
                </View>
                          
            </Modal>
            <TabView
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}>
                <Tab title='รายการอาหาร'>
                    <Layout style={styles.tabContainer}>
                        <View style={styles.menuList}>
                            <FlatList 
                                data={foodDataList}
                                keyExtractor={(item) => item.id}
                                contentContainerStyle={{
                                padding:10
                                }}
                                renderItem={({item})=>
                                <View style={{flexDirection:'row',padding:10,backgroundColor:'#48D1CC',borderRadius:5,marginBottom:5}}>
                                    <Image
                                        style={{width:120,height:120,marginLeft:5,borderRadius:10}}
                                        source={require('../../assets/img/closeup-shot-delicious-asian-soup-with-different-vegetables.jpg')}                           
                                    />
                                    <View style={{marginLeft:10}}>
                                        <Text style={{fontSize:22}}>
                                            อาหาร: {item.food_name}
                                        </Text> 
                                        <Text style={{fontSize:18}}>
                                            ประเภท: {item.food_type}
                                        </Text> 
                                        <Text style={{fontSize:18}}>
                                            ราคา: {item.food_price} บาท
                                        </Text>  
                                    </View>                         
                                </View>                                
                                }
                            />        
                        </View>
                    </Layout>
                </Tab>
                <Tab title='ORDERS'>
                    <Layout style={styles.tabContainer}>
                        <Text category='h5'>
                            ORDERS
                        </Text>
                    </Layout>
                </Tab>
                <Tab title='TRANSACTIONS'>
                    <Layout style={styles.tabContainer}>
    
                    </Layout>
                </Tab>      
            </TabView> 
        </View>
        
        
    )
}
export default MenuManage;
const styles = StyleSheet.create({
    container:{
        display:'flex',
        alignItems:"flex-start",
        marginTop:10
    },
    MenuItem:{
        marginTop:5
    },
    menuList:{
        width:'100%',
        height:'100%'
    },
      backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        elevation: 3,
        zIndex: 3 
      },
})
