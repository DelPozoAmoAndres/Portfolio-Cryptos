import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView, StatusBar, TextInput, Image, TextPropTypes } from 'react-native';
import { getActives, addHistory, getPorcetage, getTotal, getPorcentageActive, deleteHistory } from '../services/balanceService';
import { NavBar } from '../components/navbar';
import { callEther } from '../services/etherService';
import { LineGraph } from '../components/lineGraph';
export const Balance = (props) => {
    const [actives, setActives] = useState([])
    const [balanceHistory, setBalanceHistory] = useState([])
    const [dayHistory, setDayHistory] = useState([])
    const porcentage = getPorcetage(actives)
    return (
        <SafeAreaView style={{ width: "100%", height: "100%", maxWidth: 500, alignSelf: "center" }}>
            <StatusBar />
            <View style={{ height: "10%", marginLeft: "2%", marginRight: "2%" }}>
                <Text style={{ fontSize: 20, }}>Balance</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignContent: "center" }}>
                    <Text style={{ fontSize: 30 }}>{parseFloat(getTotal(actives, props.currency)).toFixed(2) + " " + props.currency}</Text>
                    {porcentage >= 0 ?
                        <Text style={{ fontSize: 18, color: "green" }}>{porcentage + "%"}</Text>
                        :
                        <Text style={{ fontSize: 18, color: "red" }}>{porcentage + "%"}</Text>
                    }

                </View>
            </View>
            <View style={{ height: "20%" }}>
                <LineGraph
                    height={"100%"}
                    width={"100%"}
                    data={balanceHistory}
                    currency={props.currency}

                />
            </View>
            <View >
                <Button onPress={async () => { var actives = await getActives(); setActives(actives); var history = await addHistory(actives); setDayHistory(history[0]); setBalanceHistory(history[1]) }} title="Check" />
                <Button onPress={async () => await callEther("0xb35E7381FB2EbA8781707f1cAc14B7722Dbb8485")} title="Ether" />
                <Button onPress={async () => { var history = await deleteHistory(); setDayHistory(history[0]); setBalanceHistory(history[1]) }} title="Delete Historial" />
                <FlatList
                    data={actives}
                    renderItem={item => renderActives(item, props.currency, balanceHistory)}
                    keyExtractor={item => item.name} />
            </View>
            <NavBar selected="2" />
        </SafeAreaView>
    );
}

const renderActives = ({ item }, currency = "USD", history) => {
    var index = 2
    if (currency === "EUR")
        index = 1
    var porcentage = parseFloat(item.value[3]).toFixed(2)
    return (
        <View style={{ borderColor: "gray", borderWidth: 1, paddingLeft: "2%", paddingRight: "2%" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignContent: "flex-end" }}>
                <View style={{ flexDirection: "row" }}>
                    <Image style={{ height8: 40, width: 40 }} source={{
                        uri: "https://bscscan.com" + item.value[4],
                        method: 'POST',
                        headers: {
                            Pragma: 'no-cache'
                        },
                        body: 'Your Body goes here'
                    }} />
                    <Text> </Text>
                    <Text style={{ fontSize: 30 }}>{item.name}</Text>
                </View>
                <View>
                    <View style={{ alignSelf: "flex-end" }}>
                        <Text style={{ fontSize: 18 }} >{item.value[0]}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignSelf: "flex-end", justifyContent: "space-evenly" }}>
                        <Text>{parseFloat(item.value[index]).toFixed(2) + " " + currency}</Text>
                        <Text> </Text>
                        {porcentage > 0
                            ?
                            <Text style={{ color: "green" }}>{porcentage + "%"} </Text>
                            :
                            <Text style={{ color: "red" }}>{porcentage + "%"} </Text>
                        }
                    </View>
                </View>

            </View>

        </View >)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});