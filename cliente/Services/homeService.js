import {getCoins} from "./CoinGeckoService"

export const loadDataHome = async (currency) => {
    return await getCoins(currency);
  };