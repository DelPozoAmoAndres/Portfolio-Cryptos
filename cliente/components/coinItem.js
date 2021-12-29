import React,{useContext} from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {ThemeContext} from "../theme/theme-context"

const CoinItem = (props) => {
  let coin=props.coin
  let currency=props.currency
  const { theme} = useContext(ThemeContext);
  return(
  <View style={styles(theme).containerItem}>
    <View style={styles(theme).coinName}>
      <Image source={{ uri: coin.image }} style={styles(theme).image} />
      <View style={styles(theme).containerNames}>
        <Text style={styles(theme).text}>{coin.name}</Text>
        <Text style={styles(theme).textSymbol}>{coin.symbol}</Text>
      </View>
    </View>
    <View>
      <Text style={styles(theme).textPrice}>{(currency==="USD")?"$":"€"}{coin.current_price}</Text>
      <Text
        style={[
          styles(theme).pricePercentage,
          coin.price_change_percentage_24h > 0
            ? styles(theme).priceUp
            : styles(theme).priceDown,
        ]}
      >
        {(coin.price_change_percentage_24h)?coin.price_change_percentage_24h.toFixed(2):"-"}%
      </Text>
    </View>
  </View>)
};

const styles = (theme) =>StyleSheet.create({
  containerItem: {
    backgroundColor:theme.background,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerNames: {
    marginLeft: 10,
  },
  coinName: {
    color:theme.font,
    flexDirection: "row",
  },
  text: {
    color:theme.font
  },
  textPrice: {
    color:theme.font,
    fontWeight: "bold",
  },
  pricePercentage: {
    textAlign: "right",
  },
  priceUp: {
    color: theme.green,
  },
  priceDown: {
    color: theme.red,
  },
  textSymbol: {
    color:theme.font,
    textTransform: "uppercase",
  },
  image: {
    width: 30,
    height: 30,
  },
});

export default CoinItem;