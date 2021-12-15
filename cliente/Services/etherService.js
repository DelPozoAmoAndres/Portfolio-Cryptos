
export const callEther = async (address) => {
    return await fetch("https://etherscan.io/tokenholdings?a="+address, {
        "headers": {
          "host": "etherscan.io",
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
            "Referer": "https://etherscan.io/address/0xb35E7381FB2EbA8781707f1cAc14B7722Dbb8485",
            "Referrer-Policy": "origin-when-cross-origin",
            "user-agent": "chrome"
        },
        "body": null,
        "method": "GET",
      }).then(r => r.text()).then(data => parseData(data));
}

const parseData = (data) => {
    
    var list=[]
    var output = data.split("<th>&nbsp;</th>\n</tr>\n</thead>\n<tbody>");
    output.shift()
    output.pop()
    output=output[0].split("</div></td></tr>\n</tbody>\n</table>\n</div>")[0]   
    output = output
        .replace("<tr><td><div class='media align-items-center'><div class='mr-3'><img class='u-sm-avatar bg-white-content rounded-circle shadow' ", "")
        .replace("></div><div class='media-body'><span>", ",")
        .replace("</span></div></div></td><td>", ",")
        /*
        .replace("</td><td>", ",")
        .replace("</td><td>")
        .replace("href='/address/", ",")
        .replace("'><span data-toggle='tooltip' title=", "")
        .replace("><font color=''>", ",")
        .replace("...</font></span></a><a class='hash-tag text-truncate d-block font-size-1' data-toggle='tooltip' title=", "")
        .replace("undefined", ",")
        .replace("'", "")
        .replace("'></div><div class='media-body'><a class='hash-tag text-truncate font-weight-bold' href='", ",")
        .replace("'","")
        .replace("down","up")
        .replace("<i class='fa fa-caret-up'></i> ",",")
        .replace("font","span")
        .replace("%</span>",",")
        .split(",")
    if(checkToken(output[i][4]) && output[i][5]>0)
        list.push({name:output[i][4],balance:output[i][5],img:output[i][0], porcentage:output[i][7]})
    
    console.log(list)
    */
    console.log(output)
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