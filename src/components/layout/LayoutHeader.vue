<template>
  <div id="layout-header" :class="{'hidden':hidden,'fixed':fixed}">
    <div id="header-logo" style="text-align: center;">
      <router-link to="/index">
        <img style="width: 40px;height: 40px;" src="../../assets/img/logo.svg" alt=""/>
        <p style="margin-top: 3px;font-size: 16px;font-weight: bold;position: relative;">FXBLOG</p>
      </router-link>
    </div>
    <el-menu mode="horizontal" :ellipsis="false" :router="true" default-active="home">
      <el-menu-item index="home">
        <div>首页</div>
      </el-menu-item>
      <el-menu-item index="article?uuid=1004">
        <div>个人简历</div>
      </el-menu-item>
      <el-menu-item>
        <div id="1" @mouseenter="changeState($event)" @mouseleave="changeState($event)">
          <i class="icon iconfont icon-yonghu-yuan" style="font-size: 28px"/>
          <transition name="plus">
            <div v-show="menu[1]" class="item-group">
              <el-menu mode="vertical" :ellipsis="false">
                <el-menu-item index="">
                  <router-link to="login">
                    <div>登录</div>
                  </router-link>
                </el-menu-item>
              </el-menu>
            </div>
          </transition>
        </div>
      </el-menu-item>
    </el-menu>
  </div>
  <MusicPlayer></MusicPlayer>
</template>
<script>
import {ElMenu} from 'element-plus'
import MusicPlayer from "@/components/external/MusicPlayer";

export default {
  name: "LayoutHeader",
  components: {MusicPlayer},
  data() {
    return {
      menu: [],
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
        this.fixed = scrollTop <= this.lastScrollTop;
        this.hidden = !this.fixed;
        this.fixed = !scrollTop <= 0;
        this.lastScrollTop = scrollTop
      })
    },
    changeState(event) {
      const id = event.target.id;
      this.menu[id] = this.menu[id] == null ? true : !this.menu[id];
    }
  }
}
</script>

<style scoped lang="less">
.plus-enter-active.item-group, .plus-leave-active.item-group {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.plus-enter-to.item-group, .plus-leave.item-group {
  opacity: 1;
}

.item-group {
  position: absolute;
  top: 50px;
  right: 0;
  background-color: var(--theme-base-white);
  box-shadow: 0 1px 40px -8px rgb(0 0 0 / 20%);
  width: 100px;
  min-width: 120px;
  border-radius: 15px;
  transition: all .3s;

  .el-menu-item {
    .item-hover;
    font-size: 20px;
    padding: 0 20px;
    justify-content: center;
  }

  .el-menu--horizontal, .el-menu-item, .el-menu {
    background-color: transparent;
    border-right: 0;
  }
}

.item-hover {
  div {
    transition: all .2s;

    &:hover {
      color: var(--theme-skin-main) !important;
    }
  }
}

.el-menu-item {
  .item-hover;
  font-size: 28px;

  &:hover, &:focus {
    background-color: transparent !important;
  }
}

.is-active {
  color: var(--el-menu-text-color) !important;
}

.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 0;
  color: var(--el-menu-text-color) !important;
}

.el-menu--horizontal, .el-menu-item, .el-menu {
  border-bottom: 0;
  background-color: transparent;
}

#layout-header {
  //置于最上层
  z-index: 200;
  position: fixed;
  margin: 0 calc(5vw - 20px);
  padding: 0 20px;
  top: 2.5vh;
  width: 90vw;
  height: 80px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.4s ease;
  background-color: rgba(255, 255, 255, 0);

  &.hidden {
    top: -100px;
  }

  &.fixed {
    background-color: rgba(255, 255, 255, 0.9);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
}
</style>