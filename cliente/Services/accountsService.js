import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from "underscore"

const storage = new Storage({
    // maximum capacity, default 1000 key-ids
    size: 1000,

    // Use AsyncStorage for RN apps, or window.localStorage for web apps.
    // If storageBackend is not set, data will be lost after reload.
    storageBackend: AsyncStorage, // for web: window.localStorage

    // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: 1000 * 3600 * 24,

    // cache data in the memory. default is true.
    enableCache: true,

    // if data was not found in storage or expired data was found,
    // the corresponding sync method will be invoked returning
    // the latest data.
    sync: {
        // we'll talk about the details later.
    }
});

export const addAddres = async (addr) => {
    var address=await getAddress()
    if (addr!=="" && !address.includes(addr)) {
        address.push(addr)
        storage.save({
            key: 'address', // Note: Do not use underscore("_") in key!
            data: address,
            // if expires not specified, the defaultExpires will be applied instead.
            // if set to null, then it will never expire.
            expires: null
        });
    }
    console.log(address)
}

export const removeAddres=async (addr)=>{
    var address=await getAddress()
    if (address.includes(addr)) {
        address=_.where(address, {addr})
        storage.save({
            key: 'address', // Note: Do not use underscore("_") in key!
            data: address,
            // if expires not specified, the defaultExpires will be applied instead.
            // if set to null, then it will never expire.
            expires: null
        });
    }
    console.log(address)
}

export const getAddress =  async () => {
    return storage
        .load({
            key: 'address',
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
