
export const callBsc = async (address) => {
    return await fetch("https://bscscan.com/tokenholdingsHandler.aspx?&a=" + address + "&q=&p=1&f=0&h=0&sort=total_price_usd&order=desc&pUsd24hrs=590.15&pBtc24hrs=0.01006&pUsd=569.92&fav=&langMsg=A%20total%20of%20XX%20tokenSS%20found&langFilter=Filtered%20by%20XX&langFirst=First&langPage=Page%20X%20of%20Y&langLast=Last&ps=25", {
        "headers": {
            "host": "bscscan.com",
            "accept": "*/*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Request-Method": "GET",
            "Access-Control-Request-Headers": "X-PINGOTHER, Content-Type",
            "accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "content-type": "application/json",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "cookie": "_ga=GA1.2.2040630469.1636194857; ASP.NET_SessionId=frhysftcq3vev5ve1wffgov2; __cflb=02DiuJNoxEYARvg2sN5nZBeFpCLNsmCfErN1CiTnriTpY; _gid=GA1.2.1752901811.1637555953; __cf_bm=YyO1B9dGZqH8I_1q03FLYU_zrIYQ8KndrwtBnkJ4EYM-1637555955-0-AYkLb/nQA5yJyT33dSAmwhuRH5VDwjKlBpKM7n8mtsc0N33eBZCePuAuVQUJz14Q4apg6SkYq9U0o3LCSYE2Inq9nR8W0O+ri1sI+OZO/kubl9V3JfSNELEfmLzaNYvelQ==",
            "Referer": "https://bscscan.com/tokenholdings?a=0xb35E7381FB2EbA8781707f1cAc14B7722Dbb8485",
            "Referrer-Policy": "origin-when-cross-origin",
            "user-agent": "chrome"
        },
        "body": null,
        "method": "GET"
    }).then(r => r.json()).then(data => parseData(data));
}

const parseData = (data) => {
    var list=[]
    var output = data["layout"].split("<div class='mr-2'><img class='u-sm-avatar' src=");
    output.shift()
    for (var i = 0; i < output.length; i++) {
        output[i] = output[i]
            .replace("'/images/main/empty-token.png'>", "")
            .replace("></div><div class='media-body font-weight-bold'>", ";;;")
            .replace("</div></div></td><td>", ";")
            .replace("</td><td>", ";")
            .replace("</td><td>")
            .replace("href='/address/", ";")
            .replace("'><span data-toggle='tooltip' title=", "")
            .replace("><font color=''>", ";")
            .replace("...</font></span></a><a class='hash-tag text-truncate d-block font-size-1' data-toggle='tooltip' title=", "")
            .replace("undefined", ";")
            .replace("'", "")
            .replace("'></div><div class='media-body'><a class='hash-tag text-truncate font-weight-bold' href='", ";")
            .replace("'","")
            .replace("<i class='fa fa-caret-","")
            .replace("'></i> ","")
            .replace("down",";-")
            .replace("up",";")
            .replace("%</span>",";")
            .replace("%</font>",";")
            .replace("</a><a ",";")
            .replace("<span data-toggle='tooltip' title='","")
            .replace("'><font color=''>",",")
            .replace("...</font></span>","")
            .replace("$","")
            .replace("<span class='text-secondary'>",";")
            .split(";")
        if(output[i].length>6 && parseFloat(output[i][6])>0){
            if(output[i][4].split(",").length>1)
                output[i][4]=output[i][4].split(",")[0]
            if(output[i][4]==="BSC-USD")
                output[i][4]="USDT"
            list.push({name:output[i][4],balance:output[i][5],img:"https://bscscan.com" + output[i][0]})
        }
    }
    return list
}

const checkToken = (token) => {
    var num = parseInt(token)
    var str = num.toString()
    if (str === "NaN")
        return true
    else
        return false
}