import axios from "axios";

let audio = [];

const ask = axios.create({
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    }
})

//访问酷狗音乐接口,根据歌单UUID获取歌曲HASH
export async function getMusicList(uuid) {
    let list = [];
    await ask.get("/music/plist/list/" + uuid + "?json=true")
        .then((result) => {
            list = result.data.list.list.info;
        })
        .catch((error) => {
            console.log(error);
        })
    const mid = getMid();
    let request = [];
    for (const l of list) {
        request.push(getAudioInfo(l['album_id'], l.hash, mid));
    }
    //多请求并发执行
    await axios.all(request)
        .then((result) => {
            for (const resultElement of result) {
                const r = resultElement.data.data;
                const url = r['play_url'];
                if (url.length !== 0) {
                    audio.push({
                        url, cover: r["img"], lrc: r["lyrics"],
                        name: r["song_name"], artist: r["author_name"],
                    });
                }
            }
        })
        .catch((error) => {
            console.log(error);
        })
    //缓存歌单信息,加快二次加载速度
    sessionStorage.setItem("musicList", JSON.stringify({
        uuid, audio
    }));
    return audio;
}

//根据歌曲HASH和歌词ID获取具体歌曲信息
const getAudioInfo = (album_id, hash, mid) => {
    return ask.get("/audio/yy/index.php?r=play/getdata" + "&hash=" + hash +
        "&mid=" + mid + "&platid=4" + "&album_id=" + album_id)
}

