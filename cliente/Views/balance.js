import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView, StatusBar, TextInput } from 'react-native';
import { getActives, getTotal} from '../services/balanceService';
import { NavBar } from '../components/navbar';
var i=1;
export const Balance=(props) =>{
    const [actives, setActives] = useState([])
    return (
        <SafeAreaView>
      <StatusBar />           
            <Text>{"balance total: " + parseFloat(getTotal(actives,props.currency)).toFixed(2)+" "+props.currency}</Text>
            <Button onPress={async () => setActives(await getActives())} title="Check" />
            <FlatList
                data={actives}
                renderItem={item=>renderActives(item,props.currency)}
                keyExtractor={item => item.name} />
            
            <NavBar/>
        </SafeAreaView>
    );
}

const renderActives = ({ item }, currency = "USD") => {
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