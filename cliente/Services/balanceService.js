import { callBsc } from './bscService';
import { getPrices } from './coinGeckoService';
import { getAddress } from './accountsService';

export const getActives = async () => {
    var address=await getAddress()
    var list = []
    var balances = new Map()
    var tokens = await getTokens()
    var price = await getPrices(tokens)
    for (var a in address) {
        var balance = await callBsc(address[a])
        for (var j in balance) {
            var name = balance[j].name;
            var value = balance[j].balance;
            if (balances.has(name))
                balances.set(name, [parseFloat(balances.get(name)) + parseFloat(value), (parseFloat(balances.get(name)) + parseFloat(value)) * parseFloat(price.get(name)[0]), (parseFloat(balances.get(name)) + parseFloat(value)) * parseFloat(price.get(name)[1])])
            else
                balances.set(name, [value, parseFloat(value) * parseFloat(price.get(name)[0]), parseFloat(value) * parseFloat(price.get(name)[1])])
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
    return sum ;
}

const getTokens = async () => {
    var tokens = []
    var address=await getAddress()
    for (var i in address) {
        var balance = await callBsc(address[i])
        for (var j in balance) {
            if (!tokens.includes(balance[j].name))
                tokens.push(balance[j].name)
        }
    }
    return tokens
}