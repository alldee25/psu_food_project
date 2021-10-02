import { View } from 'native-base'
import React from 'react'
import { Dimensions } from 'react-native'

function Profile() {
    const H = Dimensions.get('window').height
    return (
        <View
            h={H}
        >
            <Toggle
                style={{marginTop:5,width:300}} 
                status='success' 
                checked={storeStatus == true } 
                onChange={()=>{onCheckedChange()}}              
            >
                <View
                    flexDirection='row'
                >
                    <Text fontFamily='IBMPlexSansThai-Bold'>ร้าน : </Text>
                        <View width={10} justifyContent='center' >
                            {storeStatus == true ? <Text fontFamily='IBMPlexSansThai-Bold'>เปิด </Text> 
                            : 
                            <Text fontFamily='IBMPlexSansThai-Bold'>
                                ปิด
                            </Text>}
                        </View>
                </View>
                    </Toggle>
        </View>
    )
}

export default Profile
