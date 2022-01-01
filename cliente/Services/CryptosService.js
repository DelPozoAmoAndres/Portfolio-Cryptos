import { getBscCoins, getRoninCoins, getRoninPrices } from "./calls/ApisService"
import Crypto from "../Model/entities/Crypto";

export const getCryptosService = async () => {
  var list = [];
  var cryptos = await loadDataBsc();
  var count = 0;
  for (var c in cryptos) {
    if (count === 100) {
      const roninList =await loadDataRonin()
        list = [...list,...roninList]
    }
    count++;
    const crypto = cryptos[c];
    list.push(new Crypto(crypto.id, crypto.name, crypto.symbol, crypto.current_price, crypto.market_cap, crypto.image, crypto.market_cap_rank, crypto.price_change_percentage_24h))
  }
  return list;
}

export const loadDataBsc = async (currency = "USD") => {
  return await getBscCoins(currency);
};

export const loadDataRonin = async (currency = "USD") => {
  var cryptos = []
  const prices = await getRoninPrices()
  const coins = await getRoninCoins()
  for (var c in coins) {
    for (var p in prices) {
      if (coins[c].symbol.toLowerCase() === p || coins[c].symbol.toLowerCase() === "w" + p) {
        if (currency == "USD")
          coins[c].price = prices[p].usd
        else
          coins[c].price = prices[p].eur
        cryptos.push(coins[c])
      }
    }
  }
  var list = []
  for (var c in cryptos) {
    const crypto = cryptos[c];
    var image = "";
    if (crypto.symbol === "WETH")
      image = "https://assets.axieinfinity.com/explorer/images/contract-icon/eth.png";
    if (crypto.symbol === "SLP")
      image = "https://katana.roninchain.com/static/media/slp.a3a5526b.svg"
    if (crypto.symbol === "RON")
      image = "https://katana.roninchain.com/static/media/ron-logo.401896d7.svg"
    if (crypto.symbol === "USDC")
      image = "https://katana.roninchain.com/static/media/usdc.7eaf74af.svg"
    list.push(new Crypto("", crypto.name, crypto.symbol.toLowerCase(), crypto.price, "", image, "", ""))
  }
  return list;
}