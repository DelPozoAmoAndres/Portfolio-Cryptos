import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { getActives, getTotal } from '../Services/balanceService';

export default function Balance(props) {
    const [actives, setActives] = useState([])
    console.log(actives)
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />
            <Text>{"balance total:" + parseFloat(getTotal(actives,props.currency)).toFixed(2)}</Text>
            <Button onPress={async () => setActives(await getActives())} title="Check" />
            <FlatList
                data={actives}
                renderItem={item=>renderItem(item,props.currency)}
                keyExtractor={item => item.name} />
        </SafeAreaView>
    );
}

const renderItem = ({ item }, currency = "USD") => {
    console.log(item)
    var index = 2
    if (currency === "EUR")
        index = 1
    return (
        <View>
            <View style={{ backgroundColor: "gray", flexDirection: "row", justifyContent: "space-between" }}>
                <Text>{item.name}</Text>
                <Text>{item.value[0]}</Text>
            </View>
            <Text>{parseFloat(item.value[index]).toFixed(2) + " "+currency}</Text>
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