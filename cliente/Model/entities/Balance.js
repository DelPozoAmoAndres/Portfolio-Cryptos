export default class Balance{
    constructor(crypto,amount){
        this.crypto=crypto;
        this.amount=amount;
    }
    getCrypto(){
        return this.crypto;
    }
    getAmount(){
        return this.amount;
    }
    setAmount(){
        this.amount=this.amount;
    }
    getValue(){
        return this.crypto.getPrice()*parseFloat(this.amount.replace(",",""))
    }

}