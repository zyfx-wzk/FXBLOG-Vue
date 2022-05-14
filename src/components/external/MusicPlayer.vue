<template>
  <div v-show="this.show" id="aplayer"/>
</template>

<script>
import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer';
import {loadingClose} from "@/util/loading";
import {musicListApi} from "@/api/api";

export default {
  name: "MusicPlayer",
  data() {
    return {
      info: {
        fixed: true, // 吸底模式
        listFolded: true, // 折叠歌曲列表
        autoplay: true, // 自动播放
        preload: "auto", // 自动预加载歌曲
        loop: "all", // 播放循环模式、all全部循环 one单曲循环 none只播放一次
        order: "random", //  播放模式，list列表播放, random随机播放
        volume: 1//默认音量
      },
      show: false,
      hidden: true
    };
  },
  mounted() {
    // 初始化播放器
    this.createPlayer();
  },
  methods: {
    //使用jQuary监听点击事件,动态添加隐藏动画
    clickButton() {
      $('.aplayer-miniswitcher').click(() => {
        let aplayer = $('.aplayer-body');
        if (this.hidden) {
          aplayer.removeClass('aplayer-hover');
        } else {
          aplayer.addClass('aplayer-hover');
        }
        this.hidden = !this.hidden;
      })
      this.show = true;
    },
    createPlayer() {
      if (sessionStorage.getItem("musci_list") != null) {
        this.newPlayer(sessionStorage.getItem("musci_list"));
      } else {
        musicListApi()
            .then((result) => {
              this.newPlayer(result.data);
              sessionStorage.setItem("music_list", JSON.stringify(result.data));
            })
      }
    },
    newPlayer(audio) {
      const aPlayer = new APlayer({
        container: document.getElementById("aplayer"),
        //使用js字符串格式加载歌词
        lrcType: 1,
        audio: audio, // 音乐信息
        ...this.info, // 其他配置信息
      });
      $('.aplayer-body').addClass('aplayer-hover');
      this.clickButton();
      loadingClose();
    }
  }
}

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