import React, { useEffect, useState, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    TextInput,
    SafeAreaView
} from "react-native";
import { random } from "underscore";
import CoinItem from "../components/CoinItem";
import { ThemeContext } from "../theme/theme-context";

export const Home = (props) => {
    const coins = props.coins;
    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState("");
    const { theme } = useContext(ThemeContext);

    return (
        <SafeAreaView style={styles(theme).safeAreaView}>
            <StatusBar />
            <View style={styles(theme).container}>
                <View style={styles(theme).header}>
                    <Text style={styles(theme).title}>Feed</Text>
                    <TextInput
                        style={styles(theme).searchInput}
                        placeholder="Search a Coin"
                        placeholderTextColor={theme.font}
                        onChangeText={(text) => setSearch(text)}
                    />
                </View>
                <FlatList
                    style={styles(theme).list}
                    data={coins.filter(
                        (coin) =>
                            coin.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
                            coin.symbol.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                    )}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <CoinItem coin={item} currency={props.currency} />}
                    keyExtractor={item=>item.getId()+item.getName()+random(1000)}
                    refreshing={refreshing}
                    onRefresh={async () => {
                        setRefreshing(true);
                        let data = await loadDataHome(props.currency);
                        setCoins(data);
                        setRefreshing(false);
                    }}
                />
            </View>
            <View style={{ height: "10%" }}></View>
        </SafeAreaView>
    );
};

const styles = (theme) =>
    StyleSheet.create({
        safeAreaView: {
            width: "100%",
            height: "100%",
            maxWidth: 500,
            alignSelf: "center",
            backgroundColor: theme.background
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
        },
        title: {
            color: theme.font,
            fontSize: 20,
            marginTop: 10,
        },
        container: {
            width: "96%",
            height: "94%",
            marginLeft: "2%",
            marginRight: "2%"
        },
        list: {
            height: 100,
        },
        searchInput: {
            color: theme.font,
            borderColor: theme.font,
            borderBottomWidth: 1,
            width: "40%",
            textAlign: "center",
        },
    })