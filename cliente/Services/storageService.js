import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from "underscore"
import { getBalanceHistory } from './BalanceService';

export const storage = new Storage({
    // maximum capacity, default 1000 key-ids
    size: 1000,

    // Use AsyncStorage for RN apps, or window.localStorage for web apps.
    // If storageBackend is not set, data will be lost after reload.
    storageBackend: AsyncStorage, // for web: window.localStorage

    // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: null,

    // cache data in the memory. default is true.
    enableCache: true,

    // if data was not found in storage or expired data was found,
    // the corresponding sync method will be invoked returning
    // the latest data.
    sync: {
        // we'll talk about the details later.
    }
});

export const getBalances = async (cloned = false) => {
    const clone = (items) => items.map(item => (Array.isArray(item) ? clone(item) : item));
    return storage
        .load({
            key: 'balanceHistory',
        }).then(res => cloned ? clone(res) : res)
        .catch(err => {
            // any exception including data not found
            // goes to catch()
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    return [[], []];
                case 'ExpiredError':
                    return [[], []];
            }
        });
}

export const addBalanceHistory = async (actives) => {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    var day = hoy.toLocaleDateString(); // "14/6/2020"
    var balances = await getBalances()
    if (balances[0].length > 1 && balances[0][balances[0].length - 1] === day)
        balances[1][balances[1].length - 1] = actives
    else {
        balances[0].push(day)
        balances[1].push(actives)
    }
    storage.save({
        key: 'balanceHistory', // Note: Do not use underscore("_") in key!
        data: balances,
    });
}

export const removeBalancesHistory = async () => {
    storage.save({
        key: 'balanceHistory', // Note: Do not use underscore("_") in key!
        data: [[], []],
    });
}