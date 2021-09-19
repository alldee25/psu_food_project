import { Datepicker, Icon, Input, IndexPath, SelectItem, Select } from '@ui-kitten/components'
import * as Progress from 'react-native-progress';
import { Formik } from 'formik'
import { Button, ScrollView, Text, View, } from 'native-base'
import React, { useContext, useState } from 'react'
import { Alert, StyleSheet, TouchableOpacity } from 'react-native'
import axios from 'axios';
import { AuthContext } from '../App';
import Moment from 'moment';

const data = [
    'ลาป่วย',
    'ลากิจส่วนตัว',
  ];

export default function LeaveScreen({navigation}) {
    Moment.locale('en')
    const [process, setProcess] = useState(false);
    const {userData} = useContext(AuthContext)
    const [from,setFrom] = useState(new Date()) 
    const [to,setTo] = useState('')
    const [toMin,setToMin] = useState('')
    const [toMax,setToMax] = useState('')
    const [detial,setDetial] = useState('')
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    const now = new Date();
    const fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() +4);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    

    const setDate =(value)=>{
    setFrom(value)
    const toDate = new Date(value.getFullYear(), value.getMonth(), value.getDate() +1);
    setToMin(toDate)
    setTo(toDate)
    const toDateMax = new Date(value.getFullYear(), value.getMonth(), value.getDate() +8);
    setToMax(toDateMax)
    }
    const setDateTo =(value)=>{
        setTo(value)
        }
    const addLeave =()=>{

        axios.post('http://192.168.1.102:3001/InsertLeave',{
            ownerId:userData.usersData[0].id,
            title:displayValue,
            detial:detial,
            dateFrom:Moment(from).format('YYYY-MM-DD'),
            dateTo:Moment(to).format('YYYY-MM-DD'),
            dateWrite:Moment(today).format('YYYY-MM-DD'),
            status:'รอดำเนินการ'
        }).then(res=>{
            if (res.data.err) {
              Alert.alert(
                res.data.err 
            )  
            } else {
                Alert.alert(
                    res.data.message 
                ) 
                navigation.goBack()  
            }
        })
    }
    const displayValue = data[selectedIndex.row];

    const renderOption = (title) => (
        <SelectItem key={title} title={title}/>
    );

    return (
        <View style={styles.formView} >           
        <ScrollView style={{width:'100%',height:'100%'}}>                                       
            <View style={{width:'100%',height:'50%',display:'flex',alignItems:'center'}}>
            <Select
                style={styles.Input}
                placeholder='หัวข้อการลา'
                value={displayValue}
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}>
                {data.map(renderOption)}
            </Select>
            <Input
            status='primary'
            placeholder='เนื่องจาก'
            style={styles.Input}
            value={detial}
            type="text"
            onChangeText={value=>setDetial(value)}   
            />                                               
            <Datepicker
                style={styles.Input}
                format={{format:'DD/MM/YYYY' }}
                label='ตั้งแต่วันที่'
                caption='Caption'
                placeholder='Pick Date'
                min={fromDate}
                onSelect={nextDate => setDate(nextDate)}
                date={from}
                accessoryRight={<Icon fill='#DADADA' name='calendar' style={styles.icon} />}
            />        
            <Datepicker
                style={styles.Input}
                label='ถึงวันที่'
                caption='Caption'
                placeholder='Pick Date'
                min={toMin}
                max={toMax}
                date={to}
                onSelect={nextDate => setDateTo(nextDate)}
                accessoryRight={<Icon fill='#DADADA' name='calendar' style={styles.icon} />}
            />        
            <Button                       
               style={styles.Input}
               onPress={addLeave}                                  
            >
                {process ? (<Progress.Circle size={30} indeterminate={true} color="white" />)
                :
                (<Text>เพิ่ม</Text>)}                       
            </Button>                        
            </View>                                                                      
        </ScrollView>
    </View>
    )
}
const styles = StyleSheet.create({
    Input:{
        marginTop: 30,
        width:'80%',
        borderRadius:15
    },
    formView:{
        position:'absolute',
        display:'flex',
        alignItems:'center',
        backgroundColor:'white',
        width:'100%',
        height:'100%'
         
    },
    buttonSignin:{
        marginTop: 30,
        width:'50%',
        borderRadius:20, 
      },
      select: {
        flex: 1,
        marginTop:30,
      },
      containerLayout: {
        width:'80%',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 140,
      },
      backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        elevation: 3,
        zIndex: 3 
        },
        close:{
            flex:1,
            alignItems:'center',
            justifyContent:'center',
        },
        icon: { 
          flex:1,
          alignSelf:'center',
          width: 32,
          height: 32,
        },

})
