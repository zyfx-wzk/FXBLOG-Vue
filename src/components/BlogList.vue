<template>
  <div id="blog-list">
    <h1 class="main-title">
      ARTI<img class="time-icon" src="../assets/img/article.svg" alt="" style="margin:0;">CLE
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
        <div class="blog-brief">
          {{ blog.text }}
        </div>
      </div>
    </div>
    <div class="loading-more">
      <button :class="{'isHover':hover}" @click="getBlogList()">更早的文章</button>
      <p :class="{'isHover':!hover}">很高兴你翻到这里，但是真的没有更早的文章了</p>
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
            console.log(result.data.length)
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
.isHover {
  display: none !important;
}

#blog-list {
  width: 820px;
  padding-top: 40px;

  h1, .loading-more {
    display: flex;
    text-align: center;
    justify-content: center;
  }

  h1 {
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
    }
  }

  .left {
    display: flex;
    flex-direction: row;

    .blog-title, .blog-info, .blog-brief {
      text-align: right;
      float: right;
    }

    .blog-title {
      margin-right: 5px;
    }

    .info-item {
      margin-left: 10px;
    }
  }

  .right {
    display: flex;
    flex-direction: row-reverse;

    .blog-title, .blog-info, .blog-brief {
      text-align: left;
      float: left;
    }

    .blog-title {
      margin-left: 5px;
    }

    .info-item {
      margin-right: 10px;
    }
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

      .blog-time {
        width: max-content;
        height: 20px;
        display: flex;
        align-items: center;

        img {
          margin-right: 5px;
        }
      }

      .blog-title, .blog-info, .blog-brief {
        width: 100%;
        display: block;
        margin-top: 25px;
      }

      .blog-title {
        h2 {
          color: var(--theme-base-color);
          transition: all 0.4s ease !important;
        }

        h2:hover {
          color: var(--theme-skin-main);
        }
      }

      .blog-info {
        .info-item {
          line-height: 20px;
          display: inline-flex;
          align-items: center;
        }
      }

      .blog-brief {
        white-space: pre-wrap;
        //简介溢出处理
        overflow: hidden;
        text-overflow: clip;
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