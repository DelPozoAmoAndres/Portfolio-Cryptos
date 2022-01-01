import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView, StatusBar, TextInput, Image, TextPropTypes, ScrollView, RefreshControl } from 'react-native';
import { getActives, getBalanceHistory, getPorcetage, getTotal } from '../services/BalanceService';
import { callEther } from '../services/calls/EtherService';
import { LineGraph } from '../components/LineGraph';
import ActiveItem from '../components/ActiveItem';
import { ThemeContext } from '../theme/theme-context';
import Account from '../Model/accounts/Account';
import { random } from 'underscore';
export const Actives = (props) => {
    var manager = props.manager;
    const [balance, setBalance] = useState([])
    const [accounts, setAccounts] = useState([])
    const [balanceHistory, setBalanceHistory] = useState([])

    const [porcentage, setPorcentage] = useState(0);
    const [selected, setSelected] = useState(new Account())
    const [total, setTotal] = useState(0)
    const { theme } = useContext(ThemeContext);
    useEffect(async () => {
        var balance, accounts, history;
        accounts = manager.getListAccounts();
        setAccounts(accounts)
        balance = manager.getBalance(accounts)
        setBalance(balance)
        await manager.addHistory()
        history=await manager.getHistories(accounts)
        setBalanceHistory(history)
        console.log(history)
        

        //var porcentage = getPorcetage(balance, balanceHistory[1])
        //setPorcentage(porcentage)
        setTotal(getTotal(balance))
    }, []);

    return (
        <SafeAreaView style={styles(theme).safeAreaView}>
            <StatusBar />
            <View style={styles(theme).top}>
                <Text style={styles(theme).title}>Balance</Text>
                <View style={styles(theme).balance}>
                    <Text style={styles(theme).total}>{(props.currency === "USD" ? "$" : "€") + total.toFixed(2)}</Text>

                    <View>
                        <Text style={ porcentage >= 0 ? styles(theme).porcentageUp: styles(theme).porcentageDown}>{porcentage + "%"}</Text>
                        <Text style={styles(theme).diference}>{(props.currency === "USD" ? "$" : "€") + (total - getTotal(balanceHistory)).toFixed(2)}</Text>
                    </View>

                </View>
            </View>
            <View style={styles(theme).chart}>
                <LineGraph
                    data={[]}
                    currency={props.currency}
                />
            </View>
            <View style={styles(theme).tabs}>
                <Text>All</Text>
                <FlatList
                    data={accounts}
                    renderItem={item => <Text>{item.item.getName()}</Text>}
                    keyExtractor={item => item.name} />
            </View>
            <View>
                <FlatList
                    data={balance}
                    renderItem={item => <ActiveItem item={item} currency={props.currency} />}
                    keyExtractor={item => item.getCrypto().getName()} />
            </View>
        </SafeAreaView>
    );

}
const styles = (theme) => StyleSheet.create({
    safeAreaView: {
        width: "100%",
        height: "100%",
        maxWidth: 500,
        alignSelf: "center",
        backgroundColor: theme.background
    },
    top: {
        height: "10%",
        marginLeft: "2%",
        marginRight: "2%"
    },
    title: {
        color: theme.font,
        fontSize: 20,
        marginTop: 10,
    },
    balance: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        color: theme.font
    },
    total: {
        fontSize: 30,
        color: theme.font
    },
    porcentageUp: {
        fontSize: 18,
        color: theme.green
    },
    porcentageDown: {
        fontSize: 18,
        color: theme.red
    },
    diference: {
        color: theme.font
    },
    chart: {
        height: "20%",
        width: "96%",
        marginLeft: "2%",
        marginRight: "2%"
    },
    tabs: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

});