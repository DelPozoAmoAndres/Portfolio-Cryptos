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
import { loadDataHome } from "../services/homeService.js";
import CoinItem from "../components/coinItem";
import { NavBar } from "../components/navbar.js";
import { ScrollView } from "react-native-gesture-handler";

export const Home = (props) => {
    const [coins, setCoins] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(async () => {
        let data = await loadDataHome(props.currency)
        setCoins(data);
    }, []);

    return (
        <SafeAreaView style={{ width: "100%", height: "100%", maxWidth: 500, alignSelf: "center" }}>
            <StatusBar />
            <View style={{ width: "100%", height: "95%" }}>
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
            <NavBar selected="1" />
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
        height: 1,
    },
    searchInput: {
        borderBottomWidth: 1,
        width: "40%",
        textAlign: "center",
    },
})