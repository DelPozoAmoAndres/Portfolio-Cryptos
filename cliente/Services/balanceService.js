import { callBsc } from './BscService';
import { getPrices } from './CoinGeckoService';
import { addBalanceHistory, getAddress, getBalances, removeBalancesHistory } from './StorageService';

export const getActives = async () => {
    var address = await getAddress()
    var list = []
    var balances = new Map()
    var tokens = await getTokens()
    var price = await getPrices(tokens)
    var history = await getBalanceHistory()
    for (var a in address) {
        var balance = await callBsc(address[a])
        for (var j in balance) {
            var name = balance[j].name;
            var value = balance[j].balance;
            var img = balance[j].img;
            var historyBalance = history[1];
            var porcentage = getPorcentageActive(balance[j], price, historyBalance);
            if (balances.has(name))
                balances.set(name, [parseFloat(balances.get(name)) + parseFloat(value), (parseFloat(balances.get(name)) + parseFloat(value.replace(",", ""))) * parseFloat(price.get(name)[0]), (parseFloat(balances.get(name)) + parseFloat(value.replace(",", ""))) * parseFloat(price.get(name)[1]), porcentage, img])
            else
                balances.set(name, [value, parseFloat(value.replace(",", "")) * parseFloat(price.get(name)[0]), parseFloat(value.replace(",", "")) * parseFloat(price.get(name)[1]), porcentage, img])
        }
    }
    list = Array.from(balances, ([name, value]) => ({ name, value }));
    return list;
}

export const getTotal = (activos, currency = "USD") => {
    var index = 2;
    if (currency === "EUR")
        index = 1
    var sum = 0;
    for (var i in activos) {
        sum += activos[i].value[index]
    }
    return sum;
}

const getTokens = async () => {
    var tokens = []
    var address = await getAddress()
    for (var i in address) {
        var balance = await callBsc(address[i])
        for (var j in balance) {
            if (!tokens.includes(balance[j].name)) {
                tokens.push(balance[j].name)
            }
        }
    }
    return tokens
}

export const getPorcetage = (actives, balanceHistory) => {
    var totalUSD = getTotal(actives)
    if (balanceHistory.length <= 1)
        return 0;
    var totalUSDHistory = getTotal(balanceHistory[balanceHistory.length - 2])
    return ((totalUSD - totalUSDHistory) / totalUSDHistory).toFixed(2);
}

export const getBalanceHistory = async () => {
    return await getBalances(true)
}

export const deleteHistory = async () => {
    await removeBalancesHistory();
    return await getBalanceHistory()
}

export const addHistory = async (actives) => {
    await addBalanceHistory(actives)
    return await getBalanceHistory()
}

export const getPorcentageActive = (item, price, history) => {
    if (history.length > 1) {
        for (var i = 0; i < history[history.length - 2].length; i++)
            if (history[history.length - 2][i].name === item.name) {
                item.balance = item.balance.replace(",", "")
                return (parseFloat(item.balance) * parseFloat(price.get(item.name)[1]) - history[history.length - 2][i].value[2]) / history[history.length - 2][i].value[2]
            }
        return 0
    }
    else
        return 0
}