import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { callBsc } from './Services/bscService';
import { getPrices } from './Services/coinGeckoService';

export default function App() {
  const [actives, setActives] = useState([])
  console.log(actives)
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button onPress={async () => setActives(await getActives())} />
      <FlatList
        data={actives}
        renderItem={renderItem}
        keyExtractor={item => item.name} />
    </View>
  );
}

const address = ["0xb35E7381FB2EbA8781707f1cAc14B7722Dbb8485"]

const getActives = async () => {
  var list=[]
  var balances = new Map()
  var tokens = await getTokens()
  var price=await getPrices(tokens)
  for (var a in address) {
    var balance = await callBsc(address[a])
    for (var j in balance) {
      var name = balance[j].name;
      var value = balance[j].balance;
      if (balances.has(name))
        balances.set(name, [parseFloat(balances.get(name)) + parseFloat(value), (parseFloat(balances.get(name)) + parseFloat(value))*parseFloat(price.get(name)[0]), (parseFloat(balances.get(name)) + parseFloat(value))*parseFloar(price.get(name)[1])])
      else
        balances.set(name, [value, parseFloat(value)*parseFloat(price.get(name)[0]), parseFloat(value)*parseFloat(price.get(name)[1])])
    }
  }
  list=Array.from(balances, ([name, value]) => ({ name, value }));
  console.log(list)
  return list;
}

const getTokens = async () => {
  var tokens = []
  for (var i in address) {
    var balance = await callBsc(address[i])
    for (var j in balance) {
      if (!tokens.includes(balance[j].name))
        tokens.push(balance[j].name)
    }
  }
  console.log(tokens)
  return tokens
}

const renderItem = ({ item }) => {
  console.log(item)
  return (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.value[0]}</Text>
      <Text>{item.value[1]+" EUR"}</Text>
      <Text>{item.value[2]+" USD"}</Text>
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
