import React from "react"
import { View,Button, ActionSheetIOS } from "react-native"
import { Actions } from 'react-native-router-flux';

export const NavBar=(props)=>{
    return(
        <View style={{flexDirection:"row"}}>
            <Button
            title="feed"
            onPress={()=>Actions.feed()}/>
            <Button
            title="balance"
            onPress={()=>Actions.balance()}/>
            <Button
            title="accounts"
            onPress={()=>Actions.accounts()}/>
        </View>
    )
}