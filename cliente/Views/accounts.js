import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView, StatusBar, TextInput } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { set } from 'react-native-reanimated';
import { addAddres, removeAddres, getAddress, changeDarkMode, getXpubs, addXpubs, removeXpubs } from "../services/StorageService"
import { ThemeContext } from '../theme/theme-context';

export const Account = (props) => {
    const [address, setAddress] = useState("")
    const [xpub, setXpub] = useState("")
    const [listAddress, setListAddress] = useState([])
    const [listXpbus, setListXpub] = useState([])

    useEffect(async () => {
        setListAddress(await getAddress())
        setListXpub(await getXpubs())
    }, []);

    const { dark, theme, toggle } = useContext(ThemeContext);

    return (
        <SafeAreaView style={styles(theme).safeAreaView}>
            <StatusBar />
            <View style={styles(theme).container}>
                <View style={styles(theme).top}>
                    <Text style={styles(theme).title}>Cuentas</Text>
                </View>
                <Text style={styles(theme).text}>Address (BSC/ERC20/RONIN)</Text>
                <View style={styles(theme).add}>
                    <TextInput style={styles(theme).input} value={address} onChangeText={(value) => setAddress(value)}></TextInput>
                    <Button onPress={async () => { await addAddres(address); setAddress(""); setListAddress(await getAddress()) }} title="+" />
                </View>
                <Text style={styles(theme).text}>XPUB/YPUB/ZPUB (BTC)</Text>
                <View style={styles(theme).add}>
                    <TextInput style={styles(theme).input} value={xpub} onChangeText={(value) => setXpub(value)}></TextInput>
                    <Button onPress={async () => { await addXpubs(xpub); setXpub(""); setListXpub(await getXpubs()) }} title="+" />
                </View>
                <View style={styles(theme).list}>
                    <FlatList
                        data={listAddress}
                        renderItem={item => renderItem(item, theme, async () => { await removeAddres(item.item); setListAddress(await getAddress()) })}
                        keyExtractor={item => item} />
                </View>
                <View style={styles(theme).list}>
                    <FlatList
                        data={listXpbus}
                        renderItem={item => renderItem(item, theme, async () => { await removeXpubs(item.item); setListXpub(await getXpubs()) })}
                        keyExtractor={item => item} />
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
            <Text style={styles(theme).text}>{item}</Text>
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
        color: theme.font
    },
    switch: {
        flexDirection: "row",
        textAlign: "center",
        textAlignVertical: "center",
        alignItems: "center",
        justifyContent: "space-between",
    }
})