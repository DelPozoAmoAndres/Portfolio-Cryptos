import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView, StatusBar, TextInput } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { set } from 'react-native-reanimated';
import { saveAccountDB } from '../DB/DB_Accounts';
import { addAddres, removeAddres, getAddress, changeDarkMode, getXpubs, addXpubs, removeXpubs } from "../services/StorageService"
import { ThemeContext } from '../theme/theme-context';
import ManualAccount from '../Model/accounts/ManualAccount';

export const Profile = (props) => {
    var manager=props.manager;
    const [address, setAddress] = useState("")
    const [xpub, setXpub] = useState("")
    const [listAddress, setListAddress] = useState([])
    const [listXpbus, setListXpub] = useState([])
    const [name,setName]=useState("")

    useEffect(async () => {
        setListAddress(manager.getListAccounts())
    }, []);

    const { dark, theme, toggle } = useContext(ThemeContext);

    return (
        <SafeAreaView style={styles(theme).safeAreaView}>
            <StatusBar />
            <View style={styles(theme).container}>
                <View style={styles(theme).top}>
                    <Text style={styles(theme).title}>Cuentas</Text>
                </View>
                <Text style={styles(theme).text}>Nombre de la wallet</Text>
                <TextInput style={styles(theme).input} value={name} onChangeText={(value) => setName(value)}></TextInput>
                <Text style={styles(theme).text}>Address (BSC/ERC20/RONIN)</Text>
                <View style={styles(theme).add}>
                    <TextInput style={styles(theme).input} value={address} onChangeText={(value) => setAddress(value)}></TextInput>
                    <Button onPress={async () => { await manager.addAccount(await ManualAccount.init(name,address,manager.getGestorCrypto())); setAddress("");setName("");setListAddress(await manager.getListAccounts()) }} title="+" />
                </View>
                <Text style={styles(theme).text}>XPUB/YPUB/ZPUB (BTC)</Text>
                <View style={styles(theme).add}>
                    <TextInput style={styles(theme).input} value={xpub} onChangeText={(value) => setXpub(value)}></TextInput>
                    <Button onPress={async () => {/* await addXpubs(name,xpub); setXpub(""); setName("");setListXpub(await getXpubs()) */}} title="+" />
                </View>
                <View style={styles(theme).list}>
                    <FlatList
                        data={listAddress}
                        renderItem={item => renderItem(item, theme, async () => {await manager.removeAccount(item.item.getAddress()); setListAddress(await manager.getListAccounts())})}
                        keyExtractor={item => item.name} />
                </View>
                <View style={styles(theme).switch}>
                    <Text style={styles(theme).text}>DarkMode</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#ccc" }}
                        thumbColor={dark ? "#fff" : "#f4f3f4"}
                        onChange={toggle} value={dark} />
                </View>
            </View>

        </SafeAreaView>
    )
}
const renderItem = ({ item }, theme, onPress) => {
    return (
        <View style={styles(theme).containerItem}>
            <Text style={styles(theme).text}>{item.name}</Text>
            <Button onPress={onPress} title="X" />
        </View>)

}

const styles = (theme) => StyleSheet.create({
    safeAreaView: {
        width: "100%",
        height: "100%",
        maxWidth: 500,
        alignSelf: "center",
        backgroundColor: theme.background
    },
    container: {
        marginLeft: "2%",
        marginRight: "2%",
    },
    top: {
        alignContent: "center",

    },
    add: {
        flexDirection: "row",
        marginBottom: "5%",
        justifyContent: "space-between",
    },
    list: {
    },
    title: {
        color: theme.font,
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10
    },
    input: {
        color: theme.font,
        borderColor: theme.font,
        borderBottomWidth: 1,
        textAlign: "center",
        width: "90%"
    },
    containerItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        marginBottom: "5%"
    },
    text: {
        color: theme.font,
        width: "90%"
    },
    switch: {
        flexDirection: "row",
        textAlign: "center",
        textAlignVertical: "center",
        alignItems: "center",
        justifyContent: "space-between",
    }
})