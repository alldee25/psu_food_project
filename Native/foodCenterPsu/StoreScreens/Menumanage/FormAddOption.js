import { Card,Icon,Input, Layout, Select} from '@ui-kitten/components';
import axios from 'axios';
import  React, { forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import * as Progress from 'react-native-progress';
import { Alert, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Formik } from 'formik';
import { AuthContext } from '../../App';
import { Modal, Button, CheckCircleIcon} from "native-base"

const FormAddOption = forwardRef((props,ref)=> {

    const {userData} =  useContext(AuthContext);
    const [modalVisible, setModalVisible] = React.useState(false)
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null) 
    const [option, setOption] = React.useState(''); 

    const addOption = () => {
        
        axios.post('http://192.168.1.102:3001/addOption',{
            storeId:userData.usersData[0].store_id,
            optionName:option
        }).then((res)=>{
            if (res.data.err) {
                Alert.alert(
                    res.data.err,
                    "Try Again",
                    [
                      { text: "OK", onPress: () =>  console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                  ); 
            } else {
               Alert.alert(
                res.data.message,
                "Ok",
                [
                  { text: "OK",  onPress: () => setModalStatus(false) }
                ],
                { cancelable: false }
              ); 
            }
        }).catch((error)=>{
            console.log("Api call error");
            alert("Api call error");
         })
    } 
    useImperativeHandle(
        ref,
        () => ({         
                openModale(){
                    setModalVisible(true)
                }
             
        })
    ); 
    const setModalStatus =(bool)=>{
        setModalVisible(bool)
        props.isClose()
    } 
     
    return (
            <Modal
                isOpen={modalVisible}
                onClose={setModalVisible}
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
            >
                <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>เพิ่มตัวเลือก</Modal.Header>
                <Modal.Body>
                    เช่น น้ำจิ้ม น้ำซุป ซ้อส
                    <Input
                        onChangeText={(textValue)=>{setOption(textValue)}}
                        mt={4}
                        ref={initialRef}                       
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group variant="ghost" space={2}>
                    <Button onPress={addOption} >SAVE</Button>
                    <Button
                        onPress={() => {
                            setModalStatus(false)
                        }}
                        colorScheme="secondary"
                    >
                        CLOSE
                    </Button>
                    </Button.Group>
                </Modal.Footer>
                </Modal.Content>
            </Modal>
    )
})
export default FormAddOption;
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
