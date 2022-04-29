<template>
  <div id="layout-header" :class="{'hidden':hidden,'fixed':fixed}">
    <div id="header-logo">
      <router-link to="/index">
        <img src="../../assets/img/logo.svg" alt=""/>
        <p class="site-name">FXBLOG</p>
      </router-link>
    </div>
    <el-menu mode="horizontal" :ellipsis="false" :router="true" class="header-menu" default-active="/index">
      <el-menu-item index="/index" class="menu-item">首页</el-menu-item>
      <el-menu-item index="/login" class="menu-item">登录</el-menu-item>
    </el-menu>
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
    window.addEventListener('scroll', this.watchScroll)
  },
  methods: {
    watchScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.fixed = scrollTop < this.lastScrollTop || this.lastScrollTop === 0;
      this.hidden = !this.fixed;
      this.fixed = scrollTop !== 0 && this.lastScrollTop !== 0;
      this.lastScrollTop = scrollTop
    }
  }
}
</script>

<style scoped lang="less">
#layout-header {
  //置于最上层
  z-index: 200;
  position: fixed;
  padding: 0 80px;
  top: 0;
  width: calc(100vw - 160px);
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 1px #e6e6e6;
  transition: .3s all ease;
  background-color: #FFFFFF;

  &.hidden {
    top: -100px;
  }

  &.fixed {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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