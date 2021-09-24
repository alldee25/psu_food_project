import { Heading, Text, View, Image, ScrollView,Divider, Checkbox, TextArea, Button } from 'native-base'
import React ,{useEffect} from 'react'
import { Dimensions, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import axios from 'axios';
import { Icon, SelectItem, Select, Input } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { setDataCart } from '../src/redux/actions';

const packaging = [
    'ห่อ',
    'ใส่จาน'
];
  
export default function FoodDetialScreen({navigation,route}) {
    
    const W = Dimensions.get('window').width
    const H = Dimensions.get('window').height
    const dispatch = useDispatch()
    const [optionDataList, setOptionList] = React.useState([])
    const [selectedIndex, setSelectedIndex] = React.useState([]);
    const [selectedIndexPack, setSelectedIndexPack] = React.useState([]);
    const [option, setOption] = React.useState('');
    const [text, setText] = React.useState('');
    var [count, setCount] = React.useState(1);
    const [optionDisplay, setOptionDisplay] = React.useState('');
    const [specialOptionList, setSpecialOptionList] = React.useState([
        {id:'',optionId:'',number:0}
    ])

    const conferm =(page)=>{
        if (page == 'addToCart') {
            dispatch(setDataCart({
                food_name:route.params.food_name,
                store_name:route.params.store_name,
                food_price:route.params.food_price*count,
                selectPackage:selectPackage,
                text:text,
                option:option,
                count:count,
            }))
        } else {
            navigation.navigate('conferm',('data',{
                food_name:route.params.food_name,
                store_name:route.params.store_name,
                food_price:route.params.food_price*count,
                selectPackage:selectPackage,
                text:text,
                option:option,
                count:count,
            }))  
        }
        

    }

    const [specialOptionValue, setSpecialOptionValue] = React.useState([
        {optionId:''}
    ])

    const selectPackage = packaging[selectedIndexPack.row];
    const renderPack = (title) => (
        <SelectItem key={title} title={title}/>
      ); 

     const selectValue =(value)=> {
        const opDisply = optionDataList[value.row].name;
        setOptionDisplay(opDisply)
        const opValue = optionDataList[value.row].id;
        setOption(opValue)
    } 
    const renderOpttion = (title) => (
        <SelectItem key={title.id} title={title.name}/>
    );

    useEffect(()=>{
        axios.post('http://192.168.1.102:3001/getOptionMixByfoodid',{
            fooId:route.params.id
        }).then((res)=>{
            setOptionList(res.data) 
        })
        axios.post('http://192.168.1.102:3001/getSpecialOptionMixByfoodid',{
            fooId:route.params.id
        }).then((res)=>{
            setSpecialOptionList(res.data)
        })
    },[])

    return (
        <View
            w={W}
            h={'100%'}
            justifyContent='flex-end'
        >
            
            <View
            style={{
                alignItems:'center',
                backgroundColor:'transparent',
                zIndex:3,
                position:'absolute',
                width:'100%',               
                height:'46%',
                top:0,
                shadowOpacity:0.5,
                shadowColor:'#000',
                shadowOffset: {
                    width: 30,
                    height: 100,
                },
                borderBottomLeftRadius:40,
                borderBottomRightRadius:40,
                elevation:5                                                                                                                 
            }}
            >
                <TouchableOpacity
                onPress={()=>{ navigation.goBack()}}
                style={{
                    position:'absolute',
                    top:10,
                    left:20,
                    zIndex:5,
                    backgroundColor:'#888888',
                    borderRadius:20/2
                }}
            >
                <Icon style={styles.icon} fill='white' name='arrow-ios-back-outline' />
            </TouchableOpacity>
                <Image
                    resizeMode='cover'
                    style={{
                        
                        width:'99%',               
                        height:'100%',
                        borderBottomLeftRadius:40,
                        borderBottomRightRadius:40,
                    }}
                    alt='food_img'
                    source={{uri:`http://192.168.1.102:3001/userUploaded/${route.params.food_img}`}}
                >
                </Image>
            </View>      
            <View
                alignItems='center'
                justifyContent='flex-end'
                backgroundColor='#FFFFFF'
                height={'60%'}
            >
                
                        <View
                            h={'90%'}
                            w={'90%'}
                            
                        >
                            <ScrollView
                                h={80}
                            >
                            <View 
                            flexDirection='row'
                            w='100%'
                            justifyContent='space-between'
                            mt={3}   
                        >
                            <Heading
                                size="lg"
                            >
                                {route.params.food_name}
                            </Heading>
                            <Heading
                                size="lg"
                            >
                                {route.params.food_price} บาท
                            </Heading>
                        </View>
                        
                        {/*  <View 
                                borderWidth={1}
                                flexDirection='row'
                                w='100%'
                                justifyContent='space-between'
                                mt={3}   
                            >
                                <Heading>
                                    พิเศษ
                                </Heading>
                                <ScrollView
                                    h={70}
                                >
                                    
                                        {specialOptionList.map((data,index)=>(
                                            <View key={index}  >
                                                <Text>{specialOptionValue[0].number}</Text>
                                                <TouchableOpacity onPress={() => setSpecialOptionValue([{...specialOptionValue[data.id],optionId:data.id,number:specialOptionValue.number++}])}>
                                                    <Icon style={{with:20,height:20}} fill='green'  name='plus-outline' />
                                                </TouchableOpacity>
                                            </View>
                                        ))}         
                                </ScrollView>
                            </View> */} 
                        
                        <View
                            w='100%'                      
                            alignItems='center'
                            mt={3}   
                        >                                  
                            <Select
                                style={styles.Input}
                                placeholder='option'
                                value={optionDisplay}
                                selectedIndex={selectedIndex}
                                onSelect={index => selectValue(index)}>
                                {optionDataList.map(renderOpttion)}
                            </Select>           
                        </View>
                        <View
                            w='100%'                      
                            alignItems='center'
                            mt={2}   
                        >
                           <Select
                                style={styles.Input}
                                placeholder='บรรจุภัณฑ์'
                                value={selectPackage}
                                selectedIndex={selectedIndexPack}
                                onSelect={index => setSelectedIndexPack(index)}>
                                {packaging.map(renderPack)}
                            </Select> 
                        </View>
                        <View
                            mt={4}
                            w='100%'
                            flexDirection='column'
                        >                                          
                            <TextArea
                                onChangeText={(value)=>setText(value)}
                                placeholder="เขียนสั่งเพิ่มเติม"
                                h={10}
                                w={{
                                    base: "100%",
                                    md: "25%",
                                }}
                            />
                        </View>
                        <View 
                            flexDirection='row'
                            w='100%'
                            justifyContent='space-between'
                            alignItems='center'
                            mt={3}   
                        >
                            <Text>จำนวน</Text>                           
                            <TouchableOpacity disabled={count<=1} style={{width:50}}  onPress={() => setCount(count=count-1)}>
                                <Icon  style={{with:30,height:30}} fill='green'  name='minus-outline' />
                            </TouchableOpacity>
                            <Text>{count}</Text>
                            <TouchableOpacity  style={{width:50}} onPress={() => setCount(count=count+1)}>
                                <View>
                                    <Icon style={{with:30,height:30}} fill='green'  name='plus-outline' />
                                </View>                  
                            </TouchableOpacity>
                        </View>                                   
                        <View
                            flexDirection='row'
                            justifyContent='flex-end'
                            mt={4}
                            w='100%'
                        >
                            <Text>รวม {route.params.food_price*count} บาท</Text>
                        </View> 
                            <View
                            mt={4}
                            w='100%'
                            flexDirection='row'
                            justifyContent='space-between'
                        >
                            <Button w='49%' onPress={conferm}>สั่งซื้อ</Button> 
                            <Button w='49%'onPress={() => conferm("addToCart")}>Add to cart</Button>   
                        </View>                        
                    </ScrollView>
                </View>     
            </View>      
        </View>
    )
}
const styles = StyleSheet.create({
    Input:{
        marginTop: 10,
        width:'100%',
        height:'10%',
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
          zIndex:5
        },

})

