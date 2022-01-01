export const callRonin = async(addr)=>{
var address=addr.replace("0x","");
return fetch("https://explorer.roninchain.com/_next/data/MP4ApQgQgIMen7_H0KnjR/address/ronin:"+address+".json", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "cache-control": "max-age=0",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Microsoft Edge\";v=\"96\"",
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": "\"Android\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "cookie": "_ga=GA1.1.1972771367.1636025714; _ga_5TSMJF6BP1=GS1.1.1636026098.1.1.1636027030.0; _ga_5J10CG1JHS=GS1.1.1636025713.1.1.1636027111.0; _ga_XNHB969QVN=GS1.1.1640819559.4.1.1640821186.0",
    "user-agent": "chrome"
  },
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET"
}).then(r => r.json()).then(res=>parseData(res))
}

const parseData=(value)=>{
    const list=[];
    const balances=value["pageProps"]["balance"]["results"]
    for( var i in balances){
        var balance=parseFloat(balances[i].balance)
        for(var z=0;z<balances[i].tokenDecimals;z++)
            balance=balance/10
        var image;
        if(balances[i].tokenSymbol==="WETH")
            image="https://assets.axieinfinity.com/explorer/images/contract-icon/eth.png";
        if(balances[i].tokenSymbol==="SLP")
            image="https://katana.roninchain.com/static/media/slp.a3a5526b.svg"
        if(balances[i].tokenSymbol==="RON")
            image="https://katana.roninchain.com/static/media/ron-logo.401896d7.svg"
        if(balances[i].tokenSymbol==="USDC")
            image="https://katana.roninchain.com/static/media/usdc.7eaf74af.svg"
        list.push({name:balances[i].tokenSymbol, balance:balance.toString(), img:image})
        
    }
    return list;
}