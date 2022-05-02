<template>
  <div class="article-box">
    <div class="article">
      <ArticleDisplay></ArticleDisplay>
    </div>
  </div>
</template>

<script>
import ArticleDisplay from "@/components/external/ArticleDisplay";

export default {
  name: "AticlePage",
  components: {ArticleDisplay},
  data() {
    return {
    }
  }
}
</script>

<style scoped lang="less">
.article-box {
  background-color: rgba(255, 255, 255,0.1);

  .article {
    height: auto;
    width: 70%;
    padding: 0 15%;
  }
}
</style>