<template>
  <div id="blog-list">
    <h1 class="main-title">
      ARTI<i class="icon iconfont icon-shejiwenzhang" style="font-size:24px;"></i>CLE
    </h1>
    <div v-for="(blog,index) in blogList" :key="index" :title="blog.title"
         class="blog" :class="index%2===0?'left':'right'">
      <div class="blog-image">
        <router-link :to="{path:'/article',query:{uuid:blog.uuid}}">
          <img :src="blog.image" alt=""/>
        </router-link>
      </div>
      <div class="blog-content">
        <div class="item blog-time">
          <i class="icon iconfont icon-shijian" style="margin-right: 5px;"/>发布于{{ this.timeProcess(blog.time) }}
        </div>
        <router-link class="blog-title" :to="{path:'/article',query:{uuid:blog.uuid}}">
          <h2>{{ blog.title }}</h2>
        </router-link>
        <div class="blog-info">
          <div class="item info-item">
            <i class="icon iconfont icon-redu" style="margin-right: 5px;"/>{{ blog.count }}热度
          </div>
          <div class="item info-item">
            <i class="icon iconfont icon-wenjianjia" style="margin-right: 5px;"/>{{ blog.type }}
          </div>
        </div>
        <div class="blog-brief">{{ blog.text }}</div>
      </div>
    </div>
    <div class="loading-more">
      <button v-show="!hover" @click="getBlogList()">更早的文章</button>
      <p v-show="hover">很高兴你翻到这里，但是真的没有更早的文章了</p>
    </div>
  </div>
</template>

<script>
import {blogListApi} from "@/api/api";

export default {
  name: "BlogList",
  data() {
    return {
      page: 1,
      size: 5,
      hover: false,
      blogList: []
    }
  },
  mounted() {
    this.getBlogList();
  },
  methods: {
    getBlogList() {
      blogListApi(this.page, this.size)
          .then((result) => {
            this.blogList.push.apply(this.blogList, result.data);
            this.page++;
            this.hover = !(result.data.length === this.size);
          })
    },
    //时间转换
    timeProcess(time) {
      const t = (new Date().getTime() - new Date(time).getTime());
      if (t < 86400000) {
        return ~~(t / 3600000) + "小时前";
      } else if (t < 864000000) {
        return ~~(t / 86400000) + "天前"
      } else {
        return time.slice(0, 10);
      }
    }
  }
}
</script>

<style scoped lang="less">
.direction(@dire) {
  display: flex;

  .blog-title, .blog-info, .blog-brief {
    text-align: @dire;
    float: @dire;
  }
}

.left {
  .direction(right);
  flex-direction: row;

  .blog-title {
    margin-right: 5px;
  }

  .info-item {
    margin-left: 10px;
  }
}

.right {
  .direction(left);
  flex-direction: row-reverse;

  .blog-title {
    margin-left: 5px;
  }

  .info-item {
    margin-right: 10px;
  }
}

.item {
  padding: 4px 8px;
  line-height: 20px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  color: var(--theme-skin-main);
  background-color: var(--theme-background);
}

#blog-list {
  width: 820px;
  padding-top: 40px;

  .main-title {
    padding-bottom: 20px;
    color: var(--theme-skin-main);
    border-bottom: 6px dotted var(--theme-background);
  }

  .loading-more {
    button, p {
      font-size: 20px;
      color: var(--theme-base-white);
    }

    button {
      padding: 13px 35px;
      border: 2px solid var(--theme-base-white);
      border-radius: 50px;
      background-color: transparent;
      transition: color .2s ease-out, border .2s ease-out, opacity .2s ease-out;

      &:hover {
        border-color: var(--theme-skin-main);
        color: var(--theme-skin-main);
      }
    }
  }

  .main-title, .loading-more {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .blog {
    width: 100%;
    height: 300px;
    margin: 40px 0;
    overflow: hidden;
    transition: all 0.4s ease !important;
    background-color: var(--theme-base-white);
    border-radius: 15px;
    box-shadow: 0 0 20px -4px var(--blog-list-box);


    &:hover {
      box-shadow: 0 0 20px 10px var(--blog-list-box);
    }

    .blog-image {
      width: 55%;
      height: inherit;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.6s;

        &:hover {
          transform: scale(1.1);
        }
      }
    }

    .blog-content {
      width: 45%;
      height: 260px;
      padding: 20px 30px;
      display: flex;
      flex-direction: column;

      .blog-brief {
        white-space: pre-wrap;
        overflow: hidden;
        text-overflow: clip;
      }

      .blog-title {
        h2 {
          color: var(--theme-base-color);
          transition: all 0.4s ease !important;

          &:hover {
            color: var(--theme-skin-main);
          }
        }
      }

      .blog-time, .info-item {
        .item;
        width: max-content;
      }

      .blog-title, .blog-info, .blog-brief {
        width: 100%;
        display: block;
        margin-top: 25px;
      }
    }
  }
}
</style>