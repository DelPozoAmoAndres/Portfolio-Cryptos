export default class HistorialEntry{
    constructor(date,balance){
        this.date=date
        this.balance=balance
    }
    getBalance(){
        return this.balance;
    }
    getDate(){
        return this.date;
    }
}