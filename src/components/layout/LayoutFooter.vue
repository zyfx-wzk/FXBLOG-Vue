<template>
  <div id="layout-footer" >
    <!--  樱花旋转 -->
    <div class="footer-device" style="padding-bottom: max(2%, 45px);">
      <i class="iconfont icon-sakura rotating"
         style="color: var(--theme-skin-main);display:inline-block;font-size: 30px;"></i>
    </div>
    <p style="color:var(--footer-less-text);">Copyright © 2022 by ZYFX All Rights Reserved.</p>
    <div style="width:580px;margin: 0 auto;padding: 20px 0;color:var(--footer-main-text)">
      <img src="https://cdn.jsdelivr.net/gh/zyfx-wzk/Images/theme/record.png" style="float: left" alt="">
      <a target="_blank" href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=36040202000256"
         style="text-decoration: none;height: 20px;line-height: 20px">
        <p style="float: left;height: 20px;line-height: 20px;margin-left:5px;">
          赣公网安备 36040202000256号
        </p>
      </a>
      <a href="https://beian.miit.gov.cn/" target="_blank">津ICP备2021009073号-1</a>
    </div>
    <div style="color: var(--footer-main-text)">
      <a target="_blank" :href="motto.href">{{ motto.hitokoto }}———{{ motto.from_who }}「{{ motto.from }}」</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LayoutFooter",
  components: {},
  data() {
    return {
      motto: {
        href: "https://hitokoto.cn/?uuid=e7edd354-edd1-4f20-afad-30074c948cb0",
        uuid: "e7edd354-edd1-4f20-afad-30074c948cb0",
        hitokoto: "路曼曼其修远兮，吾将上下而求索。",
        from: "离骚",
        from_who: "屈原"
      }
    }
  },
  created() {
    this.getMotto()
  },
  methods: {
    getMotto() {
      axios.get('https://v1.hitokoto.cn')
          .then((result) => {
            this.motto = result.data;
            this.motto.href = "https://hitokoto.cn/?uuid=" + this.motto.uuid;
            console.log(this.motto)
          })
          .catch((error) => {
            console.log(error);
          })
    },
    toHitokoto() {
      window.open(this.motto.href);
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/css/cherry.css";

#layout-footer {
  text-align: center;
  padding: max(2%, 45px);
  margin: auto;
  font-size: 18px;
  background-color: rgba(255, 255, 255, 0.1);

  a {
    transition: .5s all ease;
    filter: contrast(100%);
  }

  a:hover {
    color: var(--theme-a-hover);
    filter: contrast(150%);
  }
}
</style>