export default class History {
    constructor(address,historyEntries){
        this.address=address;
        this.historyEntries=historyEntries;
    }
    getAddress(){
        return this.address;
    }
    getHistoryEntries(){
        return this.historyEntries;
    }
}