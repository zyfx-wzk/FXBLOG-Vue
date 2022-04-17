<template>
  <div id="aplayer">
  </div>
</template>

<script>
import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer';
import {getMusicList} from "@/util/music";

export default {
  name: "MusicPlayer",
  data() {
    return {
      audio: [
        {
          //歌曲名,作者,歌曲链接,图片链接,歌词链接
          name: "",
          artist: "",
          url: "",
          cover: "",
          lrc: ""
        }
      ],
      info: {
        fixed: true, // 吸底模式
        listFolded: true, // 折叠歌曲列表
        autoplay: false, // 自动播放
        preload: "auto", // 自动预加载歌曲
        loop: "all", // 播放循环模式、all全部循环 one单曲循环 none只播放一次
        order: "random", //  播放模式，list列表播放, random随机播放
        volume: 1//默认音量
      },
    };
  },
  mounted() {
    // 初始化播放器
    this.getAudioList();
  },
  methods: {
    createPlayer() {
      // 创建一个音乐播放器实例，并挂载到DOM上，同时进行相关配置
      // eslint-disable-next-line no-unused-vars
      const aPlayer = new APlayer({
        container: document.getElementById("aplayer"),
        //使用js字符串格式加载歌词
        lrcType: 1,
        audio: this.audio, // 音乐信息
        ...this.info, // 其他配置信息
      });
    },
    getAudioList() {
      //轮询setting数据,当setting数据改变时,退出
      let time = setInterval(() => {
        const setting = this.$store.state.setting;
        if (setting.isChanged) {
          //从缓存中获取歌单ID,若相等则直接取用缓存中的歌单
          let data = JSON.parse(localStorage.getItem("musicList"));
          if (data !== null && data.uuid === setting.musicUuid) {
            this.audio = data.audio;
            this.createPlayer();
          } else {
            getMusicList(setting.musicUuid, setting.musicMid)
                .then((list) => {
                  this.audio = list;
                  this.createPlayer();
                })
          }
          clearInterval(time);
        }
      }, 1000);
    }
  },
};
</script>

<style scoped lang="less">
#app {
  width: 100%;
  height: 100%;
  padding: 50px;

  #aplayer {
    width: 320px; // 定个宽度
  }
}
</style>