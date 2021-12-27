import {getCoins} from "./coinGeckoService"

export const loadDataHome = async (currency) => {
    return await getCoins(currency);
  };