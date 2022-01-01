import { storage } from "../services/StorageService"

export const saveAccountDB = async (account) => {
    try {
        var accounts = await getAccountsDB()
        accounts.push(account.toJson())

        storage.save({
            key: 'accounts',
            data: accounts,
        });
        return ({ status: "OK", info: "Account saved on storage" })
    } catch (error) {
        return ({ status: "Fail", info: error })
    }

}

export const removeAccountDB = async (addr) => {
    try {
        var accounts = await getAccountsDB()
        accounts = accounts.filter(function (a) {
            return a.address !== addr;
        });
        storage.save({
            key: 'accounts', // Note: Do not use underscore("_") in key!
            data: accounts,
        });
        return ({ status: "OK", info: "Account deleted from storage" })
    } catch (error) {
        return ({ status: "Fail", info: error })
    }
}

export const getAccountsDB = async () => {
    return storage
        .load({
            key: 'accounts',
        }).then(res => res)
        .catch(err => {
            // any exception including data not found
            // goes to catch()
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    return [];
                case 'ExpiredError':
                    return [];
            }
        });
}

export const saveHistoryBD = async (address,history)=>{
    try {
        storage.save({
            key: address,
            data: history,
        });
        return entry
    } catch (error) {
        return undefined
    }
}

export const getHistoryDB = async (address)=>{
    return storage
    .load({
        key: address,
    }).then(res => res)
    .catch(err => {
        // any exception including data not found
        // goes to catch()
        console.warn(err.message);
        switch (err.name) {
            case 'NotFoundError':
                return [];
            case 'ExpiredError':
                return [];
        }
    });
}