import { getAccountsService, saveAccountService, removeAccountService } from "../services/ManagerService";
import HistorialEntry from "./entities/HistorialEntry";
import GestorCryptos from "./GestorCryptos";

export default class Manager {
    constructor(accounts, gestorCrypto) {
        this.accounts = accounts
        this.gestorCrypto = gestorCrypto
    }
    static async init() {
        const gestorCrypto = await GestorCryptos.init();
        const accounts = await getAccountsService(gestorCrypto);
        return new Manager(accounts, gestorCrypto)
    }
    async addAccount(account) {
        var res = await saveAccountService(this.accounts, account)
        if (res.status === "OK") {
            this.accounts.push(account);
            return { status: "OK", info: "Account has been correctly added" };
        }
        return res.info;
    }
    async removeAccount(address) {
        var res = await removeAccountService(address)
        if (res.status === "OK") {
            this.accounts = this.accounts.filter(function (a) {
                return a.address !== address;
            })
            return { status: "OK", info: "Account has been correctly added" };
        }
        return res.info;
    }
    getListAccounts() {
        return this.accounts;
    }
    getBalance(accounts) {
        var list = []
        for (var a in accounts) {
            var balances = accounts[a].getBalance()
            for (var b in balances) {
                var exist = false;
                for (var l in list) {
                    if (list[l].getCrypto().getSymbol() === balances[b].getCrypto().getSymbol()) {
                        list[l].setAmount(list[l].amount + balances[b].getAmount())
                        exist = true;
                        break;
                    }
                }
                if (!exist)
                    list.push(balances[b])
            }
        }
        return list;
    }
    async getHistories(accounts) {
        var list = []
        for (var a in accounts) {
            list.push(await accounts[a].getHistory())
        }
        return list;
    }
    async addHistory() {
        for (var a in this.accounts) {
            this.accounts[a].addHistoryEntry()
        }
    }
    getGestorCrypto() {
        return this.gestorCrypto;
    }
}