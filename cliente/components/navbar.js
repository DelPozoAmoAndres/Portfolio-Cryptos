import React, { useEffect } from "react"
import { View, Image, TouchableOpacity } from "react-native"
import { Actions } from 'react-native-router-flux';

export const NavBar = () => {
    return (
        <View style={{ justifyContent: "space-evenly", flexDirection: "row", width: "100%", bottom: 0, position: "absolute", marginBottom: "2%" }}>
            <TouchableOpacity
                onPress={() => Actions.feed()}>
                {Actions.currentScene === "_feed" ?
                    <Image
                        source={require("../public/hogar2.png")}
                        style={{ width: 30, height: 30 }} />
                    :
                    <Image
                        source={require("../public/hogar.png")}
                        style={{ width: 30, height: 30 }} />
                }
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => Actions.balance()}>
                {Actions.currentScene === "_balance" ?
                    <Image
                        source={require("../public/wallet2.png")}
                        style={{ width: 30, height: 30 }} />
                    :
                    <Image
                        source={require("../public/wallet.png")}
                        style={{ width: 30, height: 30 }} />
                }
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => Actions.accounts()}>
                {Actions.currentScene === "_accounts" ?
                    <Image
                        source={require("../public/user2.png")}
                        style={{ width: 30, height: 30 }} />
                    :
                    <Image
                        source={require("../public/user.png")}
                        style={{ width: 25, height: 25 }} />
                }
            </TouchableOpacity>
        </View>
    )
}

export const NavBar1 = () => {
    return (
        <View style={{ justifyContent: "space-evenly", flexDirection: "row", width: "100%", bottom: 0, position: "absolute", marginBottom: "2%" }}>
            <TouchableOpacity
                onPress={() => Actions.feed()}>
                <Image
                    source={require("../public/hogar2.png")}
                    style={{ width: 30, height: 30 }} />

            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => Actions.balance()}>
                <Image
                    source={require("../public/wallet.png")}
                    style={{ width: 30, height: 30 }} />

            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => Actions.accounts()}>
                <Image
                    source={require("../public/user.png")}
                    style={{ width: 25, height: 25 }} />

            </TouchableOpacity>
        </View>
    )
}

export const NavBar2 = () => {
    return (
        <View style={{ justifyContent: "space-evenly", flexDirection: "row", width: "100%", bottom: 0, position: "absolute", marginBottom: "2%" }}>
            <TouchableOpacity
                onPress={() => Actions.feed()}>
                <Image
                    source={require("../public/hogar.png")}
                    style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => Actions.balance()}>
                <Image
                    source={require("../public/wallet2.png")}
                    style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => Actions.accounts()}>
                <Image
                    source={require("../public/user.png")}
                    style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
        </View>
    )
}

export const NavBar3 = () => {
    return (
        <View style={{ justifyContent: "space-evenly", flexDirection: "row", width: "100%", bottom: 0, position: "absolute", marginBottom: "2%" }}>
            <TouchableOpacity
                onPress={() => Actions.feed()}>
                <Image
                    source={require("../public/hogar.png")}
                    style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => Actions.balance()}>
                <Image
                    source={require("../public/wallet.png")}
                    style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => Actions.accounts()}>
                <Image
                    source={require("../public/user2.png")}
                    style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
        </View>
    )
}
