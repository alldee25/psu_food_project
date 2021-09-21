import { IndexPath,Card,Icon,Input, Layout, Select, SelectGroup, SelectItem, Button, Menu, MenuItem } from '@ui-kitten/components';
import axios from 'axios';
import  React, { useContext, useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';
import { Alert, Image, TouchableOpacity, ScrollView, StyleSheet, Text, Dimensions, View, Modal } from 'react-native'
import { Formik } from 'formik';
import ImagePicker from 'react-native-image-crop-picker';
import { AuthContext } from '../../App';
import { v4 as uuidv4 } from 'uuid';
import { Divider,
    Actionsheet,
    useDisclose ,
    useToast,
  } from 'native-base';
import { addMenuValidate } from '../../Validation';

const person = (props) => (
    <Icon {...props} name='person'/>
  );

const dataType = [
  'ตามสั่ง',
  'ข้าวแกง',
  'อาหารกินเล่น',
  'ก๋วยเตี๋ยว',
  'น้ำ',
];
export default function FormAddMenu({navigation}) {

  const {userData} =  useContext(AuthContext);
  const HEIGHT = Dimensions.get('window').height
  const [selectedIndex, setSelectedIndex] = React.useState([]);
  const [optionDataList,setOptionDatalist] = useState([]);
  const [specialOptionDataList,setSpecialOptionDataList] = useState([]);
  const [process, setProcess] = React.useState(false); 
  const [multiSelectedIndex, setMultiSelectedIndex] = React.useState([]);
  const [freebiesmultiSelectedIndex, setFreebiesmultiSelectedIndex] = React.useState([]);
  const [imagePreview, setImagePreview] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const { isOpen, onOpen, onClose } = useDisclose()
  const form = new FormData();
  const toast = useToast() 

  
    const selectImage =()=> {
      ImagePicker.openPicker({
        width: 400,
        height: 300,
        cropping: true
      }).then(image => {
        setImage(image)
        setImagePreview(image.path)
      })
      .catch(error =>{
        console.log(error);
        toast.show({
          title: "Image unselected",
          status: "warning",
          description: "Please enter a valid email address",
        })
      })
      onClose()
  }
    const openCamera =()=> {
      /* ImagePicker.openCamera({
          width: 400,
          height: 400,
          cropping: true,
        }).then(images => {
          console.log(images);
        }).then(onClose) */
    }
    const addMenu = async(values) =>{ 

      let formAddmenu = {
    image:image,
    foodName:values.foodName,
    foodType:foodType,
    foodPrice:values.foodPrice

  }
      if (await addMenuValidate.isValid(formAddmenu)) {
       
      
        const id = uuidv4()
      form.append('file', {
        name: image.path,
        type: image.mime,
        uri: image.path,
      });
      
      form.append('storeId',userData.usersData[0].store_id)
      form.append('id',id)
      form.append('foodName',values.foodName)
      form.append('foodType',foodType)
      form.append('foodPrice',values.foodPrice)
        axios.post('http://192.168.1.102:3001/AddFoodMenu',form).then((res)=>{
            if (res.data.err) {
              toast.show({
                title: "Something went wrong",
                status: "error",
                description: "Please create a support ticket from the support page",
              })
            } else {
              axios.post('http://192.168.1.102:3001/addMenu_Mix',{
                id:id,
                specialOptionDisplayValues:specialOptionyValues,
                freebiesDisplayValues:freebiesValues,
                storeId:userData.usersData[0].store_id,
                foodName:values.foodName,
                foodPrice:values.foodPrice
              }).then((res)=>{
              if (res.data.err) {
                Alert.alert(
                    res.data.err,
                    "ลอกอีก",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                  );
            }
            else {
              Alert.alert(
                    res.data.message,
                    "เรียบร้อย",
                    [
                      { text: "OK", onPress: () => navigation.goBack() }
                    ],
                    { cancelable: false }
                  );
            }            
            })               
        }  
      }
    ).catch(function(error) {
      console.log(error);
        throw error;
      });  
  } else {
        toast.show({
          title: "ข้อมูลไม่ครบถ้วน",
          status: "warning",
          description: "โปรดตรวจสอบข้อมูลอีกครั้ง",
        })
      }    
  }
 
  const specialOptionDisplayValues = multiSelectedIndex.map(index => {
    const groupTitle = Object.keys(specialOptionDataList)[index.row];
    return specialOptionDataList[groupTitle].special_option_name;
   
  });
  const specialOptionyValues = multiSelectedIndex.map(index => {
    const groupTitle = Object.keys(specialOptionDataList)[index.row];
    return specialOptionDataList[groupTitle];
   
  });
  const freebiesDisplayValues = freebiesmultiSelectedIndex.map(index => {
    const groupTitle = Object.keys(optionDataList)[index.row];
    return optionDataList[groupTitle].option_name;
   
  });
  
  const freebiesValues = freebiesmultiSelectedIndex.map(index => {
    const groupTitle = Object.keys(optionDataList)[index.row];
    return optionDataList[groupTitle];
   
  });
  
  const foodType = dataType[selectedIndex.row];

  
  const renderType = (title) => (
    <SelectItem key={title} title={title}/>
  ); 
  const renderOption = (title) => (
      <SelectItem key={specialOptionDataList[title].id} title={specialOptionDataList[title].special_option_name}/>
    );
  const renderOptionfreebies = (title) => (
      <SelectItem key={optionDataList[title].id} title={optionDataList[title].option_name}/>
    );

    useEffect(()=>{
      let isMounted = true; 
        axios.post('http://192.168.1.102:3001/getOption',{
            storeId:userData.usersData[0].store_id
        }).then((res)=>{
            setOptionDatalist(res.data)
            
           
        }).then(
            axios.post('http://192.168.1.102:3001/getSpecialOption',{
                storeId:userData.usersData[0].store_id
            }).then((res)=>{
                setSpecialOptionDataList(res.data)
                       
         }))
         return () => { isMounted = false }; 
    },[])

    return (

            <View style={styles.formView} >           
                <Actionsheet isOpen={isOpen} onClose={onClose}>
                    <Actionsheet.Content >
                    <Divider borderColor="gray.300" />
                    <Actionsheet.Item
                        onPress={()=>selectImage()}
                        _text={{
                        color: "blue.500",
                        }}
                    >
                        เลือกจากแกลลอรี่
                    </Actionsheet.Item>
                    <Divider borderColor="gray.300" />
                    <Actionsheet.Item
                        onPress={()=>openCamera()}
                        _text={{
                        color: "blue.500",
                        }}
                    >
                        ถ่ายรูป
                    </Actionsheet.Item>
                    </Actionsheet.Content>
                </Actionsheet>
                <ScrollView style={{width:'100%',height:'100%'}}>                                   
                <Formik 
                    onSubmit={(values) => addMenu(values)}
                    initialValues={{foodName:'',foodPrice:''}}
                >
                {({ handleChange, handleSubmit, values }) =>(
                    <View style={{width:'100%',height:'50%',display:'flex',alignItems:'center'}}>
                        <View 
                        style={{
                            marginTop:10,
                            width:120,
                            height:100,
                            backgroundColor:'darkgrey',
                            flex:1,
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:5
                            }}>
                            <Image 
                                resizeMode='contain'
                                source={{uri:imagePreview}} style={{width:150,height:150,borderRadius:5}} 
                            />
                        </View>                                        
                        <TouchableOpacity                       
                        size='small' 
                        style={styles.buttonSignin}
                        type="file" 
                        onPress={onOpen}                                     
                    >
                        {process ? (<Progress.Circle size={30} indeterminate={true} color="white" />)
                        :
                        (<Icon fill='#8F9BB3' name='image-outline' style={styles.icon} />)}                       
                    </TouchableOpacity>
                    <Input                   
                        status='primary'
                        placeholder='ชื่อเมนู'
                        style={styles.Input}
                        value={values.foodName}
                        type="text"                                      
                        onChangeText={handleChange('foodName')}                      
                    />
                    <Select
                        style={styles.Input}
                        placeholder='ประเภทเมนู'
                        value={foodType}
                        selectedIndex={selectedIndex}
                        onSelect={index => setSelectedIndex(index)}>
                        {dataType.map(renderType)}
                    </Select>                                      
                    <Input                    
                        status='primary'
                        placeholder='ราคา'
                        style={styles.Input} 
                        value={values.foodPrice}
                        type="numeric"
                        keyboardType='numeric'
                        onChangeText={handleChange('foodPrice')}                     
                    />
                    <Layout style={styles.containerLayout} level='1'>                                     
                    <Select
                        style={styles.select}
                        multiSelect={true}
                        placeholder='ตัวเลือกเพิ่มพิเศษ'
                        value={specialOptionDisplayValues.join(', ')}
                        selectedIndex={multiSelectedIndex}
                        onSelect={index => setMultiSelectedIndex(index)}>
                         {Object.keys(specialOptionDataList).map(renderOption)}
                    </Select>
                    <Select
                        style={styles.select}
                        multiSelect={true}
                        placeholder='ตัวเลือกเพิ่มเติม'
                        value={freebiesDisplayValues.join(', ')}
                        selectedIndex={freebiesmultiSelectedIndex}
                        onSelect={index => setFreebiesmultiSelectedIndex(index)}>
                         {Object.keys(optionDataList).map(renderOptionfreebies)}
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
