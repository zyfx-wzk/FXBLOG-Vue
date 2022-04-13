<template>
  <div id="layout-footer">
    <p style="color:var(--theme-footer-text);">Copyright © by ZYFX All Rights Reserved.</p>
    <div style="width:400px;margin: 0 auto;padding: 20px 0;color:var(--theme-footer-text)">
      <a target="_blank" href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=36040202000256"
         style="text-decoration: none;height: 20px;line-height: 20px">
        <img src="https://cdn.jsdelivr.net/gh/zyfx-wzk/Images/theme/record.png" style="float: left" alt="">
        <p style="float: left;height: 20px;line-height: 20px;margin: 0 0 0 5px;">
          赣公网安备 36040202000256号
        </p>
      </a>
      <a href="https://beian.miit.gov.cn/" target="_blank">津ICP备2021009073号-1</a>
    </div>
    <div style="color: #e1dfdd">
      <a :href="motto.href">{{ motto.hitokoto }}———{{motto.from_who}}「{{ motto.from }}」</a>
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
        "href":"https://hitokoto.cn/?uuid=e7edd354-edd1-4f20-afad-30074c948cb0",
        "uuid": "e7edd354-edd1-4f20-afad-30074c948cb0",
        "hitokoto": "路曼曼其修远兮，吾将上下而求索。",
        "from": "离骚",
        "from_who": "屈原",
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
            this.motto.href="https://hitokoto.cn/?uuid="+this.motto.uuid;
          })
          .catch((error) => {
            console.log(error);
          })
    }
  }
}
</script>

<style scoped lang="less">
#layout-footer {
  text-align: center;
  padding: max(2%, 45px);
  margin: auto;
  font-size: 13px;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>