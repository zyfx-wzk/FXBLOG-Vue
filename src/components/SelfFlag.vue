<template>
  <div id="flag-box">
    <div class="flag-self">
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
  </div>
</template>

<script>
import {metaDataApi} from "@/api/api";

export default {
  name: "SelfFlag",
  components: {},
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
  },
  mounted() {
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

#flag-box {
  position: relative;
  width: 100%;
  height: 100vh;

  .flag-self {
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  .header-avatar {
    img {
      //旋转动画
      transform: rotate(0);
      transition: all 0.8s ease !important;
      filter: contrast(100%);
      width: 150px;
      height: 150px;
      border-radius: 100px;
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
    background: var(--theme-background);
    padding: 15px 30px 3px 30px;
    margin: 30px auto 0 auto;
    letter-spacing: 1px;
    line-height: 30px;
    border-radius: 15px;

    p {
      font-size: 20px;
      color: var(--theme-skin-main);
      transition: all 0.4s ease !important;

      &:hover {
        color: var(--theme-skin-less);
      }
    }
  }

  .top-social {
    height: 32px;
    margin-left: 10px;
    list-style: none;
    display: inline-block;

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