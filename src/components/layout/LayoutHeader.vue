<template>
  <div id="layout-header" :class="{'hidden':hidden,'fixed':fixed}">
    <div id="header-logo">
      <router-link to="/index">
        <img src="../../assets/img/logo.svg" alt=""/>
        <p class="site-name">FXBLOG</p>
      </router-link>
    </div>
    <div>
      <router-link to="/index">首页</router-link>
      <router-link to="/login">登录</router-link>
    </div>
  </div>
  <MusicPlayer></MusicPlayer>
</template>
<script>

import MusicPlayer from "@/components/external/MusicPlayer";

export default {
  name: "LayoutHeader",
  components: {MusicPlayer},
  data() {
    return {
      lastScrollTop: 0,
      fixed: false,
      hidden: false,
    }
  },
  mounted() {
    this.watchScroll();
  },
  methods: {
    watchScroll() {
      $(window).scroll(() => {
        let scrollTop = $(window).scrollTop();
        this.fixed = scrollTop <= 0 || scrollTop <= this.lastScrollTop;
        this.hidden = !this.fixed;
        this.lastScrollTop = scrollTop
      })

    }
  }
}
</script>

<style scoped lang="less">
#layout-header {
  //置于最上层
  z-index: 200;
  position: fixed;
  margin: 0 calc(5vw);
  top: 2.5vh;
  width: 90vw;
  height: 80px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all .5s ease !important;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  &.hidden {
    top: -100px;
  }

  &.fixed {

  }
}

.header-menu {
  width: auto;
  height: 80px;
  border: 0;

  .menu-item {
    width: 80px;
  }
}

#header-logo {
  text-align: center;

  img {
    width: 40px;
    height: 40px;
  }

  p {
    margin-top: 3px;
    font-size: 16px;
    font-weight: bold;
    position: relative;
  }
}

el-menu-item {
  font-size: 18px;
}
</style>