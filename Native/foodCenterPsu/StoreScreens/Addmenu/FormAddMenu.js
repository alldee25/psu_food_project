import { IndexPath,Button,Card,Icon,Input, Layout, Select, SelectGroup, SelectItem } from '@ui-kitten/components';
import axios from 'axios';
import  React, { useContext, useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';
import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Formik } from 'formik';
import { AuthContext } from '../../App';

const person = (props) => (
    <Icon {...props} name='person'/>
  );


export default function FormAddMenu() {
    
  const {userData} =  useContext(AuthContext);
  const [foodDataList,setFoodDatalist] = useState([]);
  const [process, setProcess] = React.useState(false); 
  const [multiSelectedIndex, setMultiSelectedIndex] = React.useState([]);
  const [freebies, setFreebies] = React.useState([]);

  const groupDisplayValues = multiSelectedIndex.map(index => {
    const groupTitle = Object.keys(foodDataList)[index.row];
    return foodDataList[groupTitle].food_name;
   
  });
  const freebiesDisplayValues = freebies.map(index => {
    const groupTitle = Object.keys(foodDataList)[index.row];
    return foodDataList[groupTitle].food_name;
   
  });

    useEffect(()=>{
        axios.post('http://192.168.1.102:3001/getFoodMenuList',{
            store_id:userData.usersData[0].store_id
        }).then((res)=>{
            setFoodDatalist(res.data);
            console.log(res.data);
        })
    },[])
  
    const signup = (values) =>{ 
            groupDisplayValues.forEach(element => {
               console.log(element.food_name); 
            });
    }

    const renderOption = (title) => (
        <SelectItem title={title}/>
      );
    const renderOptionfreebies = (title) => (
        <SelectItem title={title}/>
      );

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
                    <Layout style={styles.containerLayout} level='1'>                                     
                    <Select
                        style={styles.select}
                        multiSelect={true}
                        placeholder='ตัวเลือกเพิ่มพิเศษ'
                        value={groupDisplayValues.join(', ')}
                        selectedIndex={multiSelectedIndex}
                        onSelect={index => setMultiSelectedIndex(index)}>
                         {Object.keys(foodDataList).map(renderOption)}
                    </Select>
                    <Select
                        style={styles.select}
                        multiSelect={true}
                        placeholder='ตัวเลือกเพิ่มเติม'
                        value={freebiesDisplayValues.join(', ')}
                        selectedIndex={freebies}
                        onSelect={index => setFreebies(index)}>
                         {Object.keys(foodDataList).map(renderOptionfreebies)}
                    </Select>
                    </Layout>
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
        position:'absolute',
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
