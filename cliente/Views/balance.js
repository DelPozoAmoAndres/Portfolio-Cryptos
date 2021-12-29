import React, { useEffect,useState,useContext } from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView, StatusBar, TextInput, Image, TextPropTypes, ScrollView, RefreshControl } from 'react-native';
import { getPorcetage, getTotal } from '../services/BalanceService';
import { callEther } from '../services/EtherService';
import { LineGraph } from '../components/LineGraph';
import ActiveItem from '../components/ActiveItem';
import { ThemeContext } from '../theme/theme-context';

export const Balance = (props) => {
    const actives = props.actives;
    const balanceHistory = props.balanceHistory;
    const [porcentage, setPorcentage] = useState(0);
    const [total, setTotal] = useState(0)
    const { theme} = useContext(ThemeContext);

    useEffect(async () => {
        var porcentage = getPorcetage(actives, balanceHistory[1])
        setPorcentage(porcentage)
        setTotal(parseFloat(getTotal(actives, props.currency)))
    }, []);
    return (
        <SafeAreaView style={styles(theme).safeAreaView}>
            <StatusBar />
            <View style={styles(theme).top}>
                <Text style={styles(theme).title}>Balance</Text>
                <View style={styles(theme).balance}>
                    <Text style={styles(theme).total}>{(props.currency === "USD" ? "$" : "€") + total.toFixed(2)}</Text>
                    {porcentage >= 0 ?
                        <View>
                            <Text style={styles(theme).porcentageUp}>{porcentage + "%"}</Text>
                            <Text style={styles(theme).diference}>{(props.currency === "USD" ? "$" : "€") + (total - getTotal(balanceHistory[1][balanceHistory[1].length - 2], props.currency)).toFixed(2)}</Text>
                        </View>
                        :
                        <View>
                            <Text style={styles(theme).porcentageDown}>{porcentage + "%"}</Text>
                            <Text style={styles(theme).diference}>{(props.currency === "USD" ? "$" : "€") + (total - getTotal(balanceHistory[1][balanceHistory[1].length - 2], props.currency)).toFixed(2)}</Text>
                        </View>
                    }

                </View>
            </View>
            <View style={styles(theme).chart}>
                <LineGraph
                    data={balanceHistory[1]}
                    currency={props.currency}

                />
            </View>
            <View>
                {/*<Button onPress={async () => await callEther("0xb35E7381FB2EbA8781707f1cAc14B7722Dbb8485")} title="Ether" />*/}
                <FlatList
                    data={actives}
                    renderItem={item => <ActiveItem item={item}  currency={props.currency}/>}
                    keyExtractor={item => item.name} />
            </View>
        </SafeAreaView>
    );

}
const styles = (theme)=> StyleSheet.create({
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
        color:theme.font,
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
    }

});