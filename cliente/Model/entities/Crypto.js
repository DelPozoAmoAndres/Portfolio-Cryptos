export default class Crypto {
    constructor(id,name,symbol,price,market_cap,img,ranking,porcentage){
        this.id=id;
        this.name=name;
        this.symbol=symbol;
        this.price=price;
        this.market_cap=market_cap;
        this.img=img;
        this.porcentage=porcentage;
        this.ranking=ranking;
    }
    getId(){
        return this.id;
    }
    getName(){
        return this.name;
    }
    getSymbol(){
        return this.symbol;
    }
    getPrice(){
        return this.price;
    }
    getMarketCap(){
        return this.market_cap;
    }
    getImage(){
        return this.img;
    }
    getPorcentage(){
        return this.porcentage;
    }
    getRanking(){
        return this.ranking;
    }
    getHistorial(type){
        return 0;
    }
}