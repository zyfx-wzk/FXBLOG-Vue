<template>
  <div class="header">
    <p style="padding-bottom: 10px;font-size: 40px;letter-spacing: 5px;">{{ blog.title }}</p>
    <p style="padding-bottom: 20px;">发布于:{{ blog.time }}&nbsp;&nbsp;&nbsp;总阅读量:{{ blog.count }}次</p>
    <el-image style="width: 40%;" class="show-image" v-if="isShow" :src="blog.image"
              :preview-src-list="[blog.image]" @click="startMove" @close="stopMove"></el-image>
  </div>
  <v-md-editor id="preview" :model-value="blog.text" mode="preview"></v-md-editor>
</template>

<script>
import {ElImage} from "element-plus";
import {markdownApi} from "@/api/api";
import $ from 'jquery';

export default {
  name: "ArticleDisplay",
  data() {
    this.isScroll = true;
    return {
      blog: {},
      isShow: false,
    }
  },
  created() {

  },
  mounted() {
    this.getMarkdown();
  },
  methods: {
    getMarkdown() {
      markdownApi(this.$route.query.uuid)
          .then((result) => {
            this.blog = result.data;
            this.isShow = this.blog.image != null;
          })
    },
    startMove() {
      if (this.isScroll) {
        $("html,body").css("overflow", "hidden");
      } else {
        this.isScroll = !this.isScroll;
      }
    },
    stopMove() {
      $("html,body").css("overflow", "");
      this.isScroll = false;
    }
  }
}
</script>

<style lang="less">
img {
  margin: 0 auto;
  display: block;
}

.v-md-editor, .show-image {
  overflow: hidden;
  border-radius: 25px !important;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--theme-base-white);
  padding: 160px 0 20px 0;
}
</style>