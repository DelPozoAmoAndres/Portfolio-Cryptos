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

export const Preloading = (props) => {
    const { theme } = useContext(ThemeContext);

    return (
        <SafeAreaView style={styles(theme).safeAreaView}>
            <StatusBar />
            <View style={styles(theme).container}>
                <Text>Loading ... </Text>
            </View>
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
        container: {
            width: "96%",
            height: "100%",
            marginLeft: "2%",
            marginRight: "2%",
            alignItems:"center",
            justifyContent:"center",
        }
    })