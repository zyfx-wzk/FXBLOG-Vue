import axios from "axios";

let audio = [];

//根据歌曲HASH获取具体歌曲信息
const getAudioInfo = async (album_id, hash, mid) => {
    await axios("/audio/yy/index.php" +
        "?r=play/getdata" +
        "&hash=" + hash +
        "&mid=" + mid +
        "&platid=4" +
        "&album_id=" + album_id, {
        "User-Agent": "apifox/2.1.8 (https://www.apifox.cn)"
    })
        .then((result) => {
            result = result.data.data;
            const re = new RegExp('\\[id:\\$00000000][\\s\\S]*(\\[by:\\S*]|\\[offset:0])\\r\\n', 'g');
            const url = result["play_url"];
            const cover = result["img"];
            let lrc = result["lyrics"]
            lrc = lrc.replace(re, "");
            lrc = lrc.replace(new RegExp('\\r', 'g'), "");
            console.log(lrc);
            if (url.length !== 0) {
                audio.push({
                    url, cover, lrc,
                    name: result["song_name"],
                    artist: result["author_name"],
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

//访问酷狗音乐接口,根据歌单UUID获取歌曲HASH
export async function getMusicList(uuid, mid) {
    let list = [];
    await axios("/music/plist/list/" + uuid + "?json=true", {
        "User-Agent": "apifox/2.1.8 (https://www.apifox.cn)"
    })
        .then((result) => {
            list = result.data.list.list.info;
        })
        .catch((error) => {
            console.log(error);
        })
    for (const l of list) {
        await getAudioInfo(l['album_id'], l.hash, mid);
    }
    localStorage.setItem("musicList", JSON.stringify({
        uuid, audio
    }));
    console.log(audio);
    return audio;
}