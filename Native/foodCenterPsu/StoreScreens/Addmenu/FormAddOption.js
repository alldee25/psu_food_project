import React from 'react'
import { View } from 'react-native'
import { Button,Card,Icon,Input, Layout, Select} from '@ui-kitten/components';
import axios from 'axios';
import  React, { useContext, useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';
import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Formik } from 'formik';
import { AuthContext } from '../../App';

export default function FormAddOption() {

    const {userData} =  useContext(AuthContext);
    const [foodDataList,setFoodDatalist] = useState([]);
    const [process, setProcess] = React.useState(false); 
    const [multiSelectedIndex, setMultiSelectedIndex] = React.useState([]);
    const [freebies, setFreebies] = React.useState([]);

    return (
        <View style={styles.formView} >
                <ScrollView style={{width:'100%',height:'100%'}}>                                   
                <Formik 
                    onSubmit={(values) => signup(values)}
                    initialValues={{foodName:'',foodType:'',foodPrice:'',password:''}}
                >
                {({ handleChange, handleSubmit, values }) =>(
                    <View style={{width:'100%',height:'100%',display:'flex',alignItems:'center'}}>
                <Input                    
                        status='primary'
                        placeholder='ชื่อเมนู'
                        style={styles.Input}
                        accessoryLeft={person}
                        value={values.foodName}
                        type="text"                                      
                        onChangeText={handleChange('name')}                      
                    />                   
                    <Input                    
                        status='primary'
                        placeholder='ประเภทเมนู'
                        style={styles.Input}
                        accessoryLeft={person}
                        value={values.foodType}
                        type="text"
                        onChangeText={handleChange('food_type')}                      
                    />
                    <Input                    
                        status='primary'
                        placeholder='ราคา'
                        style={styles.Input}
                        accessoryLeft={person} 
                        value={values.foodPrice}
                        type="text"
                        onChangeText={handleChange('price')}                     
                    />                 
                    <Button                       
                        size='small' 
                        style={styles.buttonSignin}
                        type="submit" 
                        onPress={handleSubmit}                    
                        
                    >
                        {process ? (<Progress.Circle size={30} indeterminate={true} color="white" />)
                        :
                        (<Text>เพิ่ม</Text>)}                       
                    </Button>                        
                    </View>

                )}
                    </Formik>                                                                       
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
        display:'flex',
        alignItems:'center',
        backgroundColor:'white',
        width:'100%',
        height:'100%',
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
         
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
        height: 192,
      },

})
