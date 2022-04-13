<template>
  <div id="my-banner">
    <div class="img-banner">
      <!--博主信息-->
      <div class="info-box">
        <!-- 头像 -->
        <div class="header-avatar">
          <router-link to="/"><img :src="myInfo.avatar" alt=""></router-link>
        </div>
        <!-- 简介 -->
        <div class="header-info">
          <p>{{ myInfo.introduction }}</p>
          <!-- 个人相关网站 -->
          <div class="top-social">
            <div v-for="item in myWebsite" :key="item.name" :title="item.name">
              <a :href="item.href" target="_blank">
                <img :alt="item.name" :src="item.icon"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MusicPlayer></MusicPlayer>
  </div>
</template>

<script>
import {metaDataApi} from "@/api/api";
import MusicPlayer from "@/components/external/MusicPlayer";

export default {
  name: "MyBanner",
  components: {MusicPlayer},
  data() {
    return {
      myInfo: {
        avatar: "",
        introduction: "当你看到这个消息时就证明后台服务器已经挂掉了"
      },
      myWebsite: []
    }
  },
  created() {
    this.getBaseInfo()
  },
  methods: {
    getBaseInfo() {
      metaDataApi("my_info", "value")
          .then((result) => {
            this.myInfo = result.data;
            console.log(result.data);
          })
      metaDataApi("my_website", "list")
          .then((result) => {
            this.myWebsite = result.data;
            console.log(result.data);
          })
    }
  }
}
</script>

<style scoped lang="less">

#my-banner {
  position: relative;
  margin-top: 82px;
  width: 100%;
  height: 100vh;

  .img-banner {
    transition: unset;
    width: inherit;
    height: inherit;
    overflow: hidden;
  }
}

.info-box {
  position: relative;
  max-width: 800px;
  padding: 0 10px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  .header-avatar {
    img {
      //旋转动画
      transform: rotate(0);
      transition: all 0.8s ease !important;
      filter: contrast(130%);
      width: 120px;
      height: 120px;
      border-radius: 50px;
      box-shadow: inset 0 0 10px var(--theme-skin-main);
      padding: 5px;

      &:hover {
        transform: rotate(360deg);
      }
    }
  }

  .header-info {
    width: 75%;
    max-width: 450px;
    font-size: 16px;
    color: var(--theme-skin-main);
    background: var(--theme-background);
    padding: 15px 30px 3px 30px;
    margin: 30px auto 0 auto;
    font-family: miranafont, "Hiragino Sans GB", STXihei, "Microsoft YaHei", SimSun, sans-serif;
    letter-spacing: 1px;
    line-height: 30px;
    border-radius: 15px;

    p:hover {
      filter: contrast(120%);
      color: var(--theme-skin-less);
    }
  }

  .top-social {
    height: 32px;
    margin-left: 10px;
    list-style: none;
    display: inline-block;
    font-family: miranafont, "Hiragino Sans GB", STXihei, "Microsoft YaHei", SimSun, sans-serif;

    div {
      float: left;
      padding: 6px 10px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      width: 32px;
      border-radius: 100%;
    }

    img {
      width: 24px;
      height: auto;
    }
  }
}
</style>