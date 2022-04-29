<template>
  <div id="blog-list">
    <div v-for="blog in blogList" :key="blog.title" :title="blog.title" class="blog">
      <div class="blog-image">
        <router-link :to="{path:'/article',query:{uuid:blog.uuid}}">
          <img :src="blog.image" alt=""/>
        </router-link>
      </div>
      <div class="blog-content">
        <div class="item blog-time">
          <img class="time-icon" src="../assets/img/time.svg" alt="">
          发布于{{ this.timeProcess(blog.time) }}
        </div>
        <router-link class="blog-title" :to="{path:'/article',query:{uuid:blog.uuid}}">
          <h2>{{ blog.title }}</h2>
        </router-link>
        <div class="blog-info">
          <div class="item info-item">
            <img class="time-icon" src="../assets/img/click.svg" alt="">{{ blog.count }}热度
          </div>
          <div class="item info-item">
            <img class="time-icon" src="../assets/img/type.svg" alt="">{{ blog.type }}
          </div>
        </div>
        <div class="blob-brief">
        </div>
      </div>
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
            this.blogList = result.data;
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
#blog-list {
  width: 820px;
  padding: 80px 0;

  .blog {
    width: 100%;
    height: 300px;
    margin: 40px 0;
    display: inline-flex;
    overflow: hidden;
    transition: all 0.4s ease !important;
    background-color: rgba(255, 255, 255, 1);
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

      .blog-time {
        width: max-content;
        display: flex;
        align-items: center;

        img {
          margin-right: 5px;
        }
      }

      .blog-title, .blog-info, .blog-brief {
        width: 100%;
        text-align: right;
        display: block;
        float: right;
        margin-top: 20px;
      }

      .blog-title {
        margin-left: 5px;

        h2 {
          color: var(--theme-base-color);
          transition: all 0.4s ease !important;
        }

        h2:hover {
          color: var(--theme-skin-main);
        }
      }

      .blog-info {
        height: 20px;

        .info-item {
          line-height: 20px;
          margin-left: 10px;
          display: inline-flex;
          align-items: center;
        }
      }

      .blog-brief {
      }
    }

    .time-icon {
      width: 16px;
      margin-right: 5px;
    }

    .item {
      border-radius: 8px;
      line-height: 20px;
      color: var(--theme-skin-main);
      padding: 4px 8px;
      background-color: var(--theme-background);
    }
  }
}
</style>