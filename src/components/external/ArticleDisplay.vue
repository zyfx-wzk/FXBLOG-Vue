<template>
  <v-md-editor id="preview" :model-value="markdown" mode="preview"></v-md-editor>
</template>

<script>
import {markdownApi} from "@/api/api";

export default {
  name: "ArticleDisplay",
  data() {
    return {
      markdown: ""
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
            this.markdown = result.data.text;
          })
          .catch((error) => {
            console.log(error);
          })
    }
  }
}
</script>

<style lang="less">
img {
  margin: 0 auto;
  display: block;
}
</style>