import { getAccountsDB, saveAccountDB, removeAccountDB,getHistoryDB } from "../DB/DB_Accounts"
import Account from "../Model/accounts/Account";
import ManualAccount  from "../Model/accounts/ManualAccount";

export const getAccountsService = async (gestorCryptos) => {
    var list = [];
    const accounts = await getAccountsDB();
    for (var a in accounts) {
        const account = accounts[a];
        if (account.type === undefined)
            list.push(await ManualAccount.init(account.name, account.address,gestorCryptos));
        else
            list.push(await Account.init(account.name, account.address));
    }
    return list;
}

export const removeAccountService = async (addr) =>{
    return await removeAccountDB(addr)
}

export const saveAccountService = async (accounts, account) => {
    for (var i in accounts) {
        if (accounts[i].getName() === account.getName()) {
            return { status: "Fail", info: "Name already used" };
        }
        if (accounts[i].getAddress() === account.getAddress()) {
            return { status: "Fail", info: "Address already used" };
        }
    }
    return await saveAccountDB(account);
}