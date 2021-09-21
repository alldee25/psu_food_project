import { Heading, Text, View } from 'native-base'
import React from 'react'

export default function FoodDetialScreen({route}) {
    
    return (
        <View>
            <Heading>
                Food Detial
            </Heading>
            <Text>
                {route.params.id}
            </Text>
        </View>
    )
}
