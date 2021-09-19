import React, {useEffect, useState} from 'react'
import { FlatList, Heading, Menu, ScrollView, Text, View } from 'native-base'
import axios from 'axios'
import { Alert, StyleSheet, TouchableOpacity } from 'react-native'
import { Divider, List, ListItem } from '@ui-kitten/components';

export default function CleaneseLevelDetial({route}) {

    const [CleanDataListDetial,setCleanDataListDetial] = useState([])


    const renderItem = ({ item, index }) => (
        <ListItem
        style={{color:'black'}}
            key={item.title}
            title={`คะแนนที่ได้ : ${item.point} `}
            description={`ข้อ ${item.title} : ${item.topic}`}
            
        />
      );

    useEffect(() => {
        let isMounted = (
          axios.post('http://192.168.1.102:3001/getCleaneseLevelListDetial',{
            Cleaneseid:route.params.Cleaneseid
        }).then((res)=>{
            setCleanDataListDetial(res.data)        
        }).catch(error =>{
            console.log(error);
            throw error;
        })  
        )
        return function cleanup() {
            isMounted = false
          };
    },[])
    
    return (
        <View
        height={'100%'}
        >
            <List
                style={styles.containerList}
                data={CleanDataListDetial}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
            />
        </View>
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
    },
    menuList:{
        width:'100%',
        height:'99.9%'
    },
    close:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    icon: {
        width: 32,
        height: 32,
      },
      containerList: {
        maxHeight: "100%",
      },
    
})