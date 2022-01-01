import { getCryptosService } from "../services/CryptosService";
import _ from "underscore";

export default class GestorCryptos{
    constructor(cryptos){
        this.cryptos=cryptos;
    }

    static async init(){
        const cryptos= await getCryptosService()
        return new GestorCryptos(cryptos);
    }

    getListCryptos(){
        return this.cryptos
    }

    getCrypto(name){
        return _.where(this.cryptos, { symbol: name.toLowerCase()})[0]
    }
}