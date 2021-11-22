import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView, StatusBar, TextInput } from 'react-native';

import { addAddres, removeAddres, getAddress } from "../services/accountsService"
import { NavBar } from '../components/navbar';

export const Account = (props) => {
    const [address, setAddress] = useState("")
    const [listAddress, setListAddress] = useState([])
    return (
        <SafeAreaView>
            <StatusBar />
            <TextInput value={address} onChangeText={(value)=>setAddress(value)}></TextInput>
            <Button onPress={async () => {await addAddres(address);setAddress("");setListAddress(await getAddress())}} title="Add" />
            <FlatList
                data={listAddress}
                renderItem={item => renderAddress(item, async () => { await removeAddres(item.item);  setListAddress(await getAddress()) })}
                keyExtractor={item => item} />
            <NavBar/>
        </SafeAreaView>
    )
}
const renderAddress = ({ item }, onPress) => {
    return (
        <View style={{ borderColor: "black", borderWidth: 2 }}>
            <Text>{item}</Text>
            <Button onPress={onPress} title="Delete" />
        </View>)
}