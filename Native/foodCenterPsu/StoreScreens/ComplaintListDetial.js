import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button, Card, Layout } from '@ui-kitten/components';
import { View } from 'native-base';



export default function ComplaintListDetial({route},props) {

const Header = () => (
  <View ml={5} h={10} mt={5} {...props}>
    <Text style={{height:50,fontSize:18}}>ใบแจ้งเตือนความผิดครั้งที่ : {route.params.complaint_number}</Text>
  </View>
);

const Footer = () => (
  <View mt={5} ml={5} h={50} {...props} style={styles.footerContainer}>
    <Text style={{height:50,fontSize:18}}>ความคิดเห็นผู้ควบคุมกำกับดูแล : {route.params.attendant_comment}</Text>
  </View>
);
    return (
        <View w='100%' h='100%' backgroundColor='#F8F1FF'>
           <Card style={styles.card} header={Header} footer={Footer}>
                <View width={'100%'} ml={2}>
                  <Text style={{height:60,fontSize:18}}>
                   เมื่อวันที่ : {route.params.date}
                </Text>
                <Text style={{height:60,fontSize:18,marginTop:2}}>
                   พบว่า นาย/นางสาว : {route.params.name} {route.params.lastname}
                </Text>
                <Text style={{height:60,fontSize:18,marginTop:2}}>
                    ได้กระทำผิด : {route.params.topic_detial}
                </Text>
                <Text style={{height:60,fontSize:18,marginTop:2}}>
                    โดยให้ดำเนินการดังนี้ : {route.params.action}
                </Text>  
                </View>
                
            </Card> 
        </View>
            
        
    )
}
const styles = StyleSheet.create({
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    card: {
      flex: 1,
      margin: 2,
      borderTopLeftRadius:30,
      borderTopRightRadius:30,
      marginTop:40,
       
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    footerControl: {
        marginHorizontal: 4,
    },
  });
