import { Input, } from '@ui-kitten/components';
import axios from 'axios';
import  React, { forwardRef, useContext,  useImperativeHandle, useState } from 'react';
import { Alert,  StyleSheet, } from 'react-native'
import { AuthContext } from '../../App';
import { Modal, Button} from "native-base"
import { useRef } from 'react';

const Payment = forwardRef((props,ref)=> {

    const {userData} =  useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false)
    const initialRef = useRef(null)
    const finalRef = useRef(null) 
    const [paymentName, setPaymentName] = useState(''); 

    const addPaymaen = () => {
        
        axios.post('http://192.168.1.102:3001/InsertPayment',{
            storeId:userData.usersData[0].store_id,
            paymentName:paymentName
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
        })
    } 
    useImperativeHandle(
        ref,
        () => ({         
            openModalPayment(){
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
                <Modal.Header>เพิ่มช่องทางการชำระเงิน</Modal.Header>
                <Modal.Body>
                    <Input
                        onChangeText={(textValue)=>{setPaymentName(textValue)}}
                        mt={4}
                        ref={initialRef}                       
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group variant="ghost" space={2}>
                    <Button onPress={addPaymaen} >SAVE</Button>
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
export default Payment;
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
