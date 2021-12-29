import React, { useEffect, useContext } from "react"
import { View, StyleSheet, Image, TouchableOpacity, BackHandler } from "react-native"
import { Actions } from 'react-native-router-flux';
import { ThemeContext } from "../theme/theme-context";

const Feed = (props) =>
    <TouchableOpacity
        onPress={() => Actions.feed()}>
        {props.dark?
        <Image
            source={require("../public/hogarDark.png")}
            style={styles(props.theme).image} />
        :
        <Image
            source={require("../public/hogar.png")}
            style={styles(props.theme).image} />}

    </TouchableOpacity>

const Balance = (props) =>
    <TouchableOpacity
        onPress={() => Actions.balance()}>
        {props.dark?
        <Image
            source={require("../public/walletDark.png")}
            style={styles(props.theme).image} />
        :
        <Image
            source={require("../public/wallet.png")}
            style={styles(props.theme).image} />}

    </TouchableOpacity>

const Account = (props) =>
    <TouchableOpacity
        onPress={() => Actions.accounts()}>
        {props.dark?
        <Image
            source={require("../public/userDark.png")}
            style={{ width: 25, height: 25 }} />
        :
        <Image
            source={require("../public/user.png")}
            style={{ width: 25, height: 25 }} />}
    </TouchableOpacity>
export const NavBar1 = () => {
    const { dark, theme } = useContext(ThemeContext);
    return (
        <View style={styles(theme).container}>
            <TouchableOpacity
                onPress={() => Actions.feed()}>
                {dark?
                <Image
                    source={require("../public/hogar2Dark.png")}
                    style={styles(theme).image} />
                :
                <Image
                    source={require("../public/hogar2.png")}
                    style={styles(theme).image} />}

            </TouchableOpacity>
            <Balance dark={dark} theme={theme}/>
            <Account dark={dark} theme={theme}/>
        </View>
    )
}

export const NavBar2 = () => {
    const { dark,theme } = useContext(ThemeContext);
    return (
        <View style={styles(theme).container}>
            <Feed dark={dark} theme={theme}/>
            <TouchableOpacity
                onPress={() => Actions.balance()}>
                {dark?
                <Image
                    source={require("../public/wallet2Dark.png")}
                    style={styles(theme).image} />
                :
                <Image
                    source={require("../public/wallet2.png")}
                    style={styles(theme).image} />}

            </TouchableOpacity>
            <Account dark={dark} theme={theme}/>
        </View>
    )
}

export const NavBar3 = () => {
    const {dark, theme } = useContext(ThemeContext);
    return (
        <View style={styles(theme).container}>
            <Feed dark={dark} theme={theme}/>
            <Balance dark={dark} theme={theme}/>
            <TouchableOpacity
                onPress={() => Actions.accounts()}>
                {(dark)?
                <Image
                    source={require("../public/user2Dark.png")}
                    style={{ width: 25, height: 25 }} />
                :
                <Image
                    source={require("../public/user2.png")}
                    style={{ width: 25, height: 25 }} />}
            </TouchableOpacity>
        </View>
    )
}

const styles = (theme) => StyleSheet.create({
    container: {
        justifyContent: "space-evenly",
        flexDirection: "row",
        width: "100%",
        bottom: 0,
        position: "absolute",
        marginBottom: "2%",
        backgroundColor: theme.background
    },
    image: {
        width: 30,
        height: 30,
    },

})
