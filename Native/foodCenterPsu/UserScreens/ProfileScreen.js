import * as React from 'react';
import { Text, View } from 'react-native'
import { Icon, MenuItem } from '@ui-kitten/components';

const ForwardIcon = (props) => (
    <Icon {...props} name='arrow-ios-forward'/>
  );

const ProfileScreen =()=>{
    return(
        <View style={{display:"flex",alignItems:'center'}}>
            <Text>
                ProfileScreen
            </Text>
        </View>
    )
}

export default ProfileScreen