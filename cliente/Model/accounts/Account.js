export default class Account {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }

    async init(name, address) {
        return new Account(name, address)
    }
    getName() {
        return this.name;
    }
    getAddress() {
        return this.address;
    }
    toJson() {
        const res = { name: this.name, address: this.address, type: Object.getPrototypeOf(this).name };
        return res
    }


}