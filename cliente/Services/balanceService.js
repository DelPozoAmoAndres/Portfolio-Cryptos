import { callBsc } from './calls/BscService';
import { callBtcWithXPub } from './calls/BtcService';
import { callEther } from './calls/EtherService';
import { callRonin } from './calls/RoninService';
import { addBalanceHistory, getAddress, getBalances, removeBalancesHistory, getXpubs, getAccounts } from './StorageService';
import Balance from '../Model/entities/Balance';

export const getBalanceService = async (address, gestorCrypto) => {
    var list = []
    var balances = []
    if (address.match(/0x.*/)) {
        const bscBalance = await callBsc(address);
        const roninBalance = await callRonin(address);
        balances = [...bscBalance, ...roninBalance]
    }
    else {
        balances = await callBtcWithXPub(address)
    }
    for (var b in balances) {
        list.push(new Balance(gestorCrypto.getCrypto(balances[b].name), balances[b].balance))
    }
    //const etherBalance=callEther(address);
    return list;
}
export const getTotal = (activos) => {
    var sum = 0;
    for (var i in activos) {
        if(activos[i] instanceof Balance)
            sum += parseFloat(activos[i].getValue())
    }
    return sum;
}
/*
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

export const getAddressByName = async (name) => {
    const accounts = await getAccounts();
    for (var a in accounts) {
        if (name === accounts[a].name)
            return accounts[a]
    }
    return {}
}*/