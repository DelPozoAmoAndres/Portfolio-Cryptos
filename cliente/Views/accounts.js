import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView, StatusBar, TextInput } from 'react-native';

import { addAddres, removeAddres, getAddress } from "../services/storageService"
import { NavBar } from '../components/navbar';

export const Account = (props) => {
    const [address, setAddress] = useState("")
    const [listAddress, setListAddress] = useState([])
    return (
        <SafeAreaView style={{ width: "100%", height: "100%", maxWidth: 500, alignSelf: "center" }}>
            <StatusBar />
            <View style={{ height: "10%" }}>
                <Text style={{ fontSize: 20, }}>Cuentas</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignContent: "center" }}>
                    <Text style={{ fontSize: 30, }}>{"Numero de cuentas"}</Text>
                    <Text style={{ fontSize: 18}}>{+listAddress.length}</Text>
                     

                </View>
            </View>
            <View style={{ width: "100%", height: "20%" }}>
                <TextInput value={address} onChangeText={(value) => setAddress(value)}></TextInput>
                <Button onPress={async () => { await addAddres(address); setAddress(""); setListAddress(await getAddress()) }} title="Add" />
            </View>
            <View >
                <FlatList
                    data={listAddress}
                    renderItem={item => renderAddress(item, async () => { await removeAddres(item.item); setListAddress(await getAddress()) })}
                    keyExtractor={item => item} />
            </View>
            <NavBar selected="3"/>
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