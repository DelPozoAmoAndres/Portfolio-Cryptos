import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView, StatusBar, TextInput, Image, TextPropTypes, ScrollView, RefreshControl } from 'react-native';
import { getPorcetage, getTotal } from '../services/balanceService';
import { NavBar } from '../components/navbar';
import { callEther } from '../services/etherService';
import { LineGraph } from '../components/lineGraph';
export const Balance = (props) => {

    const actives = props.actives;
    const balanceHistory = props.balanceHistory;
    const [porcentage, setPorcentage] = useState(0);
    const [total, setTotal] = useState(0)

    useEffect(async () => {
        var porcentage = getPorcetage(actives, balanceHistory[1])
        setPorcentage(porcentage)
        setTotal(parseFloat(getTotal(actives, props.currency)))
        console.log(total)
        console.log(getTotal(balanceHistory[1][balanceHistory[1].length - 2]))
    }, []);
    return (
        <SafeAreaView style={{ width: "100%", height: "100%", maxWidth: 500, alignSelf: "center" }}>
            <StatusBar />
                <View style={{ height: "10%", marginLeft: "2%", marginRight: "2%" }}>
                    <Text style={{ fontSize: 20, marginTop: 10 }}>Balance</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignContent: "center" }}>
                        <Text style={{ fontSize: 30 }}>{(props.currency === "USD" ? "$" : "€") + total.toFixed(2)}</Text>
                        {porcentage >= 0 ?
                            <View>
                                <Text style={{ fontSize: 18, color: "#00B589" }}>{porcentage + "%"}</Text>
                                <Text>{(props.currency === "USD" ? "$" : "€") + (total - getTotal(balanceHistory[1][balanceHistory[1].length - 2], props.currency)).toFixed(2)}</Text>
                            </View>
                            :
                            <View>
                                <Text style={{ fontSize: 18, color: "#fc4422" }}>{porcentage + "%"}</Text>
                                <Text>{(props.currency === "USD" ? "$" : "€") + (total - getTotal(balanceHistory[1][balanceHistory[1].length - 2], props.currency)).toFixed(2)}</Text>
                            </View>
                        }

                    </View>
                </View>
                <View style={{ height: "20%", width: "96%", marginLeft: "2%", marginRight: "2%" }}>
                    <LineGraph
                        data={balanceHistory[1]}
                        currency={props.currency}

                    />
                </View>
                <View >
                    {/*<Button onPress={async () => await callEther("0xb35E7381FB2EbA8781707f1cAc14B7722Dbb8485")} title="Ether" />*/}
                    <FlatList
                        data={actives}
                        renderItem={item => renderActives(item, props.currency)}
                        keyExtractor={item => item.name} />
                    {/*<Button onPress={async () => { var history = await deleteHistory(); setBalanceHistory(history) }} title="Delete Historial" />
                <FlatList
                        data={this.state.balanceHistory[1]}
                        renderItem={item => renderHistory(item, this.state.balanceHistory)}
                        keyExtractor={item => random(100)}
                    />*/}
                </View>
        </SafeAreaView>
    );

}

const renderActives = ({ item }, currency = "USD") => {
    var index = 2
    if (currency === "EUR")
        index = 1
    var porcentage = parseFloat(item.value[3]).toFixed(2)

    return (
        <View style={{ paddingLeft: "2%", paddingRight: "2%", paddingTop: 10, }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignContent: "flex-end" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image style={{ height: 30, width: 30 }} source={{
                        uri: "https://bscscan.com" + item.value[4],
                        method: 'GET',
                        headers: {
                            "user-agent": "chrome"
                        },
                    }} />
                    <Text> </Text>
                    <Text>{item.name}</Text>
                </View>
                <View>
                    <View style={{ alignSelf: "flex-end" }}>
                        <Text >{item.value[0]}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignSelf: "flex-end", justifyContent: "space-evenly" }}>
                        <Text style={{ fontWeight: "bold", }}>{(currency === "USD" ? "$" : "€") + parseFloat(item.value[index]).toFixed(2)}</Text>
                        <Text> </Text>
                        {porcentage > 0
                            ?
                            <Text style={{ color: "#00B589" }}>{porcentage + "%"} </Text>
                            :
                            <Text style={{ color: "#fc4422" }}>{porcentage + "%"} </Text>
                        }
                    </View>
                </View>

            </View>

        </View >)
}

const renderHistory = ({ item }, balanceHistory) => {
    var date;
    for (var i = 0; i < balanceHistory[1].length; i++)
        if (balanceHistory[1][i] === item)
            var date = balanceHistory[0][i];
    return (
        <View style={{ borderColor: "gray", borderWidth: 1, paddingLeft: "2%", paddingRight: "2%" }}>
            <Text> {item.toFixed(2) + " USD"}</Text>
            <Text> {date}</Text>
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});