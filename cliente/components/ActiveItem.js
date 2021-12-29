import React,{ useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ThemeContext } from "../theme/theme-context";


const ActiveItem = (props) => {
    console.log(props)
    const item= props.item.item
    const currency=(props.currency)?props.currency:"USD"
    const {theme} = useContext(ThemeContext);
    var index = 2
    if (currency === "EUR")
        index = 1
    var porcentage = parseFloat(item.value[3]).toFixed(2)
    return (
        <View style={styles(theme).container}>
            <View style={styles(theme).containerName}>
                <Image style={styles(theme).image} source={{
                    uri: "https://bscscan.com" + item.value[4],
                    method: 'GET',
                    headers: {
                        "user-agent": "chrome"
                    },
                }} />
                <Text> </Text>
                <Text style={styles(theme).name}>{item.name}</Text>
            </View>
            <View>
                <View style={styles(theme).containerAmount}>
                    <Text style={styles(theme).amount}>{item.value[0]}</Text>
                </View>
                <View style={styles(theme).containerPorcentage}>
                    <Text style={styles(theme).value}>{(currency === "USD" ? "$" : "€") + parseFloat(item.value[index]).toFixed(2)}</Text>
                    <Text> </Text>
                    {porcentage > 0
                        ?
                        <Text style={styles(theme).porcentageUp}>{porcentage + "%"} </Text>
                        :
                        <Text style={styles(theme).porcentageDown}>{porcentage + "%"} </Text>
                    }
                </View>
            </View>

        </View >)
}

const styles = (theme)=>StyleSheet.create({
    container: {
        paddingLeft: "2%",
        paddingRight: "2%",
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "flex-end"
    },
    containerName: {
        flexDirection: "row",
        alignItems: "center"
    },
    containerAmount: {
        alignSelf: "flex-end"
    },
    containerPorcentage: {
        flexDirection: "row",
        alignSelf: "flex-end",
        justifyContent: "space-evenly"
    },
    name:{
        color:theme.font
    },
    amount:{
        color:theme.font
    },
    value:{
        fontWeight: "bold",
        color:theme.font
    },
    porcentageUp:{
        color:theme.green
    },
    porcentageDown:{
        color:theme.red
    },
    image: {
        width: 30,
        height: 30,
      },

});

export default ActiveItem