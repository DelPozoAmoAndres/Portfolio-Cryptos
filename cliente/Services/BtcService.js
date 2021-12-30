export const callBtcWithXPub = async (xpub) => {
    return fetch("https://blockexplorer.one/ajax/btc/mainnet/xpub-search/" + xpub + "/?page=0", {
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
            "cookie": "XSRF-TOKEN=eyJpdiI6InF4REhNamtDTW9XZVUwYko3RG5ER2c9PSIsInZhbHVlIjoia3o3blQ3S2RlQUtDallxTzIyeTNJY1FycCs3YzNUbzcrY1FCcUlJUENpWnJOZ3pSakVsRHlCMXA3a0lnZThNcTBSMElod3RoVEhITnFKTlpyVXdYUDJNQTZcL1VZU3ZYNGJkeVdMQXhTOFI4c3VUQTE2NUF3SVVHeFVxOTNEeDhoIiwibWFjIjoiNWU5NDRmOWM3ZWU2OTlkNmQzODFkNWJiMTBiYTM5NTJiYmYxNDMwN2E4NDQ2NTZiNjA3OTMzNmVmZWQ4NmU0MyJ9; blockexplorer_session=eyJpdiI6ImlNMEVvUEFQbzR6YzBhMFN6UVErV1E9PSIsInZhbHVlIjoibFliOHEwSWkwakxVd0Z5eDh5YXBaalNyRkN0VkVBMU5EUEpqcGJkVTJlMVozYnZUU05VTGRVVm9jeEJLXC96YldQQ3BQXC9xc1wvWnhqQlN3d0ljdlQySjlDRWExSnl3UVVHWGw2cHlsaE9KMlJWb2ZpWVZsN25QZ3ErQUtIK21XMTkiLCJtYWMiOiIxN2M4MjU3ZmYwNzk3Njc2ZDdmMWZiOWIwMDE0MTE2ODE3ZjIwMzU1YTE0NjViYTk1MGM4ZjhiMWY1MWQ2MTFjIn0%3D; GCLB=CJmsrrKc96_njwE",
            "user-agent": "chrome"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET"
    }).then(r => r.json()).then(res => parseData(res));
}

const parseData = (value) => {
    console.log(value)
    var balance = value["balance"].amount
    var name = value["balance"].unit
    return [{ name: name, balance: balance, img: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png" }]
}