//根据酷狗音乐规则伪造mid
const getMid = () => {
    const e = () => (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
    return Md5(e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e());
}

//可能是标准的MD5,不确定
const Md5 = (e) => {
    let t, r = 0, a = 8;

    const s = (e, t, n, i, r, a) => {
        return p(function (e, t) {
            return e << t | e >>> 32 - t
        }(p(p(t, e), p(i, a)), r), n)
    }

    const d = (e, t, n, i, r, a, o) => {
        return s(t & n | ~t & i, e, t, r, a, o)
    }

    const f = (e, t, n, i, r, a, o) => {
        return s(t & i | n & ~i, e, t, r, a, o)
    }

    const h = (e, t, n, i, r, a, o) => {
        return s(t ^ n ^ i, e, t, r, a, o)
    }

    const g = (e, t, n, i, r, a, o) => {
        return s(n ^ (t | ~i), e, t, r, a, o)
    }

    const p = (e, t) => {
        const n = (65535 & e) + (65535 & t);
        return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
    }

    return e ? function (e) {
        let t = r ? "0123456789ABCDEF" : "0123456789abcdef", n = "", i = 0;
        for (; i < 4 * e.length; i++)
            n += t.charAt(e[i >> 2] >> i % 4 * 8 + 4 & 15) + t.charAt(e[i >> 2] >> i % 4 * 8 & 15);
        return n
    }(function (e, t) {
        e[t >> 5] |= 128 << t % 32;
        e[14 + (t + 64 >>> 9 << 4)] = t;
        let n = 1732584193, i = -271733879, r = -1732584194, a = 271733878;
        for (let o = 0; o < e.length; o += 16) {
            const s = n, c = i, l = r, u = a;
            n = d(n, i, r, a, e[o], 7, -680876936)
            a = d(a, n, i, r, e[o + 1], 12, -389564586)
            r = d(r, a, n, i, e[o + 2], 17, 606105819)
            i = d(i, r, a, n, e[o + 3], 22, -1044525330)
            n = d(n, i, r, a, e[o + 4], 7, -176418897)
            a = d(a, n, i, r, e[o + 5], 12, 1200080426)
            r = d(r, a, n, i, e[o + 6], 17, -1473231341)
            i = d(i, r, a, n, e[o + 7], 22, -45705983)
            n = d(n, i, r, a, e[o + 8], 7, 1770035416)
            a = d(a, n, i, r, e[o + 9], 12, -1958414417)
            r = d(r, a, n, i, e[o + 10], 17, -42063)
            i = d(i, r, a, n, e[o + 11], 22, -1990404162)
            n = d(n, i, r, a, e[o + 12], 7, 1804603682)
            a = d(a, n, i, r, e[o + 13], 12, -40341101)
            r = d(r, a, n, i, e[o + 14], 17, -1502002290)
            i = d(i, r, a, n, e[o + 15], 22, 1236535329)
            n = f(n, i, r, a, e[o + 1], 5, -165796510)
            a = f(a, n, i, r, e[o + 6], 9, -1069501632)
            r = f(r, a, n, i, e[o + 11], 14, 643717713)
            i = f(i, r, a, n, e[o], 20, -373897302)
            n = f(n, i, r, a, e[o + 5], 5, -701558691)
            a = f(a, n, i, r, e[o + 10], 9, 38016083)
            r = f(r, a, n, i, e[o + 15], 14, -660478335)
            i = f(i, r, a, n, e[o + 4], 20, -405537848)
            n = f(n, i, r, a, e[o + 9], 5, 568446438)
            a = f(a, n, i, r, e[o + 14], 9, -1019803690)
            r = f(r, a, n, i, e[o + 3], 14, -187363961)
            i = f(i, r, a, n, e[o + 8], 20, 1163531501)
            n = f(n, i, r, a, e[o + 13], 5, -1444681467)
            a = f(a, n, i, r, e[o + 2], 9, -51403784)
            r = f(r, a, n, i, e[o + 7], 14, 1735328473)
            i = f(i, r, a, n, e[o + 12], 20, -1926607734)
            n = h(n, i, r, a, e[o + 5], 4, -378558)
            a = h(a, n, i, r, e[o + 8], 11, -2022574463)
            r = h(r, a, n, i, e[o + 11], 16, 1839030562)
            i = h(i, r, a, n, e[o + 14], 23, -35309556)
            n = h(n, i, r, a, e[o + 1], 4, -1530992060)
            a = h(a, n, i, r, e[o + 4], 11, 1272893353)
            r = h(r, a, n, i, e[o + 7], 16, -155497632)
            i = h(i, r, a, n, e[o + 10], 23, -1094730640)
            n = h(n, i, r, a, e[o + 13], 4, 681279174)
            a = h(a, n, i, r, e[o], 11, -358537222)
            r = h(r, a, n, i, e[o + 3], 16, -722521979)
            i = h(i, r, a, n, e[o + 6], 23, 76029189)
            n = h(n, i, r, a, e[o + 9], 4, -640364487)
            a = h(a, n, i, r, e[o + 12], 11, -421815835)
            r = h(r, a, n, i, e[o + 15], 16, 530742520)
            i = h(i, r, a, n, e[o + 2], 23, -995338651)
            n = g(n, i, r, a, e[o], 6, -198630844)
            a = g(a, n, i, r, e[o + 7], 10, 1126891415)
            r = g(r, a, n, i, e[o + 14], 15, -1416354905)
            i = g(i, r, a, n, e[o + 5], 21, -57434055)
            n = g(n, i, r, a, e[o + 12], 6, 1700485571)
            a = g(a, n, i, r, e[o + 3], 10, -1894986606)
            r = g(r, a, n, i, e[o + 10], 15, -1051523)
            i = g(i, r, a, n, e[o + 1], 21, -2054922799)
            n = g(n, i, r, a, e[o + 8], 6, 1873313359)
            a = g(a, n, i, r, e[o + 15], 10, -30611744)
            r = g(r, a, n, i, e[o + 6], 15, -1560198380)
            i = g(i, r, a, n, e[o + 13], 21, 1309151649)
            n = g(n, i, r, a, e[o + 4], 6, -145523070)
            a = g(a, n, i, r, e[o + 11], 10, -1120210379)
            r = g(r, a, n, i, e[o + 2], 15, 718787259)
            i = g(i, r, a, n, e[o + 9], 21, -343485551)
            n = p(n, s)
            i = p(i, c)
            r = p(r, l)
            a = p(a, u)
        }
        return Array(n, i, r, a)
    }(function (e) {
        let t = Array(), n = (1 << a) - 1;
        for (let i = 0; i < e.length * a; i += a)
            t[i >> 5] |= (e.charCodeAt(i / a) & n) << i % 32;
        return t
    }(t = e), t.length * a)) : ""
}