export default class Configuration {
    constructor(){
        this.dark=false,
        this.currency="USD"
    }
    getCurrency(){
        return this.currency;
    }
}