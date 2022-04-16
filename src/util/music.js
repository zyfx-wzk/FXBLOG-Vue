import axios from "axios";

let audio = [];

//根据歌曲HASH获取具体歌曲信息
const getAudioInfo = async (hash) => {
    await axios("/music/app/i/getSongInfo.php?cmd=playInfo&hash=" + hash, {
        "User-Agent": "apifox/2.1.8 (https://www.apifox.cn)"
    })
        .then((result) => {
            result = result.data
            let url = result["url"]
            let cover = result["imgUrl"].replace("{size}", "100")
            if (url.length !== 0) {
                audio.push({
                    url, cover,
                    name: result["songName"],
                    artist: result["singerName"],
                    lrc: ""
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

//访问酷狗音乐接口,根据歌单UUID获取歌曲HASH
export async function getMusicList(uuid) {
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
        await getAudioInfo(l.hash);
    }
    localStorage.setItem("musicList", JSON.stringify({
        uuid, audio
    }));
    console.log(audio);
    return audio;
}