var _ = require("underscore");
const getIds = async (tokens) => {
  var list = []
  var data = await fetch("https://api.coingecko.com/api/v3/coins/list", {
    "headers": {
      "accept": "application/json",
      "accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
      "sec-ch-ua": "\"Microsoft Edge\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "Referer": "https://www.coingecko.com/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "user-agent": "chrome"
    },
    "body": null,
    "method": "GET"
  }).then(res => res.json());
  for (var t in tokens) {
    var crypto = _.where(data, { symbol: tokens[t].toLowerCase() })
    if (crypto.length > 0) {
      list.push(crypto[0]["id"])
    }
  }
  return list;
}
export const getPrices = async (tokens) => {
  var idsList = await getIds(tokens);
  var ids = "";
  for (var id in idsList) {
    if (id == 0)
      ids = idsList[id]
    else
      ids += "%2C" + idsList[id]
  }
  var prices = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=" + ids + "&vs_currencies=eur%2Cusd", {
    "headers": {
      "accept": "application/json",
      "accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
      "if-none-match": "W/\"63ed3ac6f42b5c90c0431249a6b21b54\"",
      "sec-ch-ua": "\"Microsoft Edge\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "Referer": "https://www.coingecko.com/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "user-agent": "chrome"
    },
    "body": null,
    "method": "GET"
  }).then(res => res.json());
  return getTokens(prices)
}
const getTokens = async (prices) => {
  var list = new Map()
  var data = await fetch("https://api.coingecko.com/api/v3/coins/list", {
    "headers": {
      "accept": "application/json",
      "accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
      "sec-ch-ua": "\"Microsoft Edge\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "Referer": "https://www.coingecko.com/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "user-agent": "chrome"
    },
    "body": null,
    "method": "GET"
  }).then(res => res.json());
  for (var p in prices) {
    var crypto = _.where(data, { id: p })
    if (crypto.length > 0) {
      list.set(crypto[0]["symbol"].toUpperCase(), [prices[p]["eur"], prices[p]["usd"]])
    }
  }
  return list;
}

export const getCoins = async (currency) => {
  var data=[];
  for (var i = 1; i <= 29; i++) {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=" + currency + "&order=market_cap_desc&per_page=250&page=" + i + "&sparkline=false", {
      "headers": {
        "accept": "application/json",
        "accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "sec-ch-ua": "\"Microsoft Edge\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "Referer": "https://www.coingecko.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "user-agent": "chrome"
      },
      "body": null,
      "method": "GET"
    }
    );
    const data1 = await res.json();
    data=[...data,...data1];
  }
  return data;
}

