import { callBsc } from './bscService';
import { getPrices } from './coinGeckoService';

const address = ["0xb35E7381FB2EbA8781707f1cAc14B7722Dbb8485","0xB80a65a3b8d61dEb7aB51BbE9Ae64071EAd85b1a","0x33237eb89c0Ca756189624aE9cd6f0DfbF262589","0xFfa142A5852A7B4018086bC6eAb88493AE881CAB"]

export const getActives = async () => {
  var list=[]
  var balances = new Map()
  var tokens = await getTokens()
  var price=await getPrices(tokens)
  for (var a in address) {
    var balance = await callBsc(address[a])
    for (var j in balance) {
      var name = balance[j].name;
      var value = balance[j].balance;
      if (balances.has(name))
        balances.set(name, [parseFloat(balances.get(name)) + parseFloat(value), (parseFloat(balances.get(name)) + parseFloat(value))*parseFloat(price.get(name)[0]), (parseFloat(balances.get(name)) + parseFloat(value))*parseFloat(price.get(name)[1])])
      else
        balances.set(name, [value, parseFloat(value)*parseFloat(price.get(name)[0]), parseFloat(value)*parseFloat(price.get(name)[1])])
    }
  }
  list=Array.from(balances, ([name, value]) => ({ name, value }));
  return list;
}

export const getTotal = (activos,currency="USD") => {
    var index=2;
    if(currency==="EUR")
        index=1
    var sum=0;
    for(var i in activos){
        sum+=activos[i].value[index]
    }
    return sum+" "+currency;
  }

const getTokens = async () => {
  var tokens = []
  for (var i in address) {
    var balance = await callBsc(address[i])
    for (var j in balance) {
      if (!tokens.includes(balance[j].name))
        tokens.push(balance[j].name)
    }
  }
  return tokens
}