import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    TextInput,
    SafeAreaView
} from "react-native";
import CoinItem from "../components/coinItem";
import { NavBar } from "../components/navbar.js";

export const Home = (props) => {
    const coins=props.coins;
    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState("");

    return (
        <SafeAreaView style={{ width: "100%", height: "99%", maxWidth: 500, alignSelf: "center" }}>
            <StatusBar />
            <View style={{ width: "96%", height: "95%",marginLeft: "2%", marginRight: "2%" }}>
                <View style={styles.header}>
                    <Text style={styles.title}>Feed</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search a Coin"
                        placeholderTextColor="#858585"
                        onChangeText={(text) => text && setSearch(text)}
                    />
                </View>
                <FlatList
                    style={styles.list}
                    data={coins.filter(
                        (coin) =>
                            coin.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
                            coin.symbol.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                    )}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <CoinItem coin={item} currency={props.currency} />}
                    refreshing={refreshing}
                    onRefresh={async () => {
                        setRefreshing(true);
                        let data = await loadDataHome(props.currency);
                        setCoins(data);
                        setRefreshing(false);
                    }}
                />
            </View>
            <View style={{height:"10%"}}></View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        marginTop: 10,
    },
    list: {
        height:100,
    },
    searchInput: {
        borderBottomWidth: 1,
        width: "40%",
        textAlign: "center",
    },
})