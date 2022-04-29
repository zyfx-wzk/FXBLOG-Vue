<template>
  <div id="aplayer"/>
</template>

<script>
import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer';
import {getMusicList} from "@/util/music";
import {loadingClose} from "@/util/loading";

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
      hover: true
    };
  },
  mounted() {
    // 初始化播放器
    this.getAudioList();
  },
  methods: {
    //使用jQuary监听点击事件,动态添加隐藏动画
    clickButton() {
      window.$('.aplayer-miniswitcher').on('click', () => {
        let aplayer = window.$('.aplayer-body');
        if (this.hover) {
          aplayer.removeClass('aplayer-hover');
          this.hover = false;
        } else {
          aplayer.addClass('aplayer-hover');
          this.hover = true;
        }
      })
    },
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
      window.$('.aplayer-body').addClass('aplayer-hover');
      this.clickButton();
      loadingClose();
    },
    getAudioList() {
      //轮询setting数据,当setting数据改变时,退出
      let time = setInterval(() => {
        const setting = this.$store.state.setting;
        if (setting.isChanged) {
          //从缓存中获取歌单ID,若相等则直接取用缓存中的歌单
          let data = JSON.parse(sessionStorage.getItem("musicList"));
          if (data !== null && data.uuid === setting.musicUuid) {
            this.audio = data.audio;
            this.createPlayer();
          } else {
            getMusicList(setting.musicUuid)
                .then((list) => {
                  this.audio = list;
                  this.createPlayer();
                });
          }
          clearInterval(time);
        }
      }, 1000);
    }
  }
  ,
}
;
</script>

<style lang="less">
#aplayer {
  width: 320px; // 定个宽度
}

.aplayer-body, .aplayer-list {
  color: var(--theme-skin-main);
}

.aplayer-hover {
  left: -66px !important;

  &:hover {
    left: 0 !important;
  }
}

.aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap {
  .aplayer-bar {
    height: 6px;
    border-radius: 10px;

    .aplayer-played {
      height: inherit;
      border-radius: inherit;

      .aplayer-thumb {
        height: 12px;
        width: 12px;
        right: 3px;
        top: 1px;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, .18);
        transition: all .35s
      }
    }

    .aplayer-loaded {
      height: inherit;
      border-radius: inherit;
    }
  }
}
</style>