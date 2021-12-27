import React from "react"
import { View, Image, TouchableHighlight } from "react-native"
import { Actions } from 'react-native-router-flux';

export const NavBar = (props) => {
    return (
        <View style={{ justifyContent: "space-evenly", flexDirection: "row", width: "100%", bottom: 0, position: "absolute", marginBottom: "2%", }}>
            <TouchableHighlight
                onPress={() => Actions.feed()}>
                {props.selected == 1 ?
                    <Image
                        source={require("../public/hogar2.png")}
                        style={{ width: 30, height: 30 }} />
                    :
                    <Image
                        source={require("../public/hogar.png")}
                        style={{ width: 30, height: 30 }} />
                }
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => Actions.balance()}>
                {props.selected == 2 ?
                    <Image
                        source={require("../public/wallet2.png")}
                        style={{ width: 30, height: 30 }} />
                    :
                    <Image
                        source={require("../public/wallet.png")}
                        style={{ width: 30, height: 30 }} />
                }
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => Actions.accounts()}>
                {props.selected == 3 ?
                    <Image
                        source={require("../public/user2.png")}
                        style={{ width: 30, height: 30 }} />
                    :
                    <Image
                        source={require("../public/user.png")}
                        style={{ width: 25, height: 25 }} />
                }
            </TouchableHighlight>
        </View>
    )
}