var _ = require("underscore");

export const getBscCoins = async (currency) => {
  var data = [];
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
    data = [...data, ...data1];
  }
  return data;
}

export const getRoninCoins = async () => {
  var data = [];
  return await fetch("https://explorer.roninchain.com/_next/data/MP4ApQgQgIMen7_H0KnjR/tokens.json", {
    "headers": {
      "accept": "*/*",
      "accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Microsoft Edge\";v=\"96\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "cookie": "_ga=GA1.1.1972771367.1636025714; _ga_5TSMJF6BP1=GS1.1.1636026098.1.1.1636027030.0; _ga_5J10CG1JHS=GS1.1.1640832099.3.0.1640832099.0; _ga_XNHB969QVN=GS1.1.1640909897.6.1.1640910777.0",
      "Referer": "https://explorer.roninchain.com/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "user-agent": "chrome"
    },
    "body": null,
    "method": "GET"
  }).then(r => r.json()).then(res => res["pageProps"]["tokens"]["results"])
}

export const getRoninPrices = async () => {
  return await fetch("https://exchange-rate.axieinfinity.com/", {
    "headers": {
      "accept": "*/*",
      "accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Microsoft Edge\";v=\"96\"",
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": "\"Android\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "Referer": "https://explorer.roninchain.com/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "user-agent": "chrome"
    },
    "body": null,
    "method": "GET"
  }).then(r => r.json()).then(res => res);
}
