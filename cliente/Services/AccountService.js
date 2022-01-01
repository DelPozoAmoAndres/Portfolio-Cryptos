import { getHistoryDB, saveHistoryBD } from "../DB/DB_Accounts"
import Balance from "../Model/entities/Balance";
import HistorialEntry from "../Model/entities/HistorialEntry";

export const getHistoryService = async (address, gestorCrypto) => {
    const histories = await getHistoryDB(address)
    var list = []
    for (var h in histories) {
        const balances = histories[h].balance
        var listBalances = []
        for (var b in balances) {
            listBalances.push(new Balance(gestorCrypto.getCrypto(balances[b].crypto.symbol), balances[b].amount))
        }
        list.push(new HistorialEntry(histories[h].date, listBalances))
    }
    return list
}

export const saveHistoryService = async (address, balance, histories) => {
    var lastDate=""
    if (histories.length > 0) {
        const lastHistory = histories[histories.length - 1]
        lastDate=lastHistory.getDate()
    }
    const now = Date.now();
    var date = new Date(now);
    date = date.getUTCDate() + "/" + date.getUTCMonth() + "/" + date.getUTCFullYear() + "-" + date.getUTCHours() + ":" + date.getUTCMinutes()
    if (lastDate !== date) {
        histories.push(new HistorialEntry(date, balance))
        return await saveHistoryBD(address, histories)
    }
    return undefined
}