import { getBalanceService } from "../../services/BalanceService";
import { getHistoryService,saveHistoryService } from "../../services/AccountService";
import Account from "./Account";
import History from "../entities/History";

export default class ManualAccount extends Account {
    constructor(name, address, balance,history) {
        super(name, address)
        this.balance = balance
        this.history=history;
    }
    static async init(name,address,gestorCrypto){
        const balance = await getBalanceService(address,gestorCrypto)
        const history=await getHistoryService(address,gestorCrypto)
        return new ManualAccount(name,address,balance,history)
    }
    getBalance(){
        return this.balance
    }
    getHistory() {
        return this.history
    }
    async addHistoryEntry() {
        var res = await saveHistoryService(super.getAddress(),this.getBalance(),this.getHistory())
        if(res!==undefined)
            this.history.push(res);
    }
}